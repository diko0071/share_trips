import { getUserId, getAccessToken, handleRefresh, getIsEmailVerified } from './app/lib/actions'; 
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const userId = await getUserId();
  const token = await getAccessToken();
  const isEmailVerified = await getIsEmailVerified();

  if ((pathname === '/login' || pathname === '') && token && userId) {
    const redirectUrl = new URL('/', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if ((pathname === '/email-confirmation' || pathname === '/email-confirmation-send') && isEmailVerified) {
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
  matcher: ['/create-trip', '/email-confirmation', '/email-confirmation-send'],
};

