import { NextRequest } from 'next/server';
import { refreshSession, setAuthCookies } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    // Get refresh token from cookie or body
    const refreshToken = 
      request.cookies.get('refresh_token')?.value ||
      (await request.json().catch(() => ({})))?.refreshToken;

    if (!refreshToken) {
      return unauthorizedError('Refresh token required');
    }

    // Refresh the session
    const result = await refreshSession(refreshToken);

    if (!result) {
      return unauthorizedError('Invalid or expired refresh token');
    }

    const { accessToken, refreshToken: newRefreshToken } = result;

    // Prepare cookies
    const cookies = setAuthCookies(accessToken, newRefreshToken);

    // Create response
    const response = successResponse({
      accessToken,
      refreshToken: newRefreshToken,
    });

    // Set cookies
    response.cookies.set(cookies.accessToken);
    response.cookies.set(cookies.refreshToken);

    return response;
  } catch (error) {
    console.error('Token refresh error:', error);
    return errorResponse('An error occurred during token refresh');
  }
}
