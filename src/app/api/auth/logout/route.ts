import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAccessToken, revokeSession } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (accessToken) {
      const payload = await verifyAccessToken(accessToken);
      if (payload) {
        // Revoke all sessions for this user
        await revokeSession(payload.userId);

        // Log logout
        await createAuditLog({
          action: 'LOGOUT',
          entityType: 'USER',
          entityId: payload.userId,
          userId: payload.userId,
          organizationId: payload.organizationId,
        });
      }
    }

    // Clear cookies
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');

    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    // Still clear cookies even if there's an error
    const cookieStore = await cookies();
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
    
    return NextResponse.json({ message: 'Logged out' });
  }
}
