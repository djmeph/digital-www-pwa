import {
  Controller,
  Get,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { JwtPayload } from './app.types';
import { AuthGuard } from './auth.guard';

@Controller()
export class AppController {
  vpateBaseUrl: string;
  appBaseUrl: string;
  apiBaseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {
    this.vpateBaseUrl = this.configService.get('VPATE_BASE_URL');
    this.appBaseUrl = this.configService.get('BASE_URL');
    this.apiBaseUrl = this.configService.get('NEXT_PUBLIC_API_BASE_URL');
    if (!this.vpateBaseUrl || !this.appBaseUrl || !this.apiBaseUrl) {
      throw Error(
        'VPATE_BASE_URL, BASE_URL or NEXT_PUBLIC_API_BASE_URL missing'
      );
    }
  }

  @Get('/status')
  status() {
    return { status: 'OK' };
  }

  @Get('/login')
  @Redirect('', 302)
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Query('redirect_target') redirectTarget?: string
  ): Promise<{ url: string }> {
    if (redirectTarget) {
      res.cookie('redirect_target', redirectTarget, {
        path: `/`,
        secure: true,
      });
    } else {
      res.clearCookie('redirect_target');
    }

    if (req.cookies.token) {
      try {
        await this.jwtService.verifyAsync(req.cookies.token);
        res.clearCookie('redirect_target');
        return { url: `${this.appBaseUrl}${redirectTarget}` };
      } catch (err: unknown) {
        console.error('Token verification failed, deleting token cookie', err);
        res.clearCookie('redirect_target');
      }
    }

    const queryParams = new URLSearchParams({
      dust_redirect: `${this.apiBaseUrl}/api/callback`,
    });

    const redirectUrl = `${this.vpateBaseUrl}/?${queryParams.toString()}`;
    return { url: redirectUrl };
  }

  @Get('/callback')
  @Redirect('', 302)
  async callback(
    @Req() req: Request,
    @Res() res: Response,
    @Query('token') token?: string
  ): Promise<{ url: string }> {
    if (!token) {
      console.error('token missing in callback');
      return { url: `${this.appBaseUrl}/unauthorized` };
    }

    try {
      await this.jwtService.verifyAsync(token);
    } catch (err) {
      console.error(err);
      return { url: `${this.appBaseUrl}/unauthorized` };
    }

    res.cookie('token', token, {
      path: `/`,
      secure: true,
    });

    const path = req.cookies.redirect_target || '/';
    res.clearCookie('redirect_target');
    return { url: `${this.appBaseUrl}${path}` };
  }

  @UseGuards(AuthGuard)
  @Get('/auth')
  async auth(@Req() req: Request & { user: JwtPayload }): Promise<JwtPayload> {
    return req.user;
  }
}
