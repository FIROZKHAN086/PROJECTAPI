# 🚀 Premium Dashboard Backend API

Welcome to the **Premium Dashboard Backend API**, a robust and scalable server-side infrastructure built for high-performance dashboards. This system provides a secure environment for managing user authentication, project portfolios, and support operations.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [Express.js](https://expressjs.com/) (Version 5+)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Storage**: [ImageKit](https://imagekit.io/) for cloud-based image management
- **Security**: JWT (JSON Web Tokens), [Helmet](https://helmetjs.github.io/), and [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Validation**: [Zod](https://zod.dev/)

---

## ✨ Core Features

### 🔐 Authentication & Security
- **JWT Authentication**: Secure stateless authentication using tokens.
- **OneTimeID System**: A unique identifier system for enhanced user tracking.
- **Role-Based Access**: Support for `USER` and `ADMIN` roles.
- **State-of-the-art Middleware**: Integrated `authMiddleware` for protecting sensitive routes.

### 📁 Project Management
- **Full CRUD Operations**: Create, Read, Update, and Delete projects.
- **Image Integration**: seamless upload to ImageKit.
- **Custom Metadata**: Support for custom JSON fields per project.
- **Smart Filtering**: Fetch projects by user `OneTimeID`.

### 🎫 Support Ticket System
- **Unique Ticket Generation**: Custom identifiers (e.g., `TKT-NAME-UUID`).
- **Ticket Lifecycle**: Track tickets from `OPEN` to `RESOLVED`.
- **Admin Control**: Restricted update and delete permissions for administrators.
- **Production Logging**: Comprehensive logging for auditing and debugging.

---

## 🏗️ Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL Database
- ImageKit Account (for uploads)

### Installation

1. **Clone the repository** (if applicable) or navigate to the backend folder:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your credentials:
   ```env
   PORT=5000
   DATABASE_URL="postgresql://user:password@localhost:5432/dashbord?schema=public"
   JWT_SECRET="your_secret_key"
   IMAGEKIT_PUBLIC_KEY="your_public_key"
   IMAGEKIT_PRIVATE_KEY="your_private_key"
   IMAGEKIT_URL_ENDPOINT="your_url_endpoint"
   ```

4. **Initialize Database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the server**:
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints Overview

### Auth
- `POST /api/auth/register` - Create a new account.
- `POST /api/auth/login` - Authenticate and receive a token.

### Projects
- `POST /api/project/creat` - Create a new project (requires image).
- `GET /api/project/get` - Get all user projects.
- `GET /api/project/getproject/:id` - Fetch project by `ProjectID`.
- `PATCH /api/project/update/:id` - Update project details.
- `DELETE /api/project/delete/:id` - Remove a project.

### Support
- `POST /api/support/create` - Open a new support ticket.
- `GET /api/support/get` - List user tickets.
- `PATCH /api/support/update/:id` - Respond/Update ticket status (Admin).
- `DELETE /api/support/delete/:id` - Remove a ticket (Admin).

---

## 🤖 Built with Antigravity

This backend was architected and implemented with the assistance of **Antigravity**, a high-performance AI coding companion. 

**Antigravity** helped ensure:
- **Clean Code Architecture**: Modular folder structure (`src/Auth`, `src/Project`, `src/Support`).
- **Production-Ready Logging**: Detailed timestamps and status markers for observability.
- **Scalable Data Models**: Efficient Prisma schema design with indexes and relations.
- **Security Best Practices**: Implementation of robust auth flows and middleware.

---

## 📄 License

This project is licensed under the **ISC License**. Created for professional dashboard environments.
