import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { Favorites } from './entities/Favorites';
import { AddFavoritesEntity1748652419144 } from './migrations/1748652419144-AddFavoritesEntity';

export const databaseProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: (configService: ConfigService): Promise<DataSource> => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get('TYPEORM_HOST'),
        port: +configService.get('TYPEORM_PORT', 5432),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD', ''),
        database: configService.get('TYPEORM_DATABASE'),
        entities: [Favorites],
        synchronize: configService.get('TYPEORM_SYNCHRONIZE') === true,
        subscribers: [],
        migrations: [AddFavoritesEntity1748652419144],
      });
      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
