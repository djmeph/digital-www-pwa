import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
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

  login(req: Request, res: Response, redirectTarget?: string): { url: string } {
    if (redirectTarget) {
      res.cookie('redirect_target', redirectTarget, {
        path: '/',
        secure: true,
      });
    } else {
      res.cookie('redirect_target', null);
    }

    if (req.cookies.token) {
      try {
        jwt.verify(req.cookies.token, this.vpateJwtSecret, {
          algorithms: ['HS256'],
        });
        return { url: this.apiBaseUrl };
      } catch (err) {
        console.error('Token verification failed, deleting token cookie');
        res.cookie('token', null);
      }
    }

    const queryParams = new URLSearchParams({
      dust_redirect: `${this.apiBaseUrl}/api/callback`,
    });

    const redirectUrl = `${this.vpateBaseUrl}/?${queryParams.toString()}`;
    return { url: redirectUrl };
  }
}
