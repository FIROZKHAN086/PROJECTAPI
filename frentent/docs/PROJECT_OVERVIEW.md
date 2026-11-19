# ProjectAPI - Project Overview

## 📋 Executive Summary

**ProjectAPI** is a modern headless CMS platform designed specifically for developer portfolios. It enables developers to manage their project data in one centralized dashboard and expose it through a REST API, allowing multiple portfolio websites to consume the same data without manual editing.

**Live URL:** https://projectapi-app.vercel.app/

**Tagline:** "One Dashboard. One API. Unlimited Portfolio Projects."

**Built for:** Students, Freelancers, Open-source developers, and Agencies

---

## 🎯 Product Vision

### Problem Statement
Developers maintaining multiple portfolio websites face:
- Manual updates across multiple sites when project data changes
- Inconsistent project information across platforms
- Time-consuming content management
- Lack of centralized project data source

### Solution
ProjectAPI provides:
- **Single Source of Truth**: Manage all projects in one dashboard
- **Instant Synchronization**: Changes propagate instantly via API
- **Framework Agnostic**: Works with React, Vue, Next.js, Angular, Astro, Nuxt, Svelte, and static HTML
- **Developer-First**: REST API, webhooks, and framework-specific SDKs

---

## 🏗️ Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Vercel)                     │
│  Next.js 16 + React 19 + TypeScript + Tailwind CSS          │
│  - Public Landing Page                                       │
│  - Dashboard (Protected)                                     │
│  - API Playground                                            │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ HTTPS/REST API
                 │
┌────────────────▼────────────────────────────────────────────┐
│                   Backend (Render)                           │
│  Node.js + Express + TypeScript                              │
│  - REST API Endpoints                                        │
│  - JWT Authentication                                        │
│  - OTP Verification                                          │
│  - Media Upload Management                                   │
└───┬──────────┬──────────────┬──────────────┬────────────────┘
    │          │               │              │
    │          │               │              │
┌───▼────┐ ┌──▼─────┐  ┌─────▼─────┐  ┌────▼─────────┐
│PostgreSQL│ │ Redis  │  │ ImageKit  │  │ Cloudinary  │
│ (Prisma) │ │(Cache/ │  │  (Images) │  │  (Media)    │
│          │ │ OTP)   │  │           │  │             │
└──────────┘ └────────┘  └───────────┘  └─────────────┘
```

---

## 💻 Technology Stack

### Frontend Technologies

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | Next.js | 16.2.10 | React framework with App Router |
| **UI Library** | React | 19.2.4 | Component-based UI |
| **Language** | TypeScript | 5.x | Type safety |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS |
| **State Management** | Redux Toolkit | 2.12.0 | Global state |
| **Data Fetching** | React Query | 5.101.2 | Server state management |
| **HTTP Client** | Axios | 1.18.1 | API requests |
| **Animations** | Framer Motion | 12.42.2 | UI animations |
| | GSAP | 3.15.0 | Advanced animations |
| | Lenis | 1.3.25 | Smooth scrolling |
| **UI Components** | shadcn/ui | Latest | Accessible components |
| | Lucide React | 1.23.0 | Icons |
| | Hugeicons | 4.2.2 | Additional icons |
| **Forms** | React Hook Form | - | Form management |
| **Validation** | Zod | - | Schema validation |
| **Monitoring** | Sentry | 11.1.0 | Error tracking |
| | Vercel Analytics | 2.0.1 | Analytics |
| | Speed Insights | 2.0.0 | Performance |

### Backend Technologies

| Category | Technology | Purpose |
|----------|------------|---------|
| **Runtime** | Node.js | JavaScript runtime |
| **Framework** | Express | Web framework |
| **Language** | TypeScript | Type safety |
| **Database** | PostgreSQL | Relational database |
| **ORM** | Prisma | Database toolkit |
| **Cache** | Redis | Session/OTP/rate limiting |
| **Authentication** | JWT | Token-based auth |
| **Password** | Bcrypt | Password hashing |
| **Email** | Nodemailer | SMTP email delivery |
| **Media Storage** | ImageKit & Cloudinary | Image/video hosting |
| **Container** | Docker | Development environment |

### Deployment & Infrastructure

| Component | Platform | Purpose |
|-----------|----------|---------|
| **Frontend** | Vercel | Next.js hosting |
| **Backend** | Render | API server hosting |
| **Database** | Render/AWS RDS | PostgreSQL hosting |
| **Cache** | Render/Upstash | Redis hosting |
| **Media** | ImageKit/Cloudinary | CDN for assets |
| **Domain** | Vercel | DNS management |

---

## 🎨 Design System

### Brand Colors

```css
/* Primary Background */
--bg-primary: #11120D;

