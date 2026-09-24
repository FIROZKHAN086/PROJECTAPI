// lib/data.ts
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Code2,
  FolderOpen,
  Globe,
  Pill,
  Rocket,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";



const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000";
const API_URL = `${BASE_URL}/api`;


export const docTypePhrases: string[] = [
  "Build your endpoint in minutes.",
  "Typed. Versioned. Everywhere.",
  "Docs that feel like a playground.",
  "Ship the docs you wish existed.",
];



export interface DocNavItem {
  id: string;
  title: string;
  icon: LucideIcon;
}

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export interface EndpointItem {
  method: HttpMethod;
  path: string;
  description: string;
  auth: boolean;
}

export interface FieldRow {
  field: string;
  type: string;
  required: boolean;
}

export interface ErrorItem {
  code: string;
  label: string;
  desc: string;
}

export interface StepItem {
  step: number;
  title: string;
  desc: string;
}

export type DocBlock =
  | { kind: "text"; body: string }
  | { kind: "code"; title: string; language: string; code: string }
  | { kind: "endpoints"; items: EndpointItem[] }
  | { kind: "fields"; title: string; rows: FieldRow[] }
  | { kind: "errors"; items: ErrorItem[] }
  | { kind: "steps"; items: StepItem[] }
  | { kind: "bullets"; items: string[] }
  | { kind: "cta"; href: string; label: string };

export interface DocSection {
  id: string;
  kicker: string;
  title: string;
  body: string;
  icon: LucideIcon;
  blocks: DocBlock[];
}

export interface DocOptimizeItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}



export const docNav: DocNavItem[] = [
  { id: "overview", title: "Overview", icon: Sparkles },
  { id: "quickstart", title: "Quickstart", icon: Zap },
  { id: "base-url", title: "Base URL", icon: Globe },
  { id: "projects", title: "Projects", icon: FolderOpen },
  { id: "frontend", title: "Frontend", icon: Code2 },
  { id: "rate-limiting", title: "Rate Limiting", icon: AlertTriangle },
  { id: "errors", title: "Errors", icon: Terminal },
];



const PROJECT_RESPONSE = `{
  "success": true,
  "data": {
    "id": 1,
    "ProjectID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "My Awesome Project",
    "description": "A full-stack web app",
    "image": "https://ik.imagekit.io/...",
    "tech": ["React", "Node.js", "PostgreSQL"],
    "liveDemo": "https://myapp.vercel.app",
    "github": "https://github.com/user/repo",
    "customFields": {
      "field1": "value1",
      "field2": "value2"
    },
    "category": "Web App",
    "featured": true,
    "userId": "1",
    "createdAt": "2026-07-19T00:00:00.000Z",
    "updatedAt": "2026-07-19T00:00:00.000Z"
  }
}`;

const AXIOS_SNIPPET = `"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Example() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/projects/public", {
          headers: {
            accesskey: "YOUR_ACCESS_KEY",
          },
        });

        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}`;

const RATE_LIMIT_RESPONSE = `{
  "success": false,
  "message": "Too many requests, please try again later"
}`;

const ERROR_RESPONSE = `{
  "success": false,
  "message": "Human-readable error description"
}`;


