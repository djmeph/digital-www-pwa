import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database.module';

import { favoritesProvider } from './favorites.provider';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [DatabaseModule],
  providers: [...favoritesProvider, FavoritesService],
  exports: [...favoritesProvider, FavoritesService],
})
export class FavoritesModule {}
