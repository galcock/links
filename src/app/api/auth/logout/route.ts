import { NextRequest } from 'next/server';
import { getCurrentUser, revokeSession } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (user) {
      // Revoke all refresh tokens for this user
      await revokeSession(user.id);
    }

    // Create response
    const response = successResponse({ message: 'Logged out successfully' });

    // Clear cookies
    response.cookies.set('access_token', '', { maxAge: 0 });
    response.cookies.set('refresh_token', '', { maxAge: 0 });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return errorResponse('An error occurred during logout');
  }
}
