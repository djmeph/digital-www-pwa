import { Favorites, FavoritesService } from '@digital-www-pwa/orm';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtPayload } from './app.types';
import { AuthGuard } from './auth.guard';

@UseGuards(AuthGuard)
@Controller('/entities')
export class EntitiesFavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('/favorites')
  async getFavorites(
    @Req() req: Request & { user: JwtPayload }
  ): Promise<Favorites> {
    try {
      const favorites = await this.favoritesService.get(req.user.user_id);
      return favorites;
    } catch (_err) {
      throw new NotFoundException();
    }
  }

  @Post('/favorites')
  async postFavorites(
    @Req() req: Request & { user: JwtPayload },
    @Body() body: { favorites: string }
  ): Promise<Favorites> {
    try {
      const favorites = await this.favoritesService.create(
        req.user.user_id,
        body.favorites
      );
      return favorites;
    } catch (_err) {
      throw new NotFoundException();
    }
  }

  @Put('/favorites')
  async putFavorites(
    @Req() req: Request & { user: JwtPayload },
    @Body() body: { favorites: string }
  ): Promise<Favorites> {
    try {
      const favorites = await this.favoritesService.update(
        req.user.user_id,
        body.favorites
      );
      return favorites;
    } catch (_err) {
      throw new NotFoundException();
    }
  }

  @Delete('/favorites')
  async deleteFavorites(
    @Req() req: Request & { user: JwtPayload }
  ): Promise<{ status: string }> {
    try {
      await this.favoritesService.delete(req.user.user_id);
      return { status: 'OK' };
    } catch (_err) {
      throw new NotFoundException();
    }
  }
}
