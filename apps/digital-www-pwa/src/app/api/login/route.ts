const { VPATE_REDIRECT_URL, BASE_URL } = process.env;

export async function GET(): Promise<Response> {
  if (!VPATE_REDIRECT_URL || !BASE_URL) {
    return Response.error();
  }

  const queryParams = new URLSearchParams({
    dust_redirect: `${BASE_URL}/api/callback`,
  });

  const redirectUrl = `${VPATE_REDIRECT_URL}/?${queryParams.toString()}`;

  return Response.redirect(redirectUrl, 302);
}
