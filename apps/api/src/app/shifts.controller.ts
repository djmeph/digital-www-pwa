import {
  BadRequestException,
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'node:crypto';

import { AuthGuard } from './auth.guard';

@Controller()
export class ShiftsController {
  private vpateBaseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.vpateBaseUrl = this.configService.get('VPATE_BASE_URL');
    if (!this.vpateBaseUrl) {
      throw Error('VPATE_BASE_URL env variable required');
    }
  }

  @UseGuards(AuthGuard)
  @Get('/shifts')
  async shifts(@Req() req: Request & { token: string }) {
    try {
      const response = await fetch(`${this.vpateBaseUrl}/shift_data.json`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      });

      if (!response.ok) {
        throw new BadRequestException();
      }

      const data = await response.json();

      const resData = data.map(
        (n: {
          department_title: string;
          shift_title: string;
          shift_description: string;
          shift_start: number;
          shift_end: number;
          shift_location: string;
          dust_id: null;
        }) => {
          const jsonStr = JSON.stringify(n);
          const id = createHash('md5').update(jsonStr).digest('hex');
          return { ...n, id };
        }
      );
      return resData;
    } catch (_err) {
      throw new UnauthorizedException();
    }
  }
}
