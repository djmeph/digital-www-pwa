import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const { VPATE_JWT_SECRET } = process.env;

export async function GET(): Promise<Response> {
  if (!VPATE_JWT_SECRET) {
    console.error('VPATE_BASE_URL missing');
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
    const decoded = jwt.verify(token, VPATE_JWT_SECRET, {
      algorithms: ['HS256'],
    });
    return Response.json(
      typeof decoded === 'string' ? { message: decoded } : decoded,
      {
        status: 200,
        statusText: 'OK',
      }
    );
  } catch (_err) {
    return unauthorized;
  }
}
