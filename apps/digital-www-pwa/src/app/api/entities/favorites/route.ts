import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { setTimeout } from 'timers/promises';
import { Repository } from 'typeorm';

import { AppDataSource, Favorites } from '@digital-www-pwa/orm';
import type { JwtPayload } from '@digital-www-pwa/types';

export const dynamic = 'force-dynamic';
const { VPATE_JWT_SECRET } = process.env;

const unauthorized = NextResponse.json(
  { message: 'UNAUTHORIZED' },
  { status: 401, statusText: 'UNAUTHORIZED' }
);

let favoritesRepository: Repository<Favorites> | undefined;
AppDataSource.initialize()
  .then(() => {
    favoritesRepository = AppDataSource.getRepository(Favorites);
  })
  .catch((err) => {
    throw Error(err);
  });

export async function GET(): Promise<Response> {
  let id: number;

  try {
    id = await authorize();
  } catch (err) {
    console.error('Error in GET /api/entities/favorites:', err);
    return unauthorized;
  }

  try {
    while (!favoritesRepository) {
      await setTimeout(50);
    }

    const favorites = await favoritesRepository.findOne({
      where: { id },
    });

    if (!favorites) {
      return NextResponse.json(
        { message: 'No favorites found' },
        { status: 404, statusText: 'Not Found' }
      );
    }

    return NextResponse.json(favorites, { status: 200, statusText: 'OK' });
  } catch (err) {
    console.error('Error fetching favorites:', err);
    return NextResponse.json(
      { message: 'Error fetching favorites' },
      { status: 400, statusText: 'ApplicationError' }
    );
  }
}

export async function POST(request: Request): Promise<Response> {
  const data = await request.json();
  let id: number;

  try {
    id = await authorize();
  } catch (err) {
    console.error('Error in POST /api/entities/favorites:', err);
    return unauthorized;
  }

  try {
    while (!favoritesRepository) {
      await setTimeout(50);
    }

    const favorites = new Favorites();
    favorites.id = id;
    favorites.jsonStr = data.favorites;
    favorites.version = new Date();

    await favoritesRepository.save(favorites);

    return NextResponse.json(favorites, { status: 200, statusText: 'OK' });
  } catch (err) {
    console.error('Error saving favorites:', err);
    return NextResponse.json(
      { message: 'Error fetching favorites' },
      { status: 400, statusText: 'ApplicationError' }
    );
  }
}

export async function PUT(request: Request): Promise<Response> {
  const data = await request.json();
  let id: number;

  try {
    id = await authorize();
  } catch (err) {
    console.error('Error in PUT /api/entities/favorites:', err);
    return unauthorized;
  }

  try {
    while (!favoritesRepository) {
      await setTimeout(50);
    }

    const favorites = await favoritesRepository.findOne({
      where: { id },
    });

    if (!favorites) {
      return NextResponse.json(
        { message: 'No favorites found' },
        { status: 404, statusText: 'Not Found' }
      );
    }

    favorites.jsonStr = data.favorites;
    favorites.version = new Date();

    await favoritesRepository.save(favorites);

    return NextResponse.json(favorites, { status: 200, statusText: 'OK' });
  } catch (err) {
    console.error('Error fetching favorites:', err);
    return NextResponse.json(
      { message: 'Error fetching favorites' },
      { status: 400, statusText: 'ApplicationError' }
    );
  }
}

export async function DELETE(): Promise<Response> {
  let id: number;

  try {
    id = await authorize();
  } catch (err) {
    console.error('Error in GET /api/entities/favorites:', err);
    return unauthorized;
  }

  try {
    while (!favoritesRepository) {
      await setTimeout(50);
    }

    const favorites = await favoritesRepository.findOne({
      where: { id },
    });

    if (!favorites) {
      return NextResponse.json(
        { message: 'No favorites found' },
        { status: 404, statusText: 'Not Found' }
      );
    }

    await favoritesRepository.remove(favorites);

    return NextResponse.json(
      { message: 'OK' },
      { status: 200, statusText: 'OK' }
    );
  } catch (err) {
    console.error('Error fetching favorites:', err);
    return NextResponse.json(
      { message: 'Error fetching favorites' },
      { status: 400, statusText: 'ApplicationError' }
    );
  }
}

async function authorize(): Promise<number> {
  if (!VPATE_JWT_SECRET) {
    console.error('VPATE_BASE_URL missing');
    throw Error('VPATE_JWT_SECRET is not defined');
  }

  const cookieStore = cookies();
  const tokenStore = cookieStore.get('token');

  if (!tokenStore) {
    throw Error('Token not found in cookies');
  }

  const { value: token } = tokenStore;
  const decoded = jwt.verify(token, VPATE_JWT_SECRET, {
    algorithms: ['HS256'],
  }) as string | JwtPayload;

  if (typeof decoded === 'string') {
    throw Error(decoded);
  }

  return decoded.user_id;
}
