import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const { VPATE_JWT_SECRET, VPATE_BASE_URL } = process.env;

export async function GET(): Promise<Response> {
  if (!VPATE_JWT_SECRET || !VPATE_BASE_URL) {
    console.error('VPATE_BASE_URL or VPATE_BASE_URL missing');
    return Response.error();
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
      return Response.error();
    }

    const data = await response.json();
    return Response.json(data, {
      status: 200,
      statusText: 'OK',
    });
  } catch (_err) {
    return unauthorized;
  }
}
