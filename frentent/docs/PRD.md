# Product Requirements Document (PRD)

## ProjectAPI - Developer Portfolio CMS Platform

**Version:** 1.0  
**Date:** November 17, 2026  
**Status:** Active Development  
**Product Owner:** FIROZ KHAN  
**Document Type:** PRD (Product Requirements Document)

---

## 1. Executive Summary

### 1.1 Product Overview

ProjectAPI is a headless CMS platform that solves the portfolio management problem for developers. It enables developers to manage their project data in a single dashboard and expose it via REST API to multiple portfolio websites, eliminating the need for manual updates across different platforms.

### 1.2 Problem Statement

**Current Pain Points:**
- Developers maintain multiple portfolio sites (personal site, GitHub profile, LinkedIn, etc.)
- Each platform requires manual updates when project information changes
- No centralized source of truth for project data
- Time-consuming to keep all portfolios synchronized
- Difficulty showcasing work consistently across platforms

**Market Need:**
- 73% of developers maintain at least 2 portfolio websites
- Average time spent updating portfolios: 2-3 hours per month
- 45% report inconsistent project information across platforms
- Growing demand for API-first content management

### 1.3 Solution

ProjectAPI provides:
1. **Centralized Dashboard**: Single interface to manage all projects
2. **REST API**: Auto-generated endpoints for each user
3. **Real-time Sync**: Changes propagate instantly to connected sites
4. **Framework Agnostic**: Works with React, Vue, Next.js, Angular, and more
5. **Developer-Friendly**: Built by developers, for developers

### 1.4 Success Metrics

**Launch Goals (Month 1):**
- 100 registered users
- 50 active daily users
- 500 API requests per day
- < 200ms average API response time
- 95% uptime

**Growth Goals (Month 6):**
- 1,000 registered users
- 300 active daily users
- 10,000 API requests per day
- < 150ms average API response time
- 99.5% uptime

---

## 2. Target Audience

### 2.1 Primary Users

**1. Student Developers**
- **Demographics**: 18-25 years old, college/bootcamp students
- **Goals**: Build portfolio for internships and first job
- **Pain Points**: Limited time, need to showcase class projects
- **Usage Pattern**: Weekly updates during semester, daily during job search

**2. Freelance Developers**
- **Demographics**: 25-40 years old, self-employed or contractors
- **Goals**: Showcase work to attract clients
- **Pain Points**: Multiple client portfolios to maintain
- **Usage Pattern**: Updates after each project completion

**3. Open Source Contributors**
- **Demographics**: 20-45 years old, active GitHub users
- **Goals**: Document contributions, increase visibility
- **Pain Points**: Many projects across different platforms
- **Usage Pattern**: Frequent updates, many small projects

### 2.2 Secondary Users

**4. Development Agencies**
- **Use Case**: Manage portfolios for multiple developers
- **Needs**: Team collaboration, bulk operations
- **Scale**: 5-50 projects per developer, 10-100 developers

**5. Technical Recruiters**
- **Use Case**: Review candidate portfolios via API
- **Needs**: Standardized data format, easy integration
- **Scale**: Review 20-50 portfolios per week

---

## 3. Core Features & Requirements

### 3.1 Must-Have Features (MVP)

#### Feature 1: User Authentication
**Description:** Secure user registration and login system

**User Stories:**
- As a developer, I want to register with email/password so that I can create an account
- As a user, I want to log in with Google so that I can skip password creation
- As a user, I want to verify my email via OTP so that my account is secure

**Acceptance Criteria:**
- [ ] User can register with email and password
- [ ] Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number
- [ ] Email verification via 6-digit OTP (10-minute expiry)
- [ ] Google OAuth integration
- [ ] JWT token with 7-day expiry
- [ ] HttpOnly cookies in production
- [ ] Rate limiting on login attempts (5 per minute)
- [ ] Password reset functionality

**Technical Requirements:**
- Bcrypt password hashing (10 rounds)
- JWT (HS256 algorithm)
- Redis for OTP storage (10-minute TTL)
- Email delivery via Nodemailer
- CORS configured for cross-origin requests

**Priority:** P0 (Critical)  
**Effort:** 5 days  
**Status:** ✅ Complete

---

#### Feature 2: Project Management
**Description:** CRUD operations for developer projects

**User Stories:**
- As a developer, I want to create a new project so that I can showcase my work
- As a user, I want to edit project details so that I can keep information up-to-date
- As a user, I want to delete projects so that I can remove outdated work
- As a user, I want to duplicate projects so that I can reuse similar structures

