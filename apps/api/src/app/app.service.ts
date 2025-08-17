import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CookieOptions, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class AppService {
  apiBaseUrl: string;
  vpateBaseUrl: string;
  vpateJwtSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.apiBaseUrl = this.configService.get('VPATE_BASE_URL');
    this.vpateBaseUrl = this.configService.get('BASE_URL');
    this.vpateJwtSecret = this.configService.get('VPATE_JWT_SECRET');
    if (!this.apiBaseUrl || !this.vpateBaseUrl || !this.vpateJwtSecret) {
      throw Error('VPATE_BASE_URL, BASE_URL or VPATE_JWT_SECRET missing');
    }
  }

  public login(
    cookie: (
      name: string,
      val: string,
      options?: CookieOptions
    ) => Response<any, Record<string, any>>,
    token?: string,
    redirectTarget?: string
  ): { url: string } {
    if (redirectTarget) {
      cookie('redirect_target', redirectTarget, {
        path: '/',
        secure: true,
      });
    } else {
      cookie('redirect_target', null);
    }

    if (token) {
      try {
        jwt.verify(token, this.vpateJwtSecret, {
          algorithms: ['HS256'],
        });
        return { url: this.apiBaseUrl };
      } catch (err: unknown) {
        console.error('Token verification failed, deleting token cookie', err);
        cookie('token', null);
      }
    }

    const queryParams = new URLSearchParams({
      dust_redirect: `${this.apiBaseUrl}/api/callback`,
    });

    const redirectUrl = `${this.vpateBaseUrl}/?${queryParams.toString()}`;
    return { url: redirectUrl };
  }

  public callback(
    cookie: (
      name: string,
      val: string,
      options?: CookieOptions
    ) => Response<any, Record<string, any>>,
    redirectTarget?: string,
    token?: string
  ) {
    if (!token) {
      return { url: '/unauthorized' };
    }

    try {
      jwt.verify(token, this.vpateJwtSecret, {
        algorithms: ['HS256'],
      });
    } catch (err) {
      console.error(err);
      return { url: '/unauthorized' };
    }

    cookie('token', token, {
      path: '/',
      secure: true,
    });

    const path = redirectTarget || '/';
    cookie('redirect_target', null);

    return { url: `${this.apiBaseUrl}${path}` };
  }

  public auth(token?: string) {
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