/* Primary Text */
--text-primary: #FFFBF4;

/* Accent Colors */
--accent-green-1: #4ADE80;
--accent-green-2: #a3e635;
--accent-green-3: #10B981;

/* Secondary Text */
--text-secondary: #D8CFBC;
--text-muted: #8A8578;
```

### Typography

- **Primary Font**: Unbounded (Headings, Display)
- **Secondary Font**: Comic Relief (Body text)
- **Monospace**: System mono (Code snippets)

### Design Principles

1. **Premium & Minimal**: Editorial-style layouts with generous whitespace
2. **Dark Mode First**: Designed for dark backgrounds
3. **Technical Aesthetic**: Developer-focused with code-like elements
4. **Smooth Animations**: GSAP + Framer Motion for polished interactions
5. **Responsive**: Mobile-first approach with intentional compositions

---

## 📦 Key Features

### 1. Project Manager
- Create, update, archive, duplicate projects
- Rich project fields: title, slug, description, images, stack, achievements
- Search, filter, and sort capabilities
- Featured project highlighting

### 2. Public REST API
- Auto-generated endpoints per user
- JSON response format
- Real-time synchronization
- CORS enabled

### 3. API Playground
- Live request testing
- Code snippet generator (Fetch, Axios, React hooks, Next.js)
- Response visualization
- Request/response history

### 4. Secure Media Storage
- Upload images, videos, GIFs, documents
- CDN delivery via ImageKit/Cloudinary
- Optimized media serving
- Public URLs generated

### 5. Authentication & Access Control
- Email/password registration
- Google OAuth sign-in
- OTP verification (6-digit)
- JWT-based sessions
- Protected API routes

### 6. Framework Support
- React
- Next.js
- Vue
- Angular
- Astro
- Nuxt
- Svelte
- Static HTML

---

## 🔐 Security Features

### Authentication Flow

1. **Registration**
   - Email + Password input
   - Password hashing (Bcrypt)
   - OTP generation (6-digit)
   - Redis storage (pending registration)
   - Email delivery
   - OTP verification
   - User creation in PostgreSQL
   - JWT token issuance

2. **Login**
   - Email + Password verification
   - JWT token generation
   - HttpOnly cookie (production)
   - Session management

3. **OTP Protection**
   - 60-second resend cooldown
   - 5 attempts per hour limit
   - Redis-based rate limiting
   - Brute force protection

### Security Measures

- HTTPS only in production
- HttpOnly cookies
- CORS configuration
- Rate limiting (Redis)
- Password hashing (Bcrypt)
- JWT token expiry
- Environment variables for secrets
- Input validation
- SQL injection protection (Prisma)
- XSS prevention

---

## 📁 Project Structure

```
frentent/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── login/               # Authentication pages
│   ├── dashboard/           # Protected dashboard
│   └── docs/                # Documentation
├── src/
│   ├── Components/          # Shared components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Homepage.tsx
│   │   ├── SmoothScrollProvider.tsx
│   │   └── dashboard/       # Dashboard components
│   ├── Page/                # Page sections
│   │   ├── Hero/           # Hero section + components
│   │   ├── ProblemSolution/
│   │   └── SocialProofPricing/
│   ├── Home/               # Home page sections
│   ├── lib/                # Core utilities
│   │   ├── store.ts        # Redux store
│   │   ├── authSlice.ts    # Auth state
│   │   ├── hooks.ts        # Custom hooks
│   │   └── animations.tsx  # Animation utilities
│   └── hooks/              # React hooks
├── components/ui/          # shadcn/ui components
├── public/                 # Static assets
├── docs/                   # Documentation (this folder)
├── .env.local             # Environment variables (not committed)
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

---

## 🌐 API Endpoints

### Public Endpoints

```
GET  /api/v1/projects         # List all projects (public)
GET  /api/v1/projects/:id     # Get single project
GET  /api/v1/user/:userId     # Get user profile
```