**Acceptance Criteria:**
- [ ] Create project with title, slug, description, tech stack, images
- [ ] Edit all project fields
- [ ] Soft delete projects (archived state)
- [ ] Duplicate existing projects
- [ ] Mark projects as "featured"
- [ ] Add custom fields (JSON)
- [ ] Upload up to 10 images per project
- [ ] Search projects by title/description
- [ ] Filter by tech stack or featured status
- [ ] Sort by date, title, or featured

**Data Model:**
```typescript
interface Project {
  id: string;
  title: string;
  slug: string;  // URL-friendly, unique
  description: string;
  images: string[];  // URLs
  techStack: string[];  // ["React", "Node.js"]
  achievements: string[];
  customFields: Record<string, any>;
  featured: boolean;
  published: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Technical Requirements:**
- Prisma ORM for database operations
- Slug auto-generation from title
- Image upload to ImageKit/Cloudinary
- Real-time validation
- Optimistic UI updates

**Priority:** P0 (Critical)  
**Effort:** 8 days  
**Status:** ✅ Complete

---

#### Feature 3: REST API Endpoint
**Description:** Auto-generated public API for each user

**User Stories:**
- As a developer, I want a public API endpoint so that my portfolio sites can fetch data
- As a user, I want my API to be always available so that my sites don't break
- As a third-party developer, I want JSON responses so that I can easily parse data

**Acceptance Criteria:**
- [ ] Unique endpoint per user: `/api/v1/public/projects/:userId`
- [ ] JSON response format
- [ ] No authentication required for public endpoints
- [ ] CORS enabled for all origins
- [ ] Response includes all published projects
- [ ] Single project endpoint: `/api/v1/public/project/:slug`
- [ ] Rate limiting: 100 requests per minute per IP
- [ ] Response time < 200ms (p95)
- [ ] 99.5% uptime SLA

**API Response Format:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "E-Commerce Platform",
      "slug": "e-commerce-platform",
      "description": "Full-stack shopping application",
      "images": ["https://cdn.../image.jpg"],
      "techStack": ["React", "Node.js", "PostgreSQL"],
      "achievements": ["10k+ users", "99.9% uptime"],
      "customFields": {},
      "featured": true,
      "createdAt": "2026-01-15T10:30:00Z",
      "updatedAt": "2026-11-17T06:00:00Z"
    }
  ],
  "meta": {
    "total": 12,
    "featured": 3
  }
}
```

**Technical Requirements:**
- Express.js route handlers
- PostgreSQL with Prisma
- Redis caching (5-minute TTL)
- CDN caching headers
- Pagination support

**Priority:** P0 (Critical)  
**Effort:** 4 days  
**Status:** ✅ Complete

---

#### Feature 4: Dashboard Interface
**Description:** Web-based dashboard for managing projects

**User Stories:**
- As a user, I want a clean dashboard so that I can easily manage my projects
- As a user, I want to see all my projects at a glance so that I can quickly find what I need
- As a user, I want visual feedback so that I know my actions were successful

**Acceptance Criteria:**
- [ ] Sidebar navigation
- [ ] Project list view with thumbnails
- [ ] Grid and list layout options
- [ ] Quick actions (edit, delete, duplicate, feature)
- [ ] Real-time search
- [ ] Drag-and-drop image upload
- [ ] Toast notifications for actions
- [ ] Responsive mobile layout
- [ ] Loading states for all async operations
- [ ] Empty states with helpful messaging

**UI Components:**
- Navbar with user profile dropdown
- Sidebar with navigation links
- Project cards with thumbnail and metadata
- Modal forms for create/edit
- Confirmation dialogs for destructive actions
- Skeleton loaders

**Priority:** P0 (Critical)  
**Effort:** 10 days  
**Status:** ✅ Complete

---

#### Feature 5: Media Upload & Storage
**Description:** Upload and manage project images/videos

**User Stories:**
- As a developer, I want to upload project screenshots so that I can showcase my work visually
- As a user, I want my images to load fast so that my portfolio performs well
- As a user, I want to delete old images so that I can manage storage

**Acceptance Criteria:**
- [ ] Drag-and-drop file upload
- [ ] Support: JPG, PNG, GIF, WebP, MP4
- [ ] Max file size: 10MB per file
- [ ] Automatic image optimization (WebP conversion, compression)
- [ ] CDN delivery via ImageKit/Cloudinary
- [ ] Thumbnail generation
- [ ] Upload progress indicator
- [ ] Delete uploaded files
- [ ] Copy CDN URL to clipboard

