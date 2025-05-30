import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const { VPATE_BASE_URL, BASE_URL, VPATE_JWT_SECRET } = process.env;

export async function GET(req: NextRequest): Promise<Response> {
  if (!VPATE_BASE_URL || !BASE_URL || !VPATE_JWT_SECRET) {
    console.error('VPATE_BASE_URL, BASE_URL or VPATE_JWT_SECRET missing');
    return NextResponse.error();
  }
  console.log('Establishing cookie store');
  const cookieStore = cookies();

  console.log('Fetching token from cookie store');
  const tokenStore = cookieStore.get('token');

  console.log('Fetching redirect target from request query string');
  const redirectTarget = req.nextUrl.searchParams.get('redirect_target');

  if (redirectTarget) {
    console.log('Setting redirect target cookie');
    cookieStore.set('redirect_target', redirectTarget, {
      path: '/',
      secure: true,
    });
  } else {
    console.log('No redirect target found, deleting redirect_target cookie');
    cookieStore.delete('redirect_target');
  }

  if (tokenStore) {
    console.log('Token found in cookie store, verifying token');
    const { value: token } = tokenStore;
    try {
      console.log('Verifying JWT token');
      jwt.verify(token, VPATE_JWT_SECRET, {
        algorithms: ['HS256'],
      });
      console.log('Token verified successfully, redirecting to BASE_URL');
      return NextResponse.redirect(BASE_URL, 302);
    } catch (_err) {
      console.error('Token verification failed, deleting token cookie');
      cookieStore.delete('token');
    }
  }

  console.log('No valid token found, redirecting to VPATE_BASE_URL for login');
  const queryParams = new URLSearchParams({
    dust_redirect: `${BASE_URL}/api/callback`,
  });

  console.log('Constructing redirect URL with query parameters');
  const redirectUrl = `${VPATE_BASE_URL}/?${queryParams.toString()}`;

  console.log(`Redirecting to: ${redirectUrl}`);
  return NextResponse.redirect(redirectUrl, 302);
}
