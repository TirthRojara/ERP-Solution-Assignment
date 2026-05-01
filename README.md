# Sterling Cloud — ERP Solution

A modern, full-featured **ERP (Enterprise Resource Planning)** front-end built with **Next.js 16**, **React 19**, and **TypeScript**. The application provides authentication, vendor management, and a collapsible sidebar dashboard — all connected to a live backend API.

🔗 **Live Demo:** [https://erp-solution-assignment-tirth-rojara.vercel.app/](https://erp-solution-assignment-tirth-rojara.vercel.app/)

### 🔑 Demo Credentials

| Field    | Value           |
| -------- | --------------- |
| Username | `Administrator` |
| Password | `Test@123`      |

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
- [Assumptions](#assumptions)

---

## Tech Stack

| Layer            | Technology                                          |
| ---------------- | --------------------------------------------------- |
| **Framework**    | [Next.js 16](https://nextjs.org/) (App Router)      |
| **Language**     | TypeScript 5                                        |
| **UI Library**   | React 19                                            |
| **Styling**      | Tailwind CSS 4 + custom CSS                         |
| **Components**   | shadcn/ui (Radix UI primitives)                     |
| **Forms**        | React Hook Form + Zod validation                    |
| **Data Fetching**| TanStack React Query v5                             |
| **HTTP Client**  | Axios                                               |
| **Tables**       | TanStack React Table v8                             |
| **Notifications**| Sonner (toast library)                              |
| **Icons**        | Lucide React + custom SVGs                          |
| **Deployment**   | Vercel                                              |

---

## Features

- **Authentication** — Login page with form validation, password visibility toggle, remember-me checkbox, and social login buttons (Google & Facebook).
- **Vendor Management Dashboard** — Summary stat cards, searchable/sortable data table with pagination, and a "Create Vendor" dialog with multi-tab form (Address, Contact, Tax, Accounting).
- **Responsive Sidebar Navigation** — Two-panel collapsible sidebar with icon strip, hamburger toggle, and mobile drawer. Sections include Workspace, Accounting, Inventory, Purchase, and Analytics.
- **API Proxy** — Next.js rewrites proxy all API calls through `/api/erp-solutions/v1/*` to avoid CORS issues.
- **Coming Soon Pages** — Placeholder pages for modules still under development.

---

## Folder Structure

```
ERP-Solution-Assignment/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, providers, metadata)
│   ├── page.tsx                  # Login page (root route "/")
│   ├── globals.css               # Global styles & CSS variables
│   └── (dashboard)/              # Dashboard route group
│       ├── layout.tsx            # Dashboard layout (sidebar + topbar)
│       ├── vendor/page.tsx       # Vendor management page
│       └── coming-soon/          # Placeholder pages
├── components/                   # Shared / reusable components
│   ├── ui/                       # shadcn/ui primitives (Button, Card, etc.)
│   ├── form/                     # Custom form components (Input, Label, Checkbox)
│   ├── app-sidebar.tsx           # Collapsible sidebar component
│   └── topbar.tsx                # Top navigation bar
├── features/                     # Feature-based modules
│   ├── auth/login/               # Login feature (api, hooks, components)
│   ├── vendor/                   # Vendor feature module
│   │   ├── api/                  # API calls, hooks, and types
│   │   └── components/           # Vendor UI (page, table, cards, columns, forms)
│   └── coming-soon/              # Coming-soon feature components
├── lib/                          # Utility libraries
│   └── axios/client.ts           # Axios instance + interceptors
├── provider/                     # React context providers
│   ├── index.provider.tsx        # Root provider (wraps TanStack + Toaster)
│   └── tanStack.provider.tsx     # React Query provider + devtools
├── hooks/                        # Custom React hooks
│   ├── use-debounce.ts           # Debounce hook for search input
│   └── use-mobile.ts             # Mobile breakpoint detection
├── constants/                    # App-wide constants
├── types/                        # Shared TypeScript types
├── public/                       # Static assets (logo, sidebar icons, avatar)
├── next.config.ts                # Next.js config (API rewrites)
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies & scripts
└── .env.development              # Development environment variables
```

---

## Getting Started

### Prerequisites

| Tool     | Required Version |
| -------- | ---------------- |
| Node.js  | >= 18.x          |
| npm      | >= 9.x           |

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/TirthRojara/ERP-Solution-Assignment.git
   cd ERP-Solution-Assignment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.development` (for local dev) or `.env.production` (for production) file in the project root with the following variables:

| Variable                   | Required | Description                                                              | Example Value                                       |
| -------------------------- | -------- | ------------------------------------------------------------------------ | --------------------------------------------------- |
| `NEXT_ENV`                 | No       | The current environment identifier (`development` / `production`)        | `development`                                       |
| `NEXT_PUBLIC_API_BASE_URL` | **Yes**  | Base URL of the backend ERP API. All API calls are proxied through this. | `https://fortwall-contracting.sterlingcloud.co`     |

**Example `.env.development`:**

```env
NEXT_ENV=development
NEXT_PUBLIC_API_BASE_URL=https://fortwall-contracting.sterlingcloud.co
```

> **Note:** The Next.js config (`next.config.ts`) uses `NEXT_PUBLIC_API_BASE_URL` to set up a rewrite rule that proxies `/api/erp-solutions/v1/*` requests to the backend, avoiding CORS issues during development and production.

### Running the Development Server

```bash
npm run dev
```

The app will start at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
npm start
```

### Other Scripts

| Command        | Description                   |
| -------------- | ----------------------------- |
| `npm run dev`  | Start development server      |
| `npm run build`| Create production build       |
| `npm start`    | Serve the production build    |
| `npm run lint` | Run ESLint                    |

---

## Assumptions

1. **Backend API is pre-existing** — The application consumes a live backend hosted at `https://fortwall-contracting.sterlingcloud.co`. No backend setup is required; the API is external and assumed to be always available.

2. **Authentication is session-based** — Login uses form-data POST to the backend's `/login` endpoint. Session cookies (`withCredentials: true`) are used for auth persistence. No JWT or token-based auth is implemented on the frontend.

3. **No user registration flow** — The "Register" link on the login page is a placeholder (`href="#"`). User accounts are expected to be created on the backend/admin side.

4. **Social login is UI-only** — Google and Facebook social login buttons are present in the UI but are non-functional placeholders; OAuth integration is not implemented.

5. **Single-user testing credentials** — The application is designed to work with credentials provisioned on the backend. No sign-up or self-service account creation is available.

6. **Vendor module is the primary feature** — After login, the user is redirected to `/vendor`. Other sidebar sections (Workspace, Accounting, Inventory, Purchase, Analytics) route to a "Coming Soon" placeholder page.

7. **API proxy handles CORS** — All API requests are routed through Next.js rewrites (`/api/erp-solutions/v1/*` → backend URL) to avoid browser CORS restrictions. This means the app must be served via `next dev` or `next start` (not as a static export).

8. **Node.js >= 18 is required** — Next.js 16 and React 19 require Node.js 18 or later. The project was developed and tested on Node.js v22.14.0.

9. **No automated tests** — The project does not include unit or integration tests at this time. Verification was done manually via browser testing.

10. **Responsive design** — The UI is designed to be responsive across desktop, tablet, and mobile viewports. The sidebar collapses to an icon strip on smaller screens and uses a drawer on mobile.

---

## License

This project is part of an assignment submission and is not licensed for redistribution.
