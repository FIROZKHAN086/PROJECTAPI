# ProjectAPI — Agent Context & Product Brief

> Purpose: Give coding agents (Claude Code, Cursor, Codex, etc.) a reliable working brief for understanding and improving the ProjectAPI application.
>
> Source boundary: This document combines (1) facts visible on the public production website, (2) technical context previously shared by the project owner, and (3) explicitly marked items that still need inspection. Do not treat unverified assumptions as implementation facts.

## 1. Project identity

- **Product name:** ProjectAPI
- **Production URL:** https://projectapi-app.vercel.app/
- **Product category:** Developer portfolio project management platform / headless CMS with a public REST API.
- **Public positioning:** “One Dashboard. One API. Unlimited Portfolios Projects.”
- **Public brand line:** “built for builders”
- **Public value proposition:** Manage project data once and expose it through an API so connected portfolio websites can consume the same data without manually editing each site.
- **Public website footer:** “Crafted with vision — © 2026 ProjectAPI”
- **Public status copy:** “All systems cool.”

## 2. What the public website currently communicates

The public production homepage describes ProjectAPI as a headless CMS for developer portfolios. A developer manages projects in one dashboard; connected websites consume the project data as JSON and can update when the source data changes.

### Main hero content observed
- Heading: “One Dashboard. One API. Unlimited Portfolios Projects.”
- Supporting copy: “ProjectAPI is a headless CMS for developer portfolios. Manage every project once — every connected website updates instantly.”
- Primary CTA: “Start Building Free”
- Secondary CTA: “View API Docs”
- Hero visual includes a sample “E-Commerce Dashboard” project card, technology labels, a GET / 200 OK status treatment, and API stability/latency annotations.
- The homepage also mentions support for React, Vue, Next.js and five more frameworks.

### Public navigation observed
The website exposes these navigation groups/links:
- Product: Features, Pricing, Playground, Extensions
- Developers: Documentation, API Reference, Status, Changelog
- Company: About, Support, Privacy, Terms

Some links may require authentication or may be routed through the app. Verify actual destinations before changing navigation.

### Public homepage sections observed
1. Hero / product introduction
2. Framework compatibility strip
3. Features
4. Problem → Solution comparison
5. API Playground
6. Templates / workflow cards
7. Target audiences
8. Pricing
9. FAQ
10. Final CTA

### Publicly described features
1. **Project Manager:** Create, update, archive, duplicate, feature, search, filter and sort projects.
2. **Rich Project Fields:** Title, slug, description, images, stack, achievements and custom fields.
3. **Secure Media Storage:** Images, videos, GIFs and documents; public copy names ImageKit and Cloudinary.
4. **Public REST API:** Auto-generated endpoint that returns project data as JSON.
5. **API Playground:** Live request testing and copy-ready Fetch, Axios, React hook and Next.js snippets.
6. **Authentication & Access:** Email and Google sign-in with JWT-protected routes.

### Publicly described workflow/templates
- API Playground — request builder and live endpoint testing.
- Portfolio CMS — typed content model.
- Versioned Docs — documentation that evolves with the API.
- Realtime Console — request activity stream.
- Instant Deploy — playground-to-production workflow.
- Keys by Default — scoped API keys.
- Zero-setup, typed API and ship-ready positioning.

### Public target audiences
- Students
- Freelancers
- Open-source developers
- Agencies managing multiple developer portfolios

### Public FAQ topics
- Whether coding knowledge is required.
- Framework compatibility.
- Data and media security.
- Custom domains.
- Plan upgrades/downgrades.

Do not invent pricing amounts, usage limits, uptime values, or plan entitlements. Inspect the actual pricing page/data before documenting them.

## 3. Technical stack previously shared by the owner

The owner supplied the following frontend dependency versions. Treat this as the reported package context; verify the current `package.json` in the repository before installing, removing, or upgrading anything.

### Frontend
- Next.js `16.2.10`
- React / React DOM `19.2.4`
- TypeScript
- Tailwind CSS (existing project styling system; verify configuration/version)
- `@base-ui/react`
- `@shadcn/react`
- `shadcn`
- `@hugeicons/core-free-icons`
- `@hugeicons/react`
- `lucide-react`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `tw-animate-css`
- `cmdk`
- `input-otp`
- `react-day-picker`
- `embla-carousel-react`
- `react-resizable-panels`
- `next-themes`
- `sonner`

### State, data and networking
- `@reduxjs/toolkit`
- `react-redux`
- `@tanstack/react-query`
- `axios`
- `date-fns`

### Motion and visualization
- `gsap`
- `framer-motion`
- `lenis`
- `recharts`

### Monitoring / analytics
- `@sentry/nextjs`
- `@vercel/analytics`
- `@vercel/speed-insights`

### MCP tools reported by owner
1. **shadcn MCP** — discover/use real UI components.
2. **21st.dev MCP** — discover community UI patterns/components.
3. **Framelink Figma MCP** — translate an available Figma file/design into frontend code.

Use these MCP tools only if available in the current agent environment. Do not assume they are connected merely because the owner has configured them elsewhere. Do not waste time browsing component libraries when the existing codebase already has a suitable component.

