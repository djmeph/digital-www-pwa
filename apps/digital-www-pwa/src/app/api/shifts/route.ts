import type { ShiftsFeed } from '@digital-www-pwa/types';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';

const { VPATE_JWT_SECRET, VPATE_BASE_URL } = process.env;

export async function GET(): Promise<Response> {
  if (!VPATE_JWT_SECRET || !VPATE_BASE_URL) {
    console.error('VPATE_BASE_URL or VPATE_BASE_URL missing');
    return NextResponse.error();
  }

  const unauthorized = Response.json(
    { message: 'UNAUTHORIZED' },
    {
      status: 401,
      statusText: 'UNAUTHORIZED',
    }
  );

  const cookieStore = cookies();
  const tokenStore = cookieStore.get('token');

  if (!tokenStore) {
    return unauthorized;
  }

  try {
    const { value: token } = tokenStore;
    jwt.verify(token, VPATE_JWT_SECRET, {
      algorithms: ['HS256'],
    });

    const response = await fetch(`${VPATE_BASE_URL}/shift_data.json`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: false,
      },
    });

    if (!response.ok) {
      return NextResponse.error();
    }

    const data = await response.json();
    return NextResponse.json(
      data.map(
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
      ),
      {
        status: 200,
        statusText: 'OK',
      }
    );
  } catch (_err) {
    return unauthorized;
  }
}
