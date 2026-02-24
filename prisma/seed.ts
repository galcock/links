import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clean existing data (in order of dependencies)
  await prisma.grade.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversationParticipant.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.calendarEvent.deleteMany();
  await prisma.calendar.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.workspaceComment.deleteMany();
  await prisma.workspaceTask.deleteMany();
  await prisma.workspaceColumn.deleteMany();
  await prisma.workspaceMember.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.learningSet.deleteMany();
  await prisma.curriculumUnit.deleteMany();
  await prisma.curriculumPlan.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.team.deleteMany();
  await prisma.file.deleteMany();
  await prisma.folder.deleteMany();
  await prisma.serviceRecord.deleteMany();
  await prisma.iEPDocument.deleteMany();
  await prisma.parentStudentLink.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.instructorProfile.deleteMany();
  await prisma.parentProfile.deleteMany();
  await prisma.adminProfile.deleteMany();
  await prisma.servicesProfile.deleteMany();
  await prisma.communityProfile.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();

  // Create Organizations
  const org = await prisma.organization.create({
    data: {
      name: 'Lincoln High School',
      slug: 'lincoln-hs',
      type: 'SCHOOL',
      address: '123 Education Drive',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'US',
      phone: '(555) 123-4567',
      email: 'info@lincolnhs.edu',
    },
  });

  console.log('✓ Created organization');

  // Hash password for all demo users
  const passwordHash = await bcrypt.hash('Demo1234', 12);

  // Create Administrator
  const admin = await prisma.user.create({
    data: {
      email: 'admin@demo.com',
      passwordHash,
      firstName: 'Mary',
      lastName: 'Admin',
      role: 'ADMINISTRATOR',
      status: 'ACTIVE',
      organizationId: org.id,
      emailVerified: true,
    },
  });

  await prisma.adminProfile.create({
    data: {
      userId: admin.id,
      department: 'Administration',
      title: 'Principal',
      permissions: ['all'],
    },
  });

  // Create Instructors
  const instructor1 = await prisma.user.create({
    data: {
      email: 'instructor@demo.com',
      passwordHash,
      firstName: 'Sarah',
      lastName: 'Teacher',
      role: 'INSTRUCTOR',
      status: 'ACTIVE',
      organizationId: org.id,
      emailVerified: true,
    },
  });

  const instructorProfile1 = await prisma.instructorProfile.create({
    data: {
      userId: instructor1.id,
      employeeId: 'INST001',
      department: 'Mathematics',
      title: 'Math Teacher',
      certifications: ['Secondary Education', 'Advanced Mathematics'],
      subjects: ['Algebra', 'Calculus', 'Geometry'],
      yearsExperience: 8,
      bio: 'Passionate about making mathematics accessible and engaging for all students.',
    },
  });

  const instructor2 = await prisma.user.create({
    data: {
      email: 'jdoe@demo.com',
      passwordHash,
      firstName: 'John',
      lastName: 'Doe',
      role: 'INSTRUCTOR',
      status: 'ACTIVE',
      organizationId: org.id,
      emailVerified: true,
    },
  });

  const instructorProfile2 = await prisma.instructorProfile.create({
    data: {
      userId: instructor2.id,
      employeeId: 'INST002',
      department: 'Science',
      title: 'Biology Teacher',
      certifications: ['Biology', 'Secondary Education'],
      subjects: ['Biology', 'Chemistry', 'Environmental Science'],
      yearsExperience: 5,
    },
  });

  // Create Students
  const students = [];
  const studentProfiles = [];

  for (let i = 1; i <= 10; i++) {
    const student = await prisma.user.create({
      data: {
        email: `student${i}@demo.com`,
        passwordHash,
        firstName: ['Alex', 'Jamie', 'Sam', 'Taylor', 'Jordan', 'Casey', 'Morgan', 'Riley', 'Dakota', 'Quinn'][i - 1],
        lastName: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'][i - 1],
        role: 'STUDENT',
        status: 'ACTIVE',
        organizationId: org.id,
        emailVerified: true,
        dateOfBirth: new Date(2006 + Math.floor(i / 3), (i % 12), 15),
      },
    });

    const profile = await prisma.studentProfile.create({
      data: {
        userId: student.id,
        studentId: `STU${String(i).padStart(4, '0')}`,
        gradeLevel: 9 + Math.floor(i / 3),
        graduationYear: 2024 + Math.floor(i / 3),
        gpa: 2.5 + Math.random() * 1.5,
        credits: 20 + i * 5,
        interests: ['Math', 'Science', 'Arts', 'Sports'][i % 4],
      },
    });

    students.push(student);
    studentProfiles.push(profile);
  }

  // Create Parents
  const parent1 = await prisma.user.create({
    data: {
      email: 'parent@demo.com',
      passwordHash,
      firstName: 'John',
      lastName: 'Parent',
      role: 'PARENT',
      status: 'ACTIVE',
      organizationId: org.id,
      emailVerified: true,
    },
  });

  const parentProfile1 = await prisma.parentProfile.create({
    data: {
      userId: parent1.id,
      occupation: 'Software Engineer',
      emergencyContact: true,
    },
  });

  // Link parent to students
  await prisma.parentStudentLink.create({
    data: {
      parentProfileId: parentProfile1.id,
      studentProfileId: studentProfiles[0].id,
      relationship: 'Parent',
      isPrimary: true,
      canViewGrades: true,
      canCommunicate: true,
    },
  });

  // Create Student Services user
  const services = await prisma.user.create({
    data: {
      email: 'services@demo.com',
      passwordHash,
      firstName: 'Dr. Maria',
      lastName: 'Services',
      role: 'STUDENT_SERVICES',
      status: 'ACTIVE',
      organizationId: org.id,
      emailVerified: true,
    },
  });

  await prisma.servicesProfile.create({
    data: {
      userId: services.id,
      employeeId: 'SVC001',
      serviceType: 'COUNSELING',
      licenseNumber: 'LPC-12345',
      certifications: ['School Counseling', 'Mental Health First Aid'],
      specializations: ['College Counseling', 'Career Guidance'],
    },
  });

  // Create Community Services user
  const community = await prisma.user.create({
    data: {
      email: 'community@demo.com',
      passwordHash,
      firstName: 'Lisa',
      lastName: 'Partner',
      role: 'COMMUNITY_SERVICES',
      status: 'ACTIVE',
      organizationId: org.id,
      emailVerified: true,
    },
  });

  await prisma.communityProfile.create({
    data: {
      userId: community.id,
      organizationName: 'Tech Career Network',
      role: 'Career Counselor',
      partnerType: 'CAREER_RECRUITER',
    },
  });

  console.log('✓ Created users and profiles');

  // Create Courses
  const course1 = await prisma.course.create({
    data: {
      name: 'Algebra I',
      code: 'MATH101',
      description: 'Introduction to algebraic concepts and problem-solving',
      credits: 1.0,
      gradeLevel: 9,
      subject: 'Mathematics',
      status: 'PUBLISHED',
      maxEnrollment: 30,
      organizationId: org.id,
      instructorId: instructorProfile1.id,
      startDate: new Date('2024-09-01'),
      endDate: new Date('2025-06-15'),
    },
  });

  const course2 = await prisma.course.create({
    data: {
      name: 'Biology',
      code: 'SCI201',
      description: 'General biology covering cells, genetics, and ecosystems',
      credits: 1.0,
      gradeLevel: 10,
      subject: 'Science',
      status: 'PUBLISHED',
      maxEnrollment: 25,
      organizationId: org.id,
      instructorId: instructorProfile2.id,
      startDate: new Date('2024-09-01'),
      endDate: new Date('2025-06-15'),
    },
  });

  const course3 = await prisma.course.create({
    data: {
      name: 'Calculus AP',
      code: 'MATH401',
      description: 'Advanced Placement Calculus - College Level',
      credits: 1.0,
      gradeLevel: 12,
      subject: 'Mathematics',
      status: 'PUBLISHED',
      maxEnrollment: 20,
      organizationId: org.id,
      instructorId: instructorProfile1.id,
      startDate: new Date('2024-09-01'),
      endDate: new Date('2025-06-15'),
    },
  });

  console.log('✓ Created courses');

  // Create Enrollments
  for (let i = 0; i < 6; i++) {
    await prisma.enrollment.create({
      data: {
        userId: students[i].id,
        courseId: course1.id,
        status: 'ACTIVE',
      },
    });
  }

  for (let i = 3; i < 9; i++) {
    await prisma.enrollment.create({
      data: {
        userId: students[i].id,
        courseId: course2.id,
        status: 'ACTIVE',
      },
    });
  }

  for (let i = 6; i < 10; i++) {
    await prisma.enrollment.create({
      data: {
        userId: students[i].id,
        courseId: course3.id,
        status: 'ACTIVE',
      },
    });
  }

  console.log('✓ Created enrollments');

  // Create Assignments
  const assignment1 = await prisma.assignment.create({
    data: {
      title: 'Polynomial Expressions Worksheet',
      description: 'Complete problems 1-25 on polynomial operations',
      instructions: 'Show all work for full credit. Use proper notation.',
      type: 'HOMEWORK',
      points: 100,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'PUBLISHED',
      courseId: course1.id,
      createdById: instructor1.id,
      allowLateSubmission: true,
      latePenalty: 10,
    },
  });

  const assignment2 = await prisma.assignment.create({
    data: {
      title: 'Midterm Exam',
      description: 'Comprehensive exam covering chapters 1-5',
      type: 'TEST',
      points: 200,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: 'PUBLISHED',
      courseId: course1.id,
      createdById: instructor1.id,
      allowLateSubmission: false,
    },
  });

  const assignment3 = await prisma.assignment.create({
    data: {
      title: 'Cell Structure Lab Report',
      description: 'Write a comprehensive lab report on cell observation',
      type: 'LAB',
      points: 150,
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      status: 'PUBLISHED',
      courseId: course2.id,
      createdById: instructor2.id,
      allowLateSubmission: true,
      latePenalty: 15,
    },
  });

  console.log('✓ Created assignments');

  // Create Submissions and Grades
  const submission1 = await prisma.submission.create({
    data: {
      assignmentId: assignment1.id,
      userId: students[0].id,
      content: 'Completed all 25 problems with detailed work shown.',
      status: 'SUBMITTED',
      isLate: false,
    },
  });

  await prisma.grade.create({
    data: {
      submissionId: submission1.id,
      studentId: students[0].id,
      instructorId: instructor1.id,
      score: 92,
      maxScore: 100,
      percentage: 92,
      letterGrade: 'A',
      feedback: 'Excellent work! Very thorough explanations.',
    },
  });

  console.log('✓ Created submissions and grades');

  // Create Calendar
  const calendar = await prisma.calendar.create({
    data: {
      name: 'School Calendar',
      color: '#3B82F6',
      isPublic: true,
      organizationId: org.id,
    },
  });

  // Create Calendar Events
  await prisma.calendarEvent.createMany({
    data: [
      {
        title: 'First Day of School',
        startTime: new Date('2024-09-01T08:00:00'),
        endTime: new Date('2024-09-01T15:00:00'),
        type: 'EVENT',
        visibility: 'PUBLIC',
        calendarId: calendar.id,
        userId: admin.id,
      },
      {
        title: 'Parent-Teacher Conferences',
        startTime: new Date('2024-11-15T17:00:00'),
        endTime: new Date('2024-11-15T20:00:00'),
        type: 'MEETING',
        visibility: 'PUBLIC',
        calendarId: calendar.id,
        userId: admin.id,
      },
      {
        title: 'Math Homework Due',
        startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3600000),
        type: 'DEADLINE',
        visibility: 'PRIVATE',
        calendarId: calendar.id,
        userId: students[0].id,
      },
    ],
  });

  console.log('✓ Created calendar and events');

  // Create Announcements
  await prisma.announcement.createMany({
    data: [
      {
        title: 'Welcome Back Students!',
        content: 'We are excited to welcome all students back for the new school year. Let\'s make it a great one!',
        type: 'INFO',
        priority: 'NORMAL',
        isPublished: true,
        publishedAt: new Date(),
        isPinned: true,
        organizationId: org.id,
        authorId: admin.id,
      },
      {
        title: 'Early Dismissal Friday',
        content: 'School will dismiss at 12:00 PM this Friday for teacher professional development.',
        type: 'ALERT',
        priority: 'HIGH',
        isPublished: true,
        publishedAt: new Date(),
        organizationId: org.id,
        authorId: admin.id,
      },
    ],
  });

  console.log('✓ Created announcements');

  // Create Workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: 'Math Department Projects',
      description: 'Collaborative workspace for math department initiatives',
      type: 'DEPARTMENT',
      organizationId: org.id,
    },
  });

  await prisma.workspaceMember.create({
    data: {
      workspaceId: workspace.id,
      userId: instructor1.id,
      role: 'OWNER',
    },
  });

  const column1 = await prisma.workspaceColumn.create({
    data: {
      name: 'To Do',
      sequence: 0,
      color: '#94A3B8',
      workspaceId: workspace.id,
    },
  });

  const column2 = await prisma.workspaceColumn.create({
    data: {
      name: 'In Progress',
      sequence: 1,
      color: '#3B82F6',
      workspaceId: workspace.id,
    },
  });

  await prisma.workspaceTask.create({
    data: {
      title: 'Update curriculum standards',
      description: 'Review and update math curriculum to align with new state standards',
      priority: 'HIGH',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      sequence: 0,
      workspaceId: workspace.id,
      columnId: column1.id,
      assigneeId: instructor1.id,
    },
  });

  console.log('✓ Created workspace');

  // Create Curriculum Plan
  const curriculumPlan = await prisma.curriculumPlan.create({
    data: {
      name: 'Algebra I - Full Year',
      description: 'Complete curriculum plan for Algebra I',
      scope: 'SHARED',
      gradeLevel: 9,
      subject: 'Mathematics',
      standards: ['CCSS.MATH.CONTENT.HSA'],
      instructorId: instructorProfile1.id,
    },
  });

  const unit1 = await prisma.curriculumUnit.create({
    data: {
      name: 'Introduction to Variables and Expressions',
      description: 'Basic algebraic concepts and notation',
      sequence: 1,
      duration: '3 weeks',
      objectives: ['Understand variables', 'Evaluate expressions', 'Simplify expressions'],
      curriculumPlanId: curriculumPlan.id,
    },
  });

  await prisma.learningSet.createMany({
    data: [
      {
        name: 'What is Algebra?',
        type: 'LESSON',
        sequence: 1,
        duration: 45,
        content: { objectives: ['Define algebra', 'Identify real-world applications'] },
        curriculumUnitId: unit1.id,
      },
      {
        name: 'Variables Practice',
        type: 'ACTIVITY',
        sequence: 2,
        duration: 30,
        content: { worksheets: ['Variables Worksheet A'] },
        curriculumUnitId: unit1.id,
      },
    ],
  });

  console.log('✓ Created curriculum');

  // Create Team
  const team = await prisma.team.create({
    data: {
      name: 'Math Club',
      description: 'After-school math enrichment and competition prep',
      type: 'CLUB',
      isPublic: true,
      organizationId: org.id,
    },
  });

  await prisma.teamMember.createMany({
    data: [
      { teamId: team.id, userId: instructor1.id, role: 'OWNER' },
      { teamId: team.id, userId: students[0].id, role: 'MEMBER' },
      { teamId: team.id, userId: students[1].id, role: 'MEMBER' },
      { teamId: team.id, userId: students[2].id, role: 'MEMBER' },
    ],
  });

  console.log('✓ Created team');

  // Create Folders
  const folder = await prisma.folder.create({
    data: {
      name: 'My Documents',
      ownerId: students[0].id,
      organizationId: org.id,
      color: '#3B82F6',
      isShared: false,
    },
  });

  console.log('✓ Created folders');

  // Create Service Records
  await prisma.serviceRecord.create({
    data: {
      type: 'COUNSELING',
      sessionDate: new Date(),
      duration: 45,
      notes: 'Discussed college application timeline and requirements',
      goals: ['Identify college preferences', 'Create application timeline'],
      progress: { status: 'On track' },
      status: 'COMPLETED',
      studentId: students[0].id,
    },
  });

  console.log('✓ Created service records');

  // Create Conversations
  const conversation = await prisma.conversation.create({
    data: {
      type: 'DIRECT',
      lastMessageAt: new Date(),
    },
  });

  await prisma.conversationParticipant.createMany({
    data: [
      { conversationId: conversation.id, userId: instructor1.id, role: 'MEMBER' },
      { conversationId: conversation.id, userId: students[0].id, role: 'MEMBER' },
    ],
  });

  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderId: instructor1.id,
      content: 'Great work on your last assignment! Keep up the excellent progress.',
      type: 'TEXT',
    },
  });

  console.log('✓ Created messages');

  console.log('\n✅ Seed completed successfully!');
  console.log('\nDemo Accounts:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Administrator: admin@demo.com / Demo1234');
  console.log('Instructor:    instructor@demo.com / Demo1234');
  console.log('Student:       student1@demo.com / Demo1234');
  console.log('Parent:        parent@demo.com / Demo1234');
  console.log('Services:      services@demo.com / Demo1234');
  console.log('Community:     community@demo.com / Demo1234');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
