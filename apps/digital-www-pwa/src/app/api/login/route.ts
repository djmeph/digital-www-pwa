import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const { VPATE_BASE_URL, BASE_URL, VPATE_JWT_SECRET } = process.env;

export async function GET(req: NextRequest): Promise<Response> {
  if (!VPATE_BASE_URL || !BASE_URL || !VPATE_JWT_SECRET) {
    console.error('VPATE_BASE_URL, BASE_URL or VPATE_JWT_SECRET missing');
    return Response.error();
  }

  const cookieStore = cookies();
  const tokenStore = cookieStore.get('token');
  const redirectTarget = req.nextUrl.searchParams.get('redirect_target');
  if (redirectTarget) {
    cookieStore.set('redirect_target', redirectTarget, {
      path: '/',
      secure: true,
    });
  } else {
    cookieStore.delete('redirect_target');
  }

  if (tokenStore) {
    const { value: token } = tokenStore;
    try {
      jwt.verify(token, VPATE_JWT_SECRET, {
        algorithms: ['HS256'],
      });
      return Response.redirect(BASE_URL, 302);
    } catch (_err) {
      cookieStore.delete('token');
    }
  }

  const queryParams = new URLSearchParams({
    dust_redirect: `${BASE_URL}/api/callback`,
  });

  const redirectUrl = `${VPATE_BASE_URL}/?${queryParams.toString()}`;

  return Response.redirect(redirectUrl, 302);
}
