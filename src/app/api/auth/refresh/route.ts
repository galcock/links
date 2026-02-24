import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { refreshSession, setAuthCookies } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'No refresh token provided' },
        { status: 401 }
      );
    }

    const tokens = await refreshSession(refreshToken);

    if (!tokens) {
      // Clear invalid tokens
      cookieStore.delete('access_token');
      cookieStore.delete('refresh_token');
      
      return NextResponse.json(
        { error: 'Invalid or expired refresh token' },
        { status: 401 }
      );
    }

    // Set new cookies
    const authCookies = setAuthCookies(tokens.accessToken, tokens.refreshToken);
    
    cookieStore.set(authCookies.accessToken.name, authCookies.accessToken.value, {
      httpOnly: authCookies.accessToken.httpOnly,
      secure: authCookies.accessToken.secure,
      sameSite: authCookies.accessToken.sameSite,
      maxAge: authCookies.accessToken.maxAge,
      path: authCookies.accessToken.path,
    });
    
    cookieStore.set(authCookies.refreshToken.name, authCookies.refreshToken.value, {
      httpOnly: authCookies.refreshToken.httpOnly,
      secure: authCookies.refreshToken.secure,
      sameSite: authCookies.refreshToken.sameSite,
      maxAge: authCookies.refreshToken.maxAge,
      path: authCookies.refreshToken.path,
    });

    return NextResponse.json({ message: 'Token refreshed successfully' });
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { error: 'An error occurred during token refresh' },
      { status: 500 }
    );
  }
}
