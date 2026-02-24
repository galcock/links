# LINKS — Comprehensive Education System (CES)

<div align="center">

![LINKS Logo](https://img.shields.io/badge/LINKS-CES-7C3AED?style=for-the-badge&logo=graduation-cap&logoColor=white)

**The World's First Unified Education Platform**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.14-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)

</div>

---

## 🚀 Overview

LINKS is a **Comprehensive Education System (CES)** — a unified, cloud-based platform that replaces the fragmented landscape of education software (SIS, LMS, assessment tools, communication platforms, scheduling systems) with a single, student-centered portal.

### Key Features

- 📚 **7 Distinct User Interfaces** - Tailored experiences for Students, Instructors, Parents, Administrators, Student Services, Community Partners, and the Public
- 🔐 **Enterprise Security** - FERPA & HIPAA compliant with full audit logging
- 💬 **Real-time Communication** - WebSocket-powered messaging and WebRTC video calls
- 🤖 **AI Assistant** - Smart AI with educational guardrails for students
- 📅 **Unified Calendar** - Integrated scheduling across all user types
- 📊 **Comprehensive Analytics** - Data-driven insights for educators and administrators

## 🎨 User Portals

| Portal | Theme | Primary Use |
|--------|-------|-------------|
| **Student** | Purple (#7C3AED) | Learning, assignments, AI assistance |
| **Instructor** | Amber (#F59E0B) | Teaching, grading, curriculum |
| **Parent** | Emerald (#10B981) | Child monitoring, communication |
| **Administrator** | Orange (#D97706) | School management, analytics |
| **Student Services** | Blue (#3B82F6) | IEPs, counseling, therapy |
| **Community** | Teal (#14B8A6) | Partnerships, opportunities |
| **Public** | Slate (#64748B) | School information, events |

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **Real-time**: Socket.io
- **Video**: WebRTC with simple-peer
- **State Management**: Zustand + TanStack Query
- **Animations**: Framer Motion

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/galcock/links.git
cd links

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Generate Prisma client
npm run db:generate

# Run database migrations (requires PostgreSQL)
npm run db:push

# Start development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file with the following:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/links_ces"
JWT_SECRET="your-jwt-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## 📁 Project Structure

```
links/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (student)/         # Student portal
│   │   ├── (instructor)/      # Instructor portal
│   │   ├── (parent)/          # Parent portal
│   │   ├── (admin)/           # Admin portal
│   │   ├── (services)/        # Student services portal
│   │   ├── (community)/       # Community portal
│   │   ├── (public)/          # Public portal
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── ui/                # Base UI components
│   │   ├── layout/            # Layout components
│   │   └── features/          # Feature components
│   ├── lib/                   # Utilities and helpers
│   └── styles/                # Global styles
├── prisma/
│   └── schema.prisma          # Database schema
└── public/                    # Static assets
```

## 🔒 Security & Compliance

### FERPA Compliance
- Row-level security for student records
- Comprehensive audit logging (7-year retention)
- Consent management system
- Record amendment workflows

### HIPAA Compliance
- Encrypted PHI storage (AES-256)
- TLS 1.3 for all communications
- Healthcare provider role restrictions
- Breach notification system

### Student AI Guardrails
- Multi-layer content filtering
- Age-appropriate responses
- No assignment completion
- Parental visibility options

## 🚀 Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

Copyright © 2026 CES Links. All rights reserved.

## 📞 Contact

**Founder**: Dr. Marie Alcock  
**Email**: admin@ceslinks.io  
**Phone**: 818-658-9100  
**Website**: [ces-links.com](https://ces-links.com)

---

<div align="center">

**Built with ❤️ for Education**

</div>