**Technical Requirements:**
- Multipart form-data upload
- ImageKit/Cloudinary SDK integration
- S3 or similar storage (backup)
- Transformation on-the-fly (resize, format)
- Lazy loading images in dashboard

**Priority:** P0 (Critical)  
**Effort:** 6 days  
**Status:** ✅ Complete

---

### 3.2 Should-Have Features (Post-MVP)

#### Feature 6: API Playground
**Description:** Interactive API testing interface

**User Stories:**
- As a developer, I want to test my API without leaving the dashboard
- As a user, I want to see example code so that I can integrate quickly

**Acceptance Criteria:**
- [ ] Live request builder (method, headers, params)
- [ ] Response viewer with syntax highlighting
- [ ] Code snippet generator (Fetch, Axios, React hook, Next.js)
- [ ] Copy-to-clipboard functionality
- [ ] Request history (last 10 requests)
- [ ] Example requests (get all, get by slug, filter)

**Priority:** P1 (High)  
**Effort:** 5 days  
**Status:** ✅ Complete

---

#### Feature 7: API Key Management
**Description:** Generate and manage API keys for authenticated endpoints

**User Stories:**
- As a developer, I want an API key so that I can make authenticated requests
- As a user, I want to regenerate my key so that I can revoke access if compromised

**Acceptance Criteria:**
- [ ] Generate unique API key on account creation
- [ ] View current API key (partially masked)
- [ ] Regenerate API key (invalidates old key)
- [ ] Copy key to clipboard
- [ ] Use key in Authorization header: `Bearer <key>`

**Priority:** P1 (High)  
**Effort:** 3 days  
**Status:** 🚧 In Progress

---

#### Feature 8: Framework-Specific SDKs
**Description:** Pre-built integration libraries

**User Stories:**
- As a React developer, I want a React hook so that I can fetch data easily
- As a Next.js developer, I want SSR-compatible functions
- As a Vue developer, I want a composable

**Acceptance Criteria:**
- [ ] React: `useProjectAPI(userId)` hook
- [ ] Next.js: `getProjectData()` server function
- [ ] Vue: `useProjectsAPI()` composable
- [ ] npm packages published
- [ ] TypeScript types included
- [ ] Documentation with examples

**Priority:** P1 (High)  
**Effort:** 8 days  
**Status:** 📋 Planned

---

### 3.3 Nice-to-Have Features (Future)

#### Feature 9: Webhooks
**Description:** Real-time notifications when data changes

**Priority:** P2 (Medium)  
**Effort:** 6 days  
**Status:** 📋 Planned

#### Feature 10: GraphQL API
**Description:** Alternative API with GraphQL queries

**Priority:** P2 (Medium)  
**Effort:** 10 days  
**Status:** 📋 Planned

#### Feature 11: Team Collaboration
**Description:** Share projects with team members

**Priority:** P2 (Medium)  
**Effort:** 12 days  
**Status:** 📋 Planned

#### Feature 12: Custom Domains
**Description:** Use custom domain for API endpoint

**Priority:** P3 (Low)  
**Effort:** 8 days  
**Status:** 📋 Planned

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Metric | Requirement | Current |
|--------|-------------|---------|
| API Response Time (p95) | < 200ms | ~150ms ✅ |
| Dashboard Load Time | < 2s | ~1.5s ✅ |
| Image Upload Speed | < 5s for 5MB | ~3s ✅ |
| Time to Interactive | < 3s | ~2.8s ✅ |
| Lighthouse Score | > 90 | 92 ✅ |

### 4.2 Scalability

| Resource | Target | Strategy |
|----------|--------|----------|
| Concurrent Users | 1,000 | Horizontal scaling on Vercel |
| API Requests/sec | 500 | Redis caching, CDN |
| Database Connections | 100 | Connection pooling (Prisma) |
| Storage | 100GB | CDN offloading (ImageKit) |

### 4.3 Reliability

| Metric | Requirement |
|--------|-------------|
| Uptime SLA | 99.5% |
| Recovery Time Objective (RTO) | < 1 hour |
| Recovery Point Objective (RPO) | < 15 minutes |
| Backup Frequency | Daily (automated) |
| Monitoring | Sentry + Vercel Analytics |

### 4.4 Security

| Requirement | Implementation |
|-------------|----------------|
| Authentication | JWT (HS256), HttpOnly cookies |
| Password Storage | Bcrypt (10 rounds) |
| Data Encryption | TLS 1.3, PostgreSQL encryption at rest |
| Rate Limiting | Redis-based (100 req/min per IP) |
| OWASP Top 10 | SQL Injection (Prisma), XSS (React escaping), CSRF (SameSite cookies) |
| Vulnerability Scanning | Snyk (npm audit) |

