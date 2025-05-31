import { DataSource } from 'typeorm';

import { Favorites } from './entities/Favorites';
import { AddFavoritesEntity1748652419144 } from './migrations/1748652419144-AddFavoritesEntity';

export const AppDataSource = new DataSource({
  type: process.env['TYPEORM_CONNECTION'] as unknown as 'postgres',
  host: process.env['TYPEORM_HOST'],
  port: +(process.env['TYPEORM_PORT'] || 5432),
  username: process.env['TYPEORM_USERNAME'],
  password: process.env['TYPEORM_PASSWORD'],
  database: process.env['TYPEORM_DATABASE'],
  synchronize: process.env['TYPEORM_SYNCHRONIZE'] === 'true',
  logging: process.env['TYPEORM_LOGGING'] === 'true',
  entities: [Favorites],
  subscribers: [],
  migrations: [AddFavoritesEntity1748652419144],
});