export const docSections: DocSection[] = [
  {
    id: "overview",
    kicker: "The big idea",
    title: "Cool documentation, typed to the edge.",
    body: "Every endpoint, template and workflow ships with types, live examples and a playground you can run right here. Authentication is handled via httpOnly cookies — your frontend never touches a raw token.",
    icon: Sparkles,
    blocks: [
      {
        kind: "bullets",
        items: [
          "REST API · JSON",
          "v1.0 · stable",
          "httpOnly cookie auth",
          "Zero-config typing",
          "Versioned for your future",
          "Deploy in one command",
        ],
      },
    ],
  },
  {
    id: "quickstart",
    kicker: "60 seconds",
    title: "From zero to your first project.",
    body: "Create an account, log in to get your session cookie, and ship your first project. No servers to babysit — the playground handles the boring parts.",
    icon: Zap,
    blocks: [
      {
        kind: "steps",
        items: [
          {
            step: 1,
            title: "Register an account",
            desc: "Create your account to start building.",
          },
          {
            step: 2,
            title: "Login to get your session cookie",
            desc: "The httpOnly cookie is set automatically on login.",
          },
          {
            step: 3,
            title: "Create your first project",
            desc: "POST multipart/form-data to /project and you're live.",
          },
        ],
      },
     
      { kind: "cta", href: "/login?auth=signup", label: "Get Started" },
    ],
  },
  {
    id: "base-url",
    kicker: "Point your client",
    title: "One base URL to rule them all.",
    body: "All endpoints are relative to this base URL. Authentication is handled via httpOnly cookies — no manual token juggling required.",
    icon: Globe,
    blocks: [
      {
        kind: "code",
        title: "Base URL",
        language: "text",
        code: API_URL,
      },
      {
        kind: "text",
        body: "Swap the host for your deployed backend when you're ready to go live.",
      },
    ],
  },
  {
    id: "projects",
    kicker: "Core resource",
    title: "Manage every project you ship.",
    body: "Manage your projects. All project endpoints (except public) require authentication. Image uploads use multipart/form-data via express-fileupload.",
    icon: FolderOpen,
    blocks: [
      {
        kind: "endpoints",
        items: [
          {
            method: "POST",
            path: "/project/public",
            description: "Get public projects (no auth required)",
            auth: false,
          },
        ],
      },
      {
        kind: "fields",
        title: "Project Fields",
        rows: [
          { field: "title", type: "string", required: true },
          { field: "description", type: "string", required: true },
          { field: "tech", type: "string (comma-separated)", required: true },
          { field: "liveDemo", type: "string (URL)", required: false },
          { field: "github", type: "string (URL)", required: false },
          { field: "category", type: "string", required: true },
          {
            field: "featured",
            type: 'string ("true" | "false")',
            required: false,
          },
          { field: "image", type: "File (multipart)", required: false },
          { field: "customFields", type: "string (object)", required: false },
        ],
      },
      {
        kind: "code",
        title: "Project Response",
        language: "json",
        code: PROJECT_RESPONSE,
      },
    ],
  },
  {
    id: "frontend",
    kicker: "Wire it up",
    title: "Frontend integration, typed end to end.",
    body: "The frontend uses React Query, Axios, and Redux for state management. All API calls are centralized with proper error handling and loading states.",
    icon: Code2,
    blocks: [
      {
        kind: "code",
        title: "axios.config.ts",
        language: "typescript",
        code: AXIOS_SNIPPET,
      },
    ],
  },
  {
    id: "rate-limiting",
    kicker: "Be nice",
    title: "Rate limited, not rate limited forever.",
    body: "All API endpoints are rate-limited to 10 requests per 30 seconds per IP. Exceeding this limit returns a 429 Too Many Requests response.",
    icon: AlertTriangle,
    blocks: [
      {
        kind: "code",
        title: "Rate Limit Response",
        language: "json",
        code: RATE_LIMIT_RESPONSE,
      },
    ],
  },
  {
    id: "errors",
    kicker: "When things break",
    title: "Consistent errors, every time.",
    body: "All errors follow a consistent format. The API returns appropriate HTTP status codes with a JSON body.",
    icon: Terminal,
    blocks: [
      {
        kind: "code",
        title: "Error Response Format",
        language: "json",
        code: ERROR_RESPONSE,
      },
      {
        kind: "errors",
        items: [
          {
            code: "400",
            label: "Bad Request",
            desc: "Missing or invalid fields",
          },
          {
            code: "401",
            label: "Unauthorized",
            desc: "Invalid or missing auth token",
          },
          {
            code: "404",
            label: "Not Found",
            desc: "Resource does not exist",
          },
          {
            code: "429",
            label: "Rate Limited",
            desc: "Too many requests",
          },
          {
            code: "500",
            label: "Server Error",
            desc: "Internal server error",
          },
        ],
      },
    ],
  },
];


export const docOptimize: DocOptimizeItem[] = [
  {
    icon: Code2,
    title: "Typed SDKs",
    desc: "Generate client types for TS + JS with one flag.",
  },
  {
    icon: Pill,
    title: "Instant rollbacks",
    desc: "Snap-back any endpoint version in one click.",
  },
  {
    icon: Rocket,
    title: "Ship metrics",
    desc: "See deploy time, usage and uptime in a glance.",
  },
];