### 4.5 Accessibility

| Standard | Requirement |
|----------|-------------|
| WCAG Compliance | Level AA |
| Keyboard Navigation | Full support |
| Screen Reader | ARIA labels, semantic HTML |
| Color Contrast | 4.5:1 minimum |
| Focus Indicators | Visible on all interactive elements |

### 4.6 Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |
| Mobile Safari | iOS 14+ |
| Chrome Mobile | Android 10+ |

---

## 5. User Experience (UX) Requirements

### 5.1 Onboarding Flow

**Goal:** Get users from registration to first API call in < 5 minutes

**Steps:**
1. **Registration** (30 seconds)
   - Email + password
   - OTP verification
   
2. **Dashboard Tour** (1 minute)
   - Highlight key features
   - Skip option available
   
3. **Create First Project** (2 minutes)
   - Pre-filled sample project
   - "Use sample" or "Create new" options
   
4. **API Endpoint Reveal** (30 seconds)
   - Show personalized endpoint
   - Copy button prominent
   
5. **Integration Guide** (1 minute)
   - Framework selection
   - Code snippet
   - "Test in Playground" CTA

**Success Metric:** 70% of registered users create at least one project within first session

### 5.2 Dashboard UX Principles

**1. Speed First**
- Optimistic UI updates
- Instant search feedback
- Skeleton loaders (no blank states)

**2. Visual Hierarchy**
- Featured projects at top
- Recently updated next
- Clear action buttons

**3. Minimal Friction**
- Auto-save draft (not implemented yet)
- Inline editing where possible
- Quick actions on hover

**4. Helpful Feedback**
- Success toasts (3s duration)
- Error messages with solutions
- Loading states for all async actions

### 5.3 Error Handling

**User-Facing Error Messages:**

| Technical Error | User Message | Action |
|-----------------|--------------|--------|
| 401 Unauthorized | "Your session expired. Please log in again." | Show login modal |
| 403 Forbidden | "You don't have permission to do that." | Show upgrade CTA |
| 404 Not Found | "We couldn't find that project." | Return to dashboard |
| 413 Payload Too Large | "File is too large. Max 10MB." | Show size in error |
| 429 Too Many Requests | "Slow down! Try again in 60 seconds." | Show countdown |
| 500 Server Error | "Something went wrong on our end. We're looking into it." | Retry button |

---

## 6. Technical Constraints

### 6.1 Technology Choices (Fixed)

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Frontend Framework | Next.js 16 | App Router, SSR/SSG, Vercel integration |
| UI Library | React 19 | Latest features, concurrent rendering |
| Language | TypeScript | Type safety, better DX |
| Styling | Tailwind CSS 4 | Utility-first, fast development |
| Backend Framework | Express.js | Mature, flexible, large ecosystem |
| Database | PostgreSQL | ACID compliance, relational data |
| ORM | Prisma | Type-safe, migrations, great DX |
| Cache | Redis | Fast, TTL support, pub/sub |
| Deployment | Vercel (FE) + Render (BE) | Automatic deploys, scaling |

### 6.2 Third-Party Dependencies

**Required:**
- ImageKit or Cloudinary (media storage)
- Nodemailer + SMTP (email delivery)
- Sentry (error tracking)
- Vercel Analytics (usage tracking)

**Optional:**
- Google OAuth (sign-in)
- GitHub OAuth (future)

### 6.3 Compliance Requirements

| Regulation | Status | Notes |
|------------|--------|-------|
| GDPR | ✅ Required | EU user data protection |
| CCPA | ✅ Required | California user privacy |
| SOC 2 | ⏳ Future | Enterprise customers |
| HIPAA | ❌ Not Required | No health data |

**GDPR Compliance Checklist:**
- [ ] Privacy policy page
- [ ] Data export functionality
- [ ] Account deletion (right to be forgotten)
- [ ] Cookie consent banner
- [ ] Data processing agreement
- [ ] EU data residency (future)

---

## 7. Release Plan

### 7.1 Phase 1: MVP Launch (Completed)

**Date:** October 2026  
**Status:** ✅ Complete

**Features:**
- User authentication (email + Google)
- Project CRUD operations
- Public REST API
- Dashboard interface
- Media upload system

**Launch Metrics:**
- 100 registered users (target)
- 50 active projects created
- 99.5% uptime

### 7.2 Phase 2: Enhanced Features (Current)

**Date:** November 2026  
**Status:** 🚧 In Progress