## 4. Backend and infrastructure context previously shared

The owner has previously described this architecture in ProjectAPI-related development discussions. Confirm it against the current repository and deployment environment before making changes.

- Node.js + Express + TypeScript backend.
- PostgreSQL database.
- Prisma ORM.
- Redis for OTP/session/cache/rate-limit-related data.
- JWT authentication.
- Bcrypt password hashing.
- Nodemailer / SMTP email delivery.
- Firebase Authentication has been discussed for Google sign-in.
- ImageKit and Cloudinary have been discussed for media handling.
- Frontend deployment: Vercel.
- Backend deployment: Render was previously discussed.
- Docker / Docker Compose have been used during development.

Previously mentioned backend URL: `https://projectapi-ahh7.onrender.com/`. **Verify this is still current** before relying on it.

## 5. Authentication architecture discussed with the owner

The owner has been implementing an email OTP registration flow. The following is the intended architecture discussed in prior code reviews; inspect the current source code to determine what is actually implemented.

### Intended registration flow
1. Validate name, email and password.
2. Normalize email with `trim().toLowerCase()`.
3. Check whether the email already exists in PostgreSQL.
4. Hash password using bcrypt.
5. Generate a unique registration ID (`OneTimeID`).
6. Generate a six-digit OTP.
7. Store pending registration data and OTP in Redis with expiry.
8. Send OTP by email.
9. Set an `otp_verification` HttpOnly cookie containing a short-lived JWT with only the registration ID.
10. Do not create a database user or authenticated session until OTP succeeds.

### Intended Redis key conventions discussed
- `pending:{OneTimeID}` — pending registration details.
- `otp:{OneTimeID}` — current OTP.
- `otp:attempts:{OneTimeID}` — OTP verification attempts.
- `otp:cooldown:{OneTimeID}` — resend cooldown.
- `otp:resend:limit:{OneTimeID}` — resend count/window.
- `otp:resend:lock:{OneTimeID}` — concurrent resend lock.
- `user:profile:{userId}` — safe profile cache (optional).

These are conventions from the discussed implementation, not proof that every key exists in production.

### Intended OTP verification flow
1. OTP middleware verifies the `otp_verification` cookie.
2. JWT payload contains a registration ID (`id`), not the password/hash or personal registration fields.
3. Middleware checks `pending:{id}` in Redis.
4. Verify endpoint validates OTP format and compares against Redis.
5. Protect against brute force and concurrent verification.
6. Create verified user in PostgreSQL only after valid OTP.
7. Delete pending OTP data after success.
8. Issue the authenticated JWT cookie.
9. Send welcome email without turning an already-created account into a failed registration if the welcome email fails.

### Intended resend protections
- A cooldown between resends (60 seconds was discussed).
- A per-registration resend cap (5 per hour was discussed).
- IP-based rate limiting.
- Redis lock to prevent simultaneous duplicate sends.
- Only replace the stored OTP after email delivery succeeds, so a failed email does not invalidate the previously delivered OTP.
- Frontend should disable the resend button while a request is pending and display the server-provided retry delay.
- Backend protections remain authoritative; frontend disabling alone is not security.

### Intended authenticated session
- Auth JWT should use a consistent payload, preferably a minimal user identifier.
- Cookie lifetime and JWT expiry must match.
- `HttpOnly`, `Secure` in production, correct `SameSite`, `Path`, CORS origin and credentials settings must be checked together.
- `/auth/me` should verify the JWT and return a safe user projection without password hash.
- Logout cookie clearing must use matching cookie path/domain/sameSite/secure settings.
- Clearing a browser cookie alone does not revoke a copied stateless JWT. Real revocation requires a session ID / `jti` and server-side session or denylist validation.

**Important:** The code discussed in previous chats evolved over multiple iterations. Do not blindly copy older snippets into the repository. Inspect the latest source and resolve inconsistencies before implementation.

## 6. Known project-specific development context

The owner has previously discussed:
- Next.js App Router and TypeScript.
- Redux Toolkit auth state with fields such as `user`, `isLoading`, `isAuthenticated`, `otpRequired`, and `pendingEmail`.
- Auth actions such as `fetchMe`, `loginUser`, `registerUser`, and OTP verification/resend actions.
- Protected routes and `/auth/me`.
- Cookie-based authentication across a Vercel frontend and a separately deployed backend.
- CORS, cross-site cookie, login persistence and logout consistency issues.
- Prisma schema issues involving enum `Role` values such as `USER` and `ADMIN`, user IDs, unique email, and verification flags.
- Docker multi-stage builds and Render/Vercel deployment.

Treat all of the above as historical context. Inspect the current code, schema and deployment variables before making changes.

## 7. UI/UX direction and owner preferences

The owner wants a modern, premium developer-product interface rather than a generic SaaS template.

