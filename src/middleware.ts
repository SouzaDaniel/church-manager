import { NextResponse } from 'next/server';
import type { NextMiddleware } from 'next/server';

export const middleware: NextMiddleware = async (request) => {
  if (request.nextUrl.pathname.includes('/auth')) {
    const { cookies } = request;

    const { value: token } = cookies.get('token') ?? {};

    if (!token) return NextResponse.next();

    try {
      return NextResponse.redirect(new URL('/', request.url));
    } catch (error) {
      cookies.delete('token');

      return NextResponse.next();
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
