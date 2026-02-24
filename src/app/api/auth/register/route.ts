import { NextRequest, NextResponse } from 'next/server';

// Demo mode - no database required
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, role } = body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = [
      'STUDENT',
      'INSTRUCTOR',
      'PARENT',
      'ADMINISTRATOR',
      'STUDENT_SERVICES',
      'COMMUNITY_SERVICES',
    ];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // In demo mode, just return success
    // In production, this would create the user in the database
    return NextResponse.json({
      message: 'Registration successful',
      user: {
        id: `demo-${Date.now()}`,
        email: email.toLowerCase(),
        firstName,
        lastName,
        role,
      },
      demo: true,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