### Protected Endpoints (Require JWT)

```
POST   /api/v1/auth/register  # User registration
POST   /api/v1/auth/login     # User login
POST   /api/v1/auth/verify-otp # OTP verification
POST   /api/v1/auth/resend-otp # Resend OTP
GET    /api/v1/auth/me        # Get current user
POST   /api/v1/auth/logout    # Logout

POST   /api/v1/projects       # Create project
PUT    /api/v1/projects/:id   # Update project
DELETE /api/v1/projects/:id   # Delete project

POST   /api/v1/upload/image   # Upload image
POST   /api/v1/upload/video   # Upload video
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Redis instance
- ImageKit account (optional)
- Cloudinary account (optional)

### Environment Variables

```env
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Backend (.env)
DATABASE_URL=postgresql://user:password@localhost:5432/projectapi
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
IMAGEKIT_PUBLIC_KEY=your-key
IMAGEKIT_PRIVATE_KEY=your-key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-id
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
```

### Installation

```bash
# Frontend
cd frentent
npm install
npm run dev

# Backend (separate repository)
cd backend
npm install
npm run dev
```

---

## 📊 Performance Metrics

### Target Metrics

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **API Response Time**: < 200ms (p95)

### Optimization Strategies

1. **Image Optimization**: Next.js Image component, WebP format
2. **Code Splitting**: Dynamic imports, route-based splitting
3. **Caching**: Redis for sessions/OTP, SWR for client-side
4. **CDN**: Vercel Edge Network, ImageKit/Cloudinary
5. **Bundle Size**: Tree shaking, minimal dependencies
6. **SSR/SSG**: Strategic use of server-side rendering

---

## 📈 Analytics & Monitoring

### Tools Integrated

1. **Vercel Analytics**: Page views, user metrics
2. **Vercel Speed Insights**: Core Web Vitals
3. **Sentry**: Error tracking, performance monitoring
4. **Custom Events**: User interactions, API calls

### Key Metrics Tracked

- Page views and unique visitors
- User registration/login events
- Project creation/updates
- API endpoint usage
- Error rates and types
- Performance metrics

---

## 🧪 Testing Strategy

### Testing Approach

1. **Unit Tests**: Component and utility testing
2. **Integration Tests**: API endpoint testing
3. **E2E Tests**: User flow testing
4. **Manual Testing**: Cross-browser, responsive design

### Testing Tools (To be implemented)

- Jest (Unit tests)
- React Testing Library (Component tests)
- Cypress/Playwright (E2E tests)
- Postman (API testing)

---

## 🔄 Development Workflow

### Git Workflow

1. **Main Branch**: Production-ready code
2. **Development Branch**: Integration branch
3. **Feature Branches**: `feature/feature-name`
4. **Bug Fix Branches**: `fix/bug-description`

### Deployment Pipeline

```
Code Push → GitHub → Vercel (Auto Deploy) → Production
                   ↓
                Build Check → Type Check → Deploy
```

---

## 📞 Support & Resources

### Documentation

- **API Docs**: `/docs` route
- **API Reference**: In-app playground
- **Status Page**: System status monitoring
- **Changelog**: Feature updates and fixes

### Community

- GitHub Issues: Bug reports and feature requests
- Email Support: Contact form in dashboard
- Twitter: Updates and announcements

---

## 🗺️ Roadmap

### Completed Features ✅

- User authentication (Email + Google)
- Project CRUD operations
- REST API endpoints
- Media upload system
- API playground with code snippets
- Responsive dashboard
- Public landing page

### In Progress 🚧

- Hero page redesign with scroll animations
- Advanced filtering and search
- API key management
- Webhook system

### Planned Features 📋

- GraphQL API option
- Version control for projects
- Team collaboration
- Custom domains
- Analytics dashboard
- Export/Import functionality
- Project templates
- Third-party integrations

---

## 📄 License

Proprietary - All rights reserved © 2026 ProjectAPI

---

## 👥 Team

**Project Owner**: FIROZ KHAN

**Contributors**: Claude Code (AI Assistant)

**Contact**: Available through in-app support

---

**Last Updated**: November 17, 2026
**Version**: 1.0.0
**Document Status**: Living Document (Updated as project evolves)
