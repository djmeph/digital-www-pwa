import { DataSource } from 'typeorm';

import { Favorites } from './Favorites';

export const favoritesProvider = [
  {
    provide: 'FAVORITES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Favorites),
    inject: ['DATA_SOURCE'],
  },
];
