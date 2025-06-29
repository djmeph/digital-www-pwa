import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';

export const dynamic = 'force-dynamic';

const { VPATE_JWT_SECRET, VPATE_BASE_URL } = process.env;

export async function GET(): Promise<Response> {
  if (!VPATE_JWT_SECRET || !VPATE_BASE_URL) {
    console.error('VPATE_BASE_URL or VPATE_BASE_URL missing');
    return NextResponse.error();
  }

  const cookieStore = cookies();
  const tokenStore = cookieStore.get('token');

  if (!tokenStore) {
    return NextResponse.json(
      { message: 'UNAUTHORIZED' },
      {
        status: 401,
        statusText: 'UNAUTHORIZED',
      }
    );
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
    const resData = data.map(
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
    );
    return NextResponse.json(resData, {
      status: 200,
      statusText: 'OK',
    });
  } catch (_err) {
    return NextResponse.json(
      { message: 'UNAUTHORIZED' },
      {
        status: 401,
        statusText: 'UNAUTHORIZED',
      }
    );
  }
}
