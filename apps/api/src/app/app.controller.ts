import {
  Controller,
  Get,
  Headers,
  Query,
  Redirect,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

@Controller()
export class AppController {
  vpateBaseUrl: string;
  appBaseUrl: string;
  apiBaseUrl: string;
  vpateJwtSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.vpateBaseUrl = this.configService.get('VPATE_BASE_URL');
    this.vpateJwtSecret = this.configService.get('VPATE_JWT_SECRET');
    this.appBaseUrl = this.configService.get('BASE_URL');
    this.apiBaseUrl = this.configService.get('API_BASE_URL');
    if (!this.vpateBaseUrl || !this.appBaseUrl || !this.vpateJwtSecret) {
      throw Error('VPATE_BASE_URL, BASE_URL or VPATE_JWT_SECRET missing');
    }
  }

  @Get('/status')
  status() {
    return { status: 'OK' };
  }

  @Get('/login')
  @Redirect('', 302)
  login(
    @Req() req: Request,
    @Res() res: Response,
    @Query('redirect_target') redirectTarget?: string
  ): { url: string } {
    if (redirectTarget) {
      res.cookie('redirect_target', redirectTarget, {
        path: `/`,
        secure: true,
      });
    } else {
      res.cookie('redirect_target', null, {
        path: `/`,
        secure: true,
      });
    }

    if (req.cookies.token) {
      try {
        jwt.verify(req.cookies.token, this.vpateJwtSecret, {
          algorithms: ['HS256'],
        });
        return { url: this.vpateBaseUrl };
      } catch (err: unknown) {
        console.error('Token verification failed, deleting token cookie', err);
        res.cookie('token', null, {
          path: `/`,
          secure: true,
        });
      }
    }

    const queryParams = new URLSearchParams({
      dust_redirect: `${this.appBaseUrl}/api/callback`,
    });

    const redirectUrl = `${this.vpateBaseUrl}/?${queryParams.toString()}`;
    return { url: redirectUrl };
  }

  @Get('/callback')
  @Redirect('', 302)
  callback(
    @Req() req: Request,
    @Res() res: Response,
    @Query('token') token?: string
  ): { url: string } {
    if (!token) {
      console.error('token missing in callback');
      return { url: `${this.appBaseUrl}/unauthorized` };
    }

    try {
      jwt.verify(token, this.vpateJwtSecret, {
        algorithms: ['HS256'],
      });
    } catch (err) {
      console.error(err);
      return { url: `${this.appBaseUrl}/unauthorized` };
    }

    res.cookie('token', token, {
      path: `/`,
      secure: true,
    });

    const path = req.cookies.redirectTarget || '/';
    res.cookie('redirect_target', null, {
      path: `/`,
      secure: true,
    });

    return { url: `${this.appBaseUrl}${path}` };
  }

  @Get('/auth')
  auth(
    @Req() req: Request,
    @Headers() headers: Record<string, string>
  ): jwt.JwtPayload {
    const token = headers.authorization
      ? headers.authorization.replace(/^Bearer (.*?)$/, '$1')
      : undefined;
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decoded = jwt.verify(token, this.vpateJwtSecret, {
        algorithms: ['HS256'],
      });
      return typeof decoded === 'string' ? { message: decoded } : decoded;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException();
    }
  }
}