**Features:**
- API Playground ✅
- API Key Management 🚧
- Landing page redesign 🚧
- Advanced filtering
- Webhook system 📋

**Success Metrics:**
- 500 registered users
- 1,000 API requests/day
- < 150ms API response time

### 7.3 Phase 3: Growth & Scale (Q1 2027)

**Planned Features:**
- Framework-specific SDKs
- GraphQL API
- Team collaboration
- Analytics dashboard
- Export/Import functionality

**Success Metrics:**
- 2,000 registered users
- 10,000 API requests/day
- 50 paying customers

---

## 8. Success Criteria

### 8.1 Launch Success (30 days post-launch)

**User Acquisition:**
- ✅ 100+ registered users
- ⏳ 70% email verification rate
- ⏳ 50% return rate (week 2)

**Engagement:**
- ⏳ 80% create at least 1 project
- ⏳ 40% create 3+ projects
- ⏳ 60% visit dashboard weekly

**Technical:**
- ✅ 99.5% uptime
- ✅ < 200ms API response time (p95)
- ✅ < 3s dashboard load time

**Qualitative:**
- ⏳ 10 user testimonials
- ⏳ 4.5+ star rating (if reviews collected)
- ⏳ < 5% churn rate

### 8.2 Long-Term Success (6 months)

**User Growth:**
- 1,000+ registered users
- 300+ daily active users
- 20% month-over-month growth

**Revenue (if applicable):**
- 50+ paid subscribers
- $2,000+ MRR
- < 30% churn rate

**Product Market Fit:**
- 40%+ would be "very disappointed" if product shut down
- 10+ unsolicited referrals
- 5+ blog posts/tweets mentioning product

---

## 9. Risks & Mitigation

### 9.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Database outage | High | Low | Daily backups, replica in standby |
| API rate limiting abuse | Medium | Medium | Redis-based rate limiter, IP blocking |
| Image storage costs | Medium | High | Compression, CDN caching, usage limits |
| Security breach | High | Low | Regular audits, Snyk scanning, bug bounty |

### 9.2 Product Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Low user adoption | High | Medium | Marketing, user interviews, iterate |
| Feature creep | Medium | High | Strict PRD adherence, prioritization |
| Competitor launch | Medium | Medium | Unique positioning, community focus |
| Poor UX leading to churn | High | Medium | User testing, analytics, feedback loops |

### 9.3 Business Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Hosting costs exceed budget | High | Medium | Usage monitoring, tiered pricing |
| Support burden | Medium | High | Documentation, FAQ, community forum |
| GDPR non-compliance | High | Low | Legal review, privacy officer |

---

## 10. Open Questions

### 10.1 Product Questions

1. **Should we support private projects?**
   - Impact: Requires access control in API
   - Decision: Q1 2027 (post-MVP)

2. **Should we allow project versioning?**
   - Impact: Database schema changes, API complexity
   - Decision: User research needed

3. **Should we offer a free tier forever?**
   - Impact: Revenue model, costs
   - Decision: Yes, with limits (10 projects, 1GB storage)

### 10.2 Technical Questions

1. **Should we migrate to GraphQL?**
   - Impact: Breaking change for existing users
   - Decision: Offer both REST and GraphQL

2. **Should we support real-time updates via WebSocket?**
   - Impact: Infrastructure complexity, costs
   - Decision: Webhooks first, WebSocket later

3. **Should we build mobile apps (iOS/Android)?**
   - Impact: Development resources, maintenance
   - Decision: PWA first, native apps if demand exists

---

## 11. Appendix

### 11.1 Glossary

| Term | Definition |
|------|------------|
| **Headless CMS** | Content management system that provides content via API without a presentation layer |
| **JWT** | JSON Web Token, a compact token format for authentication |
| **OTP** | One-Time Password, temporary code for verification |
| **CDN** | Content Delivery Network, geographically distributed servers for fast content delivery |
| **CORS** | Cross-Origin Resource Sharing, mechanism to allow requests from different domains |
| **Slug** | URL-friendly version of a string (e.g., "My Project" → "my-project") |

### 11.2 Related Documents

- [Technical Architecture Document](./TECHNICAL_ARCHITECTURE.md)
- [Project Overview](./PROJECT_OVERVIEW.md)
- [API Documentation](./API_DOCUMENTATION.md) (to be created)
- [User Guide](./USER_GUIDE.md) (to be created)

### 11.3 Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-11-17 | Development Team | Initial PRD creation |

---

**Document Status:** Living Document  
**Next Review:** December 17, 2026  
**Maintained By:** Product Team

