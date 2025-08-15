import { Controller, Get, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/login')
  @Redirect('', 302)
  login(
    @Req() req: Request,
    @Res() res: Response,
    @Query('redirect_target') redirectTarget?: string
  ) {
    return this.appService.login(req, res, redirectTarget);
  }
}
