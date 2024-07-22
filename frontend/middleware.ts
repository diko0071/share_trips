import { getUserId, getAccessToken, handleRefresh } from './app/lib/actions'; 
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const userId = await getUserId();
  const token = await getAccessToken();

  if ((pathname === '/login' || pathname === '/register') && token && userId) {
    const redirectUrl = new URL('/', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  const protectedRoutes = ['/create-trip']; 
  if (protectedRoutes.includes(pathname) && (!token || !userId)) {
    const redirectUrl = new URL('/trips', request.url);
    return NextResponse.redirect(redirectUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/register', '/create-trip'],
};

