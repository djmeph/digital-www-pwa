import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Favorites } from './Favorites';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject('FAVORITES_REPOSITORY')
    private readonly favoritesRepository: Repository<Favorites>
  ) {}

  async get(id: number): Promise<Favorites> {
    const favorites = await this.favoritesRepository.findOne({
      where: { id },
    });
    if (!favorites) {
      throw Error('Favorites entry not found');
    }
    return favorites;
  }

  async create(id: number, data: string): Promise<Favorites> {
    const favorites = new Favorites();
    favorites.id = id;
    favorites.jsonStr = data;
    favorites.version = new Date();

    await this.favoritesRepository.save(favorites);
    return favorites;
  }

  async update(id: number, data: string): Promise<Favorites> {
    const favorites = await this.get(id);
    if (!favorites) {
      throw Error('Favorites entry not found');
    }

    favorites.jsonStr = data;
    favorites.version = new Date();

    await this.favoritesRepository.save(favorites);
    return favorites;
  }

  async delete(id: number): Promise<void> {
    const favorites = await this.get(id);
    if (!favorites) {
      throw Error('Favorites entry not found');
    }
    await this.favoritesRepository.remove(favorites);
  }
}
