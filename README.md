# ProjectAPI

A full-stack project management and API toolkit for developers and teams. Manage projects, credentials, and API endpoints from one premium dark-themed dashboard — with a marketing site, docs pages, and an Express + Prisma API behind it.

## Repository layout

```
.
├── frentent/     # Next.js 16 frontend (App Router)
├── backend/      # Express 5 API (Prisma + PostgreSQL)
└── README.md
```

## Features

**Frontend (`frentent/`)**

- Landing page with animated hero, problem/solution, playground and FAQ sections
- Docs, About and Contact pages
- Auth (login / signup) with `authToken` cookie + route protection via `proxy.ts`
- Dashboard with:
  - Overview — live stats, animated counters, analytics and recent activity
  - Projects — search, filter, edit, delete, custom fields
  - Add / Edit / Delete project flows with validation
  - API Keys — reveal / copy / rate-limit cards
  - Api Data — request runner with JSON / table / grid response views
  - All Data — tables, project IDs and stats tabs
  - Support — tickets and FAQs
- GSAP scroll animations + framer-motion transitions on a shared glass design system
- Responsive, dark-only UI

**Backend (`backend/`)**

- Express 5 + TypeScript, Prisma 7 on PostgreSQL
- JWT auth with bcrypt, http-only cookie flow
- Zod validation, Helmet, CORS, rate limiting
- ImageKit uploads (project images)
- Redis integration
- Modules: `Auth`, `Project`, `Support`, `upload`

## Tech stack

| Layer     | Stack |
|-----------|-------|
| Frontend  | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, shadcn/ui |
| State     | Redux Toolkit, TanStack Query |
| Motion    | GSAP, framer-motion, lucide-react |
| Backend   | Express 5, Prisma 7, PostgreSQL, Redis, Zod |
| Auth      | JWT + bcrypt, cookie-based sessions |

## Getting started

### Prerequisites

- Node.js 20+
- PostgreSQL
- Redis

### 1. Backend

```bash
cd backend
npm install
cp .env .env.local        # then fill in the values (see table below)
npx prisma migrate dev    # create the database schema
npm run dev               # http://localhost:<PORT>
```

### 2. Frontend

```bash
cd frentent
npm install
# create .env.local with NEXT_PUBLIC_BACKEND_URL
npm run dev               # http://localhost:3000
```

## Environment variables

**`frentent/.env.local`**

| Key | Description |
|-----|-------------|
| `NEXT_PUBLIC_BACKEND_URL` | Base URL of the API (e.g. `http://localhost:5000`) |
| `NEXT_PUBLIC_ENV` | `development` / `production` |

**`backend/.env`**

| Key | Description |
|-----|-------------|
| `NODE_ENV`, `PORT` | Runtime mode and listen port |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Signing secret for access tokens |
| `REDIS_URL` | Redis connection string |
| `FRONTEND_URL` | Allowed origin for CORS |
| `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT` | Image uploads |

## Scripts

**Frontend (`frentent/`)**

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

**Backend (`backend/`)**

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon + tsx |
| `npm run build` | Compile TypeScript |
| `npm start` | Run the compiled server |

## Routing & auth

- Protected routes are gated by `frentent/proxy.ts` (Next 16 middleware successor). Unauthenticated visits to non-public paths redirect to `/login?auth=login&next=<path>`.
- Public paths: `/`, `/docs`, `/login`, `/contact`, `/about`.
- The session lives in the `authToken` cookie (mirrored to `localStorage` for the client).

## License

All rights reserved unless stated otherwise.
