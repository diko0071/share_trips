'use server';

import ApiService from "../services/apiService";
import { cookies } from "next/headers";

export async function handleLogin(userId: string, accessToken: string, refreshToken: string,) {

  cookies().set('session_userid', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  });

  cookies().set('session_access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60,
    path: '/'
  });

  cookies().set('session_refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  });
}

export async function resetAuthCookies() {
  cookies().set('session_userid', '');
  cookies().set('session_access_token', '');
  cookies().set('session_refresh_token', '');
}

export async function getUserId() {

  const userId = cookies().get('session_userid')?.value;
  return userId ? userId : null;
}

export async function getAccessToken() {
  let accessToken = cookies().get('session_access_token')?.value;
  return accessToken ? accessToken : null;
}

export async function getRefreshToken() {
  let refreshToken = cookies().get('session_refresh_token')?.value;
  return refreshToken ? refreshToken : null;
}

export async function handleRefresh() {

  const refreshToken = await getRefreshToken();

  try {
    const response = await ApiService.post('/api/auth/token/refresh/', JSON.stringify({ refresh: refreshToken }));
    if (response.access) {
      cookies().set('session_access_token', response.access, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60,
        path: '/'
      });

      return response.access;
    } else {
      resetAuthCookies();
    }
  } catch (error) {
    resetAuthCookies();
  }

  return null;
}