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
    return this.appService.login(res.cookie, req.cookies.token, redirectTarget);
  }

  @Get('/callback')
  @Redirect('', 302)
  callback(
    @Req() req: Request,
    @Res() res: Response,
    @Query('token') token?: string
  ) {
    return this.appService.callback(
      res.cookie,
      req.cookies.redirect_target,
      token
    );
  }

  @Get('/auth')
  auth(@Req() req: Request) {
    return this.appService.auth(req.cookies.token);
  }
}
