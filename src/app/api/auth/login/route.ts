import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Demo accounts for testing
const demoAccounts: Record<string, { password: string; role: string; firstName: string; lastName: string }> = {
  'student@demo.com': { password: 'Demo1234', role: 'STUDENT', firstName: 'Alex', lastName: 'Student' },
  'instructor@demo.com': { password: 'Demo1234', role: 'INSTRUCTOR', firstName: 'Sarah', lastName: 'Teacher' },
  'parent@demo.com': { password: 'Demo1234', role: 'PARENT', firstName: 'John', lastName: 'Parent' },
  'admin@demo.com': { password: 'Demo1234', role: 'ADMINISTRATOR', firstName: 'Mary', lastName: 'Admin' },
  'services@demo.com': { password: 'Demo1234', role: 'STUDENT_SERVICES', firstName: 'Dr.', lastName: 'Services' },
  'community@demo.com': { password: 'Demo1234', role: 'COMMUNITY_SERVICES', firstName: 'Community', lastName: 'Partner' },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const emailLower = email.toLowerCase();
    
    // Check demo accounts
    const demoAccount = demoAccounts[emailLower];
    if (demoAccount && demoAccount.password === password) {
      // Set a demo cookie
      const cookieStore = await cookies();
      cookieStore.set('demo-user', JSON.stringify({
        email: emailLower,
        role: demoAccount.role,
        firstName: demoAccount.firstName,
        lastName: demoAccount.lastName,
      }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return NextResponse.json({
        message: 'Login successful',
        user: {
          id: `demo-${Date.now()}`,
          email: emailLower,
          firstName: demoAccount.firstName,
          lastName: demoAccount.lastName,
          role: demoAccount.role,
        },
        demo: true,
      });
    }

    // For any other email/password combo in demo mode, accept it
    // Determine role from email or default to STUDENT
    let role = 'STUDENT';
    if (emailLower.includes('instructor') || emailLower.includes('teacher')) role = 'INSTRUCTOR';
    else if (emailLower.includes('parent')) role = 'PARENT';
    else if (emailLower.includes('admin')) role = 'ADMINISTRATOR';
    else if (emailLower.includes('service')) role = 'STUDENT_SERVICES';
    else if (emailLower.includes('community')) role = 'COMMUNITY_SERVICES';

    const cookieStore = await cookies();
    cookieStore.set('demo-user', JSON.stringify({
      email: emailLower,
      role,
      firstName: 'Demo',
      lastName: 'User',
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({
      message: 'Login successful (demo mode)',
      user: {
        id: `demo-${Date.now()}`,
        email: emailLower,
        firstName: 'Demo',
        lastName: 'User',
        role,
      },
      demo: true,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