### Design preferences
- Strong typography and clear visual hierarchy.
- Editorial, minimalist, premium visual direction.
- Intentional asymmetric layouts.
- Layered compositions using `position: absolute`, `position: relative`, transforms and controlled `z-index`.
- Floating dashboard panels and product mockups.
- Fine borders, technical labels, indices, metadata and subtle grid details.
- Smooth, meaningful scroll-based animations.
- Responsive layouts that are composed intentionally for mobile, not merely scaled down.
- Clean, maintainable components and production-ready code.

### Reference visual direction discussed
An uploaded editorial automotive poster showed:
- Off-white/grey canvas.
- Oversized black headline.
- A large centered floating subject overlapping typography.
- Small labels and numbers around the composition.
- Thin technical rules and generous whitespace.

Translate that art direction into ProjectAPI: use dashboard/API/product visuals as the hero subject rather than irrelevant car imagery, unless the owner explicitly requests the car image itself.

### Animation preferences
- GSAP + ScrollTrigger for hero timelines, scroll reveals and parallax.
- Framer Motion for interaction transitions and smaller UI states.
- Lenis for smooth scrolling, integrated correctly with GSAP.
- Respect `prefers-reduced-motion`.
- Clean up timelines, ScrollTriggers, event listeners and Lenis instances.
- Do not animate everything; motion should clarify hierarchy and storytelling.

## 8. Current public website content map

Observed on the live homepage:
- Hero: product positioning and CTAs.
- Framework compatibility row.
- Features grid.
- Problem/solution comparison.
- Playground showcase.
- Template/workflow showcase.
- Audience section.
- Pricing section.
- FAQ.
- Final CTA.

An agent redesigning the landing page should preserve the actual product story and real feature set. It may improve copy and composition, but must not invent integrations, metrics, pricing, security certifications, customer counts or guarantees.

## 9. What has NOT been fully inspected yet

The public page can be read, but a public text crawl is not equivalent to a full interactive browser audit. The private authenticated dashboard has not been inspected in this document.

An agent must still inspect these areas in the actual application:

### Public experience
- Desktop and mobile screenshots of every public route.
- Navigation destinations and footer links.
- Login and registration screens.
- Pricing details and FAQ answers.
- Playground interactions.
- Documentation and API reference.
- Status and changelog pages.
- Loading, empty, error and not-found states.

### Authenticated application
After the owner signs in locally or through an authorized browser session, inspect:
- Dashboard overview and sidebar/navigation.
- Projects list, search, filtering and sorting.
- Create/edit/duplicate/archive project flows.
- Featured project controls.
- Project detail views.
- Image/video/document upload and preview.
- API key management and key rotation.
- Public API endpoint and response shape.
- Playground request builder and response viewer.
- Profile/account settings.
- Authentication/session behavior.
- Notifications/toasts.
- Empty states, loading states and error states.
- Responsive behavior at desktop, tablet and mobile widths.

Do not claim these screens were inspected until they have actually been opened and tested.

## 10. Agent operating instructions

Before editing:
1. Read the root `package.json`.
2. Inspect the app folder structure and route tree.
3. Identify the real public and authenticated routes.
4. Inspect the relevant components, hooks, Redux slices, API clients and backend contracts.
5. Identify the actual source of truth for data and authentication.
6. Capture a baseline of the current UI where browser tooling is available.
7. Make a short implementation plan.

While editing:
- Preserve existing API contracts unless a change is explicitly required.
- Do not replace working authentication or state management with mock data.
- Do not hardcode credentials, tokens, API keys or secrets.
- Never put credentials in Markdown, source files, screenshots or logs.
- Do not expose private user data in public API responses.
- Avoid unnecessary dependencies.
- Reuse existing UI primitives where appropriate.
- Use semantic HTML, accessible labels and keyboard navigation.
- Add useful loading, empty, error and success states.
- Keep mobile layouts functional.
- Keep animations performant and accessible.

After editing:
1. Run lint/typecheck/build scripts that exist in the repository.
2. Fix errors introduced by the change.
3. Test primary user flows.
4. Verify responsive behavior.
5. Report exactly which files changed.
6. Report what was tested and what remains unverified.
7. Do not claim a test passed unless it was actually run.

## 11. Security and credential handling

- Do not store login passwords in this document.
- Do not copy secrets from `.env` into documentation.
- Do not commit `.env` files.
- Use local environment variables or the deployment provider's secret manager.
- If browser login is required, the owner should enter credentials directly into the trusted browser session.
- Use least-privilege access and avoid destructive actions unless explicitly approved.

## 12. Reliable source references

- Production website: https://projectapi-app.vercel.app/
- Public homepage is the source for the currently visible product positioning and marketing claims.
- Repository source code is the source of truth for implementation.
- Prisma schema and migrations are the source of truth for database structure.
- Current environment/deployment settings are the source of truth for live service URLs and configuration.
- Historical chat context is useful background, but must not override current repository evidence.

---

## Short instruction for the coding agent

**First understand the real ProjectAPI application, then improve it without breaking its product behavior.** Treat this file as a product brief, not as proof that every described feature is currently implemented. Verify every route, component, API contract and schema in the repository. Preserve real functionality, build a premium and responsive developer experience, run the available checks, and clearly report any area you could not inspect.
