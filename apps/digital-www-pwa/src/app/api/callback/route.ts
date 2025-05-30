import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { setTimeout } from 'timers/promises';

const { BASE_URL, VPATE_JWT_SECRET } = process.env;

type JwtPayload = {
  iss: string;
  aud: string;
  iat: number;
  nbf: number;
  exp: number;
  user_id: number;
  email: string;
};

export async function GET(req: NextRequest): Promise<Response> {
  if (!BASE_URL || !VPATE_JWT_SECRET) {
    console.error('BASE_URL or VPATE_JWT_SECRET missing');
    return NextResponse.error();
  }

  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json(
    { message: 'UNAUTHORIZED' },
    {
      status: 401,
      statusText: 'UNAUTHORIZED',
    }
  );
  }

  /**
   * Workaround
   *
   * The token is returning an nbf that is 10 seconds ahead of iat.
   * For now, parse the difference between the client's clock and
   * the nbf. If it's greater than 10 seconds, throw a 401. If it's
   * less than 10 seconds ahead, set a delay of the difference
   * before validating the token.
   */

  const now = Date.now();
  const decoded = jwt.decode(token) as JwtPayload;
  const nbf = decoded.nbf * 1000;
  const timeAhead = now - nbf;

  if (timeAhead < -10000) {
    return NextResponse.json(
    { message: 'UNAUTHORIZED' },
    {
      status: 401,
      statusText: 'UNAUTHORIZED',
    }
  );
  } else if (timeAhead < 0) {
    await setTimeout(Math.abs(timeAhead));
  }

  try {
    jwt.verify(token, VPATE_JWT_SECRET, {
      algorithms: ['HS256'],
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
    { message: 'UNAUTHORIZED' },
    {
      status: 401,
      statusText: 'UNAUTHORIZED',
    }
  );
  }

  const cookieStore = cookies();
  cookieStore.set('token', token, {
    path: '/',
    secure: true,
  });
  const redirectTargetStore = cookieStore.get('redirect_target');
  let path = '/';
  if (redirectTargetStore) {
    path = redirectTargetStore.value;
  }
  cookieStore.delete('redirect_target');

  return NextResponse.redirect(`${BASE_URL}${path}`, 302);
}
