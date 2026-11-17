# Technical Architecture Document (TAD)

## ProjectAPI - Technical Architecture & Implementation Details

**Document Version:** 1.0  
**Last Updated:** November 17, 2026  
**Author:** Development Team  
**Status:** Active

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Frontend Architecture](#frontend-architecture)
3. [Backend Architecture](#backend-architecture)
4. [Database Schema](#database-schema)
5. [Authentication & Authorization](#authentication--authorization)
6. [API Design](#api-design)
7. [State Management](#state-management)
8. [Animation System](#animation-system)
9. [Deployment Architecture](#deployment-architecture)
10. [Performance Optimization](#performance-optimization)
11. [Security Architecture](#security-architecture)
12. [Monitoring & Observability](#monitoring--observability)

---

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          Client Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Browser    │  │    Mobile    │  │  Third-Party │          │
│  │   (Chrome,   │  │   (Safari,   │  │     API      │          │
│  │   Firefox)   │  │   Chrome)    │  │   Consumers  │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          └──────────────────┴──────────────────┘
                             │
                    HTTPS/WebSocket
                             │
┌────────────────────────────▼─────────────────────────────────────┐
│                     Edge/CDN Layer (Vercel)                       │
│  - Static asset caching                                           │
│  - Global edge network                                            │
│  - DDoS protection                                                │
└────────────────────────────┬─────────────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────────────┐
│                    Application Layer                              │
│  ┌───────────────────────────────────────────────────────┐       │
│  │         Next.js Frontend (Vercel)                     │       │
│  │  - SSR/SSG pages                                      │       │
│  │  - React 19 components                                │       │
│  │  - Client-side routing                                │       │
│  │  - State management (Redux)                           │       │
│  └─────────────────────┬─────────────────────────────────┘       │
│                        │                                          │
│                   REST API                                        │
│                        │                                          │
│  ┌─────────────────────▼─────────────────────────────────┐       │
│  │      Express.js Backend (Render)                      │       │
│  │  - RESTful API endpoints                              │       │
│  │  - JWT authentication                                 │       │
│  │  - Business logic                                     │       │
│  │  - Media upload handling                              │       │
│  └─────────────────────┬─────────────────────────────────┘       │
└────────────────────────┼─────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼───────┐ ┌─────▼──────┐ ┌──────▼────────┐
│   PostgreSQL  │ │   Redis    │ │  Media CDN    │
│   (Primary    │ │  (Cache &  │ │  (ImageKit/   │
│   Database)   │ │   Session) │ │  Cloudinary)  │
└───────────────┘ └────────────┘ └───────────────┘
```

### 1.2 Network Architecture

```
Internet
    │
    ├─── DNS (Vercel) → projectapi-app.vercel.app
    │
    ├─── CDN (Vercel Edge Network)
    │    └─── Static Assets (JS, CSS, Images)
    │
    ├─── Frontend (Vercel)
    │    └─── Next.js SSR/SSG
    │
    ├─── API Gateway (Render)
    │    └─── Express.js API
    │
    └─── External Services
         ├─── ImageKit (Media CDN)
         ├─── Cloudinary (Backup Media)
         ├─── Sentry (Monitoring)
         └─── Email (SMTP)
```

---

## 2. Frontend Architecture

### 2.1 Technology Stack

```typescript
// Core Framework
Next.js 16.2.10 (React 19.2.4)
├── App Router (app/)
├── Server Components
├── Client Components ("use client")
├── API Routes (deprecated, using external API)
└── Middleware

// State Management
Redux Toolkit 2.12.0
├── Redux Store (store.ts)
├── Slices
│   ├── authSlice (authentication state)
│   ├── projectSlice (project management)
│   └── toastSlice (notifications)
└── RTK Query (API integration)

// Data Fetching
React Query (TanStack Query) 5.101.2
├── Query caching
├── Automatic refetching
├── Optimistic updates
└── Devtools integration

// Animation Libraries
GSAP 3.15.0 + ScrollTrigger
├── Scroll-based animations
├── Timeline animations
├── Parallax effects
└── Character/word reveals

Framer Motion 12.42.2
├── Component animations
├── Page transitions
├── Gesture animations
└── Layout animations

Lenis 1.3.25
└── Smooth scrolling
```

### 2.2 Component Architecture

```
src/
├── Components/          # Shared components
│   ├── Navbar.tsx
│   │   ├── Desktop navigation
│   │   ├── Mobile sheet navigation
│   │   ├── Profile dropdown
│   │   └── Authentication buttons
│   ├── Footer.tsx
│   ├── SmoothScrollProvider.tsx
│   ├── Providers.tsx (Redux + React Query)
│   ├── ProtectedRoute.tsx
│   └── dashboard/
│       ├── Sidebar.tsx
│       ├── Projects.tsx
│       ├── ApiKey.tsx
│       └── Components/
│           ├── AddNew/
│           └── Edit/
├── Page/               # Page sections
│   ├── Hero/
│   │   ├── HeroSection.tsx
│   │   ├── components/
│   │   │   ├── HeroBackground.tsx
│   │   │   ├── HeroTitle.tsx
│   │   │   ├── HeroSubtitle.tsx
│   │   │   ├── HeroVisual.tsx
│   │   │   ├── HeroCTA.tsx
│   │   │   ├── HeroBadge.tsx
│   │   │   ├── HeroScrollHint.tsx
│   │   │   └── HeroParticles.tsx
│   │   └── lib/
│   │       ├── variants.ts
│   │       └── heroAnimations.ts
│   ├── ProblemSolution/
│   └── SocialProofPricing/
└── lib/
    ├── animations.tsx  # Reusable animation components
    ├── store.ts        # Redux store configuration
    ├── authSlice.ts    # Authentication state
    └── hooks.ts        # Custom React hooks
```

### 2.3 Routing Structure

```typescript
// App Router (app/)
app/
├── layout.tsx              // Root layout (Navbar + Footer)
├── page.tsx                // Homepage (/)
├── login/
│   ├── page.tsx           // Login page (/login)
│   └── components/
│       ├── AuthForm.tsx   // Login/Register form
│       └── OtpForm.tsx    // OTP verification
├── dashboard/
│   ├── page.tsx           // Dashboard home (/dashboard)
│   └── [dynamic routes]   // Project management
└── docs/
    └── page.tsx           // Documentation (/docs)
```

### 2.4 State Management Flow

```typescript
// Redux Store Structure
{
  auth: {
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    otpRequired: boolean,
    pendingEmail: string | null,
    error: string | null
  },
  projects: {
    list: Project[],
    currentProject: Project | null,
    isLoading: boolean,
    error: string | null
  },
  toast: {
    notifications: Notification[]
  }
}

// State Flow
User Action → Dispatch Redux Action → API Call (Axios/React Query)
    ↓
API Response → Update Redux State → UI Re-render
    ↓
localStorage sync (auth tokens)
```

### 2.5 Animation Architecture

```typescript
// Animation System Layers

1. Smooth Scroll (Lenis)
   - Global smooth scrolling
   - Integrated with GSAP ScrollTrigger
   - RAF loop for performance

2. Scroll Animations (GSAP + ScrollTrigger)
   - Section reveals
   - Parallax effects
   - Pinned sections
   - Progress-based animations

3. Component Animations (Framer Motion)
   - Mount/unmount transitions
   - Hover states
   - Gesture interactions
   - Layout animations

4. Micro-interactions (CSS + Framer)
   - Button hovers
   - Card tilts
   - Icon animations
   - Loading states
```

---

## 3. Backend Architecture

### 3.1 Express.js Structure

```typescript
backend/
├── src/
│   ├── config/
│   │   ├── database.ts      // Prisma configuration
│   │   ├── redis.ts         // Redis client
│   │   ├── email.ts         // Nodemailer setup
│   │   └── cloudinary.ts    // Media storage
│   ├── middleware/
│   │   ├── auth.ts          // JWT verification
│   │   ├── errorHandler.ts  // Global error handling
│   │   ├── rateLimiter.ts   // Rate limiting (Redis)
│   │   └── validation.ts    // Request validation
│   ├── routes/
│   │   ├── auth.routes.ts   // Authentication routes
│   │   ├── project.routes.ts// Project CRUD
│   │   ├── upload.routes.ts // Media upload
│   │   └── user.routes.ts   // User profile
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── project.controller.ts
│   │   └── upload.controller.ts
│   ├── services/
│   │   ├── auth.service.ts  // Business logic
│   │   ├── email.service.ts // Email sending
│   │   ├── otp.service.ts   // OTP generation
│   │   └── upload.service.ts// Media handling
│   ├── utils/
│   │   ├── jwt.ts           // Token utilities
│   │   ├── bcrypt.ts        // Password hashing
│   │   └── validators.ts    // Input validation
│   └── server.ts            // Express app entry
└── prisma/
    ├── schema.prisma        // Database schema
    └── migrations/          // DB migrations
```

### 3.2 API Layer Design

```typescript
// Request Flow
Client Request → Express Middleware Chain → Controller → Service → Database
    ↓
    ├── CORS Middleware
    ├── Body Parser
    ├── Rate Limiter (Redis)
    ├── Authentication (JWT)
    ├── Authorization (Role check)
    ├── Input Validation (Zod)
    └── Route Handler
         ↓
    Business Logic → Database Query (Prisma) → Response
```

### 3.3 Service Layer Pattern

```typescript
// Example: Authentication Service
class AuthService {
  async register(data: RegisterDTO) {
    // 1. Validate input
    // 2. Check user exists
    // 3. Hash password
    // 4. Generate OTP
    // 5. Store in Redis (pending registration)
    // 6. Send email
    // 7. Return verification token
  }

  async verifyOTP(token: string, otp: string) {
    // 1. Verify token
    // 2. Check OTP in Redis
    // 3. Validate attempts
    // 4. Create user in PostgreSQL
    // 5. Delete Redis data
    // 6. Generate JWT
    // 7. Return auth token
  }

  async login(email: string, password: string) {
    // 1. Find user
    // 2. Verify password
    // 3. Generate JWT
    // 4. Return token + user data
  }
}
```

---

## 4. Database Schema

### 4.1 PostgreSQL Schema (Prisma)

```prisma
// prisma/schema.prisma

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  name          String?
  password      String
  role          Role      @default(USER)
  isVerified    Boolean   @default(false)
  googleId      String?   @unique
  avatar        String?
  projects      Project[]
  apiKey        String?   @unique
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([email])
  @@index([apiKey])
}

enum Role {
  USER
  ADMIN
}

model Project {
  id            String    @id @default(uuid())
  title         String
  slug          String    @unique
  description   String?   @db.Text
  images        String[]
  techStack     String[]
  achievements  String[]
  customFields  Json?
  featured      Boolean   @default(false)
  published     Boolean   @default(true)
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([userId])
  @@index([slug])
  @@index([featured])
}

model Session {
  id        String   @id @default(uuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([token])
}
```

### 4.2 Redis Schema

```typescript
// Redis Key Patterns

// OTP Management
pending:{registrationId}      // Hash: { email, name, password, createdAt }
otp:{registrationId}          // String: "123456"
otp:attempts:{registrationId} // Number: attempt count
otp:cooldown:{registrationId} // String: timestamp
otp:resend:limit:{registrationId} // Number: resend count
otp:resend:lock:{registrationId}  // String: "locked"

// Session Cache
session:{userId}              // Hash: user session data

// Rate Limiting
ratelimit:api:{ip}:{endpoint} // String: request count
ratelimit:login:{email}       // String: login attempts

// Cache
cache:projects:{userId}       // String: JSON array
cache:user:{userId}           // Hash: user profile
```

---

## 5. Authentication & Authorization

### 5.1 JWT Token Structure

```typescript
// Access Token Payload
{
  userId: string;      // User ID
  email: string;       // User email
  role: "USER" | "ADMIN";
  iat: number;         // Issued at
  exp: number;         // Expires at (7 days)
}

// OTP Verification Token Payload
{
  id: string;          // Registration ID (not user ID)
  type: "otp_verification";
  iat: number;
  exp: number;         // Expires at (10 minutes)
}
```

### 5.2 Authentication Flow

```
┌─────────────┐
│   Register  │
└──────┬──────┘
       │
       ├─> Validate Input (Zod)
       ├─> Check Email Exists
       ├─> Hash Password (Bcrypt, 10 rounds)
       ├─> Generate Registration ID (UUID)
       ├─> Generate 6-digit OTP
       ├─> Store in Redis (10 min TTL)
       │   ├─> pending:{id} → { email, name, hashedPassword }
       │   └─> otp:{id} → "123456"
       ├─> Send OTP Email (Nodemailer)
       └─> Return otp_verification JWT (10 min expiry)
              │
              ▼
       ┌─────────────┐
       │  Verify OTP │
       └──────┬──────┘
              │
              ├─> Verify otp_verification Token
              ├─> Check OTP in Redis
              ├─> Validate Attempts (max 3)
              ├─> Create User in PostgreSQL
              ├─> Delete Redis Keys
              ├─> Generate Access Token JWT (7 days)
              ├─> Set HttpOnly Cookie
              └─> Return { user, token }
```

### 5.3 Authorization Levels

```typescript
// Middleware Check
function requireAuth(req, res, next) {
  // 1. Extract token from cookie/header
  // 2. Verify JWT signature
  // 3. Check expiration
  // 4. Attach user to request
  // 5. Continue to route handler
}

function requireAdmin(req, res, next) {
  // 1. requireAuth()
  // 2. Check user.role === "ADMIN"
  // 3. Continue or return 403
}

// Route Protection
router.get('/projects', requireAuth, getProjects);
router.delete('/user/:id', requireAdmin, deleteUser);
```

---

## 6. API Design

### 6.1 RESTful Endpoints

```typescript
// Authentication API
POST   /api/v1/auth/register       // Register new user
POST   /api/v1/auth/verify-otp     // Verify OTP
POST   /api/v1/auth/resend-otp     // Resend OTP
POST   /api/v1/auth/login          // Login
POST   /api/v1/auth/logout         // Logout
GET    /api/v1/auth/me             // Get current user
POST   /api/v1/auth/google         // Google OAuth

// Projects API (Protected)
GET    /api/v1/projects            // List user projects
GET    /api/v1/projects/:id        // Get single project
POST   /api/v1/projects            // Create project
PUT    /api/v1/projects/:id        // Update project
DELETE /api/v1/projects/:id        // Delete project
PATCH  /api/v1/projects/:id/feature // Toggle featured

// Public API (No Auth)
GET    /api/v1/public/projects/:userId     // Public project list
GET    /api/v1/public/project/:slug        // Public single project
GET    /api/v1/public/user/:userId         // Public profile

// Upload API (Protected)
POST   /api/v1/upload/image        // Upload image
POST   /api/v1/upload/video        // Upload video
DELETE /api/v1/upload/:publicId    // Delete media

// User API (Protected)
GET    /api/v1/user/profile        // Get profile
PUT    /api/v1/user/profile        // Update profile
GET    /api/v1/user/api-key        // Get API key
POST   /api/v1/user/api-key/regenerate // Regenerate API key
```

### 6.2 Request/Response Format

```typescript
// Standard Response Format
{
  success: boolean;
  message: string;
  data?: any;
  error?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

// Error Response
{
  success: false;
  message: "Validation error";
  error: "Invalid email format";
  errors?: [
    { field: "email", message: "Invalid format" }
  ];
}

// Success Response
{
  success: true;
  message: "Project created successfully";
  data: {
    id: "uuid",
    title: "My Project",
    ...
  };
}
```

---

## 7. State Management

### 7.1 Redux Store Configuration

```typescript
// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import projectReducer from './projectSlice';
import toastReducer from './toastSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      projects: projectReducer,
      toast: toastReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
```

### 7.2 Auth Slice

```typescript
// authSlice.ts
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  otpRequired: boolean;
  pendingEmail: string | null;
  error: string | null;
}

// Actions
- fetchMe()           // Get current user from /auth/me
- loginUser()         // Login with email/password
- registerUser()      // Register new user
- verifyOTP()         // Verify OTP code
- resendOTP()         // Resend OTP
- logoutUser()        // Logout and clear state
- clearError()        // Clear error message
```

---

## 8. Animation System

### 8.1 Smooth Scroll Integration

```typescript
// SmoothScrollProvider.tsx
useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
  });

  // Sync with GSAP ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);
  
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  return () => {
    lenis.destroy();
    gsap.ticker.remove(() => lenis.raf);
  };
}, []);
```

### 8.2 GSAP Scroll Animations

```typescript
// Character reveal animation
gsap.from(chars, {
  y: "110%",
  rotateX: 20,
  opacity: 0,
  duration: 0.8,
  stagger: 0.03,
  ease: "expo.out",
  scrollTrigger: {
    trigger: container,
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});

// Parallax effect
gsap.to(element, {
  yPercent: 50,
  ease: "none",
  scrollTrigger: {
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});
```

---

## 9. Deployment Architecture

### 9.1 Vercel Deployment (Frontend)

```yaml
# vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],  # US East
  "functions": {
    "app/**": {
      "memory": 3008,
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 9.2 Render Deployment (Backend)

```yaml
# render.yaml
services:
  - type: web
    name: projectapi-backend
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: projectapi-db
          property: connectionString
      - key: REDIS_URL
        fromDatabase:
          name: projectapi-redis
          property: connectionString
    healthCheckPath: /health
    numInstances: 1
    
databases:
  - name: projectapi-db
    databaseName: projectapi
    plan: starter
    
  - name: projectapi-redis
    plan: starter
```

---

## 10. Performance Optimization

### 10.1 Frontend Optimizations

```typescript
// 1. Code Splitting
const Dashboard = dynamic(() => import('./Dashboard'), {
  loading: () => <Skeleton />,
  ssr: false
});

// 2. Image Optimization
<Image
  src="/hero.png"
  width={1200}
  height={630}
  alt="Hero"
  priority
  quality={85}
/>

// 3. Font Optimization
const unbounded = Unbounded({
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

// 4. React Query Caching
const { data } = useQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  staleTime: 5 * 60 * 1000,  // 5 minutes
  cacheTime: 10 * 60 * 1000  // 10 minutes
});
```

### 10.2 Backend Optimizations

```typescript
// 1. Database Connection Pooling
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  connectionLimit = 10
}

// 2. Redis Caching
async function getCachedProjects(userId: string) {
  const cached = await redis.get(`projects:${userId}`);
  if (cached) return JSON.parse(cached);
  
  const projects = await prisma.project.findMany({
    where: { userId }
  });
  
  await redis.setex(`projects:${userId}`, 300, JSON.stringify(projects));
  return projects;
}

// 3. Database Indexing
@@index([userId])
@@index([slug])
@@index([featured])

// 4. Query Optimization
const projects = await prisma.project.findMany({
  where: { userId },
  select: {
    id: true,
    title: true,
    slug: true,
    // Only select needed fields
  },
  orderBy: { createdAt: 'desc' },
  take: 20  // Pagination
});
```

---

## 11. Security Architecture

### 11.1 Security Layers

```
┌─────────────────────────────────────────────┐
│  Layer 1: Network Security                  │
│  - HTTPS (TLS 1.3)                         │
│  - Vercel DDoS Protection                   │
│  - CORS Configuration                       │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Layer 2: Application Security              │
│  - Rate Limiting (Redis)                    │
│  - Input Validation (Zod)                   │
│  - SQL Injection Protection (Prisma)        │
│  - XSS Protection (React escaping)          │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Layer 3: Authentication & Authorization    │
│  - JWT (HS256)                              │
│  - HttpOnly Cookies                         │
│  - Password Hashing (Bcrypt, 10 rounds)    │
│  - OTP Verification (6-digit, 10 min TTL)  │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Layer 4: Data Security                     │
│  - Environment Variables                    │
│  - Secrets Management (Vercel/Render)      │
│  - Database Encryption at Rest              │
│  - API Key Generation (Crypto)              │
└─────────────────────────────────────────────┘
```

### 11.2 Security Best Practices

```typescript
// 1. Environment Variables (Never commit)
.env.local
.env

// 2. Secure Headers
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000"
}

// 3. CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// 4. Rate Limiting
const rateLimiter = new RateLimiter({
  points: 10,      // 10 requests
  duration: 60,    // per 60 seconds
  blockDuration: 60 // block for 60 seconds
});

// 5. Input Sanitization
const sanitize = (input: string) => {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '');
};
```

---

## 12. Monitoring & Observability

### 12.1 Monitoring Stack

```typescript
// 1. Sentry (Error Tracking)
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ]
});

// 2. Vercel Analytics
import { Analytics } from '@vercel/analytics/react';
<Analytics />

// 3. Custom Logging
const logger = {
  error: (message, meta) => {
    console.error(message, meta);
    Sentry.captureException(new Error(message), { extra: meta });
  },
  info: (message, meta) => {
    console.log(message, meta);
  }
};

// 4. Performance Monitoring
export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    analytics.track('Web Vital', {
      name: metric.name,
      value: metric.value
    });
  }
}
```

### 12.2 Health Checks

```typescript
// Backend Health Check Endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database
    await prisma.$queryRaw`SELECT 1`;
    
    // Check Redis
    await redis.ping();
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'connected',
      redis: 'connected'
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});
```

---

## Appendix A: Technology Decision Rationale

### Why Next.js 16?
- App Router for improved performance
- Server Components for reduced bundle size
- Built-in optimization (images, fonts)
- Vercel deployment integration

### Why Redux Toolkit + React Query?
- Redux: Global auth state persistence
- React Query: Server state caching/syncing
- Complementary, not redundant

### Why GSAP + Framer Motion?
- GSAP: Scroll-based, timeline animations
- Framer Motion: Component-level, gesture animations
- Both needed for comprehensive animation system

### Why PostgreSQL + Redis?
- PostgreSQL: Relational data, ACID compliance
- Redis: Fast cache, session storage, rate limiting
- Different use cases, not duplicates

---

## Appendix B: Common Pitfalls & Solutions

### Issue: CORS Errors
**Solution:** Ensure backend CORS origin matches frontend URL exactly, including protocol.

### Issue: JWT Token Expiry
**Solution:** Implement refresh token mechanism or prompt re-login.

### Issue: OTP Not Received
**Solution:** Check SMTP settings, email spam folder, Redis TTL.

### Issue: Hydration Mismatch
**Solution:** Use `suppressHydrationWarning` on dynamic content, ensure SSR/client render match.

### Issue: Animation Performance
**Solution:** Use `will-change`, `transform` instead of `top/left`, debounce scroll events.

---

**Document Maintenance:** This document should be updated whenever architectural changes are made.

**Next Review Date:** December 17, 2026
