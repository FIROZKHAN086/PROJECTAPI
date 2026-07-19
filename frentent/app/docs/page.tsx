"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Copy,
  Check,
  Code2,
  Shield,
  FolderOpen,
  AlertTriangle,
  ArrowRight,
  Terminal,
  Globe,
  Lock,
  Zap,
  Mail,
  User,
  Key,
  Loader2,
  RefreshCw,
  Database,
  Server,
  Cloud,
  Layers,
  Link2,
  ExternalLink,
  Calendar,
  Clock,
  Settings,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Flag,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 16 } },
};

const CodeBlock = ({ title, language, children }: { title: string; language: string; children: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden bg-[#0A0A0A]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-[#141414]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F87171]/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FACC15]/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#4ADE80]/60" />
          </div>
          <span className="text-[11px] text-[#8A8578] ml-2">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-white/5 text-[#8A8578] border border-white/10 text-[9px]">
            {language}
          </Badge>
          <button
            onClick={handleCopy}
            className="p-1 rounded-md hover:bg-white/5 transition-colors text-[#8A8578] hover:text-[#D8CFBC] cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#4ADE80]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-[#D8CFBC] font-mono">{children}</code>
      </pre>
    </div>
  );
};

const EndpointCard = ({
  method,
  path,
  description,
  auth,
}: {
  method: string;
  path: string;
  description: string;
  auth: boolean;
}) => {
  const methodColors: Record<string, string> = {
    GET: "bg-[#4ADE80]/15 text-[#4ADE80] border-[#4ADE80]/30",
    POST: "bg-[#60A5FA]/15 text-[#60A5FA] border-[#60A5FA]/30",
    PATCH: "bg-[#FACC15]/15 text-[#FACC15] border-[#FACC15]/30",
    DELETE: "bg-[#F87171]/15 text-[#F87171] border-[#F87171]/30",
  };

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-[#141414] hover:border-white/20 transition-colors">
      <Badge className={`${methodColors[method] || methodColors.GET} text-[10px] font-mono shrink-0 mt-0.5`}>
        {method}
      </Badge>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <code className="text-sm text-[#FFFBF4] font-mono">{path}</code>
          {auth && (
            <Badge className="bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/20 text-[9px]">
              <Lock className="w-2.5 h-2.5 mr-0.5" />
              Auth
            </Badge>
          )}
        </div>
        <p className="text-xs text-[#8A8578]">{description}</p>
      </div>
    </div>
  );
};

const Section = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
  <motion.section variants={item} className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-[#4ADE80]/10 flex items-center justify-center">
        <Icon className="w-4.5 h-4.5 text-[#4ADE80]" />
      </div>
      <h2 className="text-xl font-bold text-[#FFFBF4]">{title}</h2>
    </div>
    <div className="space-y-4 pl-12">{children}</div>
  </motion.section>
);

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFBF4] font-sans antialiased">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">

          {/* Header */}
          <motion.div variants={item} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#4ADE80]/10 border border-[#4ADE80]/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#4ADE80]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#FFFBF4]">API Documentation</h1>
                <p className="text-sm text-[#8A8578]">
                  Complete reference for the ProjectAPI
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20">
                <Zap className="w-3 h-3 mr-1" />
                v1.0
              </Badge>
              <Badge className="bg-white/5 text-[#8A8578] border border-white/10">
                REST API
              </Badge>
              <Badge className="bg-white/5 text-[#8A8578] border border-white/10">
                JSON
              </Badge>
            </div>
          </motion.div>

          <motion.div variants={item} className="h-px bg-white/5" />

          {/* Base URL */}
          <Section icon={Globe} title="Base URL">
            <CodeBlock title="Base URL" language="text">
              {`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api`}
            </CodeBlock>
            <p className="text-sm text-[#8A8578]">
              All endpoints are relative to this base URL. Authentication is handled via httpOnly cookies.
            </p>
          </Section>

          <motion.div variants={item} className="h-px bg-white/5" />

          {/* Projects */}
          <Section icon={FolderOpen} title="Projects">
            <p className="text-sm text-[#D8CFBC] leading-relaxed">
              Manage your projects. All project endpoints (except public) require authentication. Image uploads use <code className="px-1.5 py-0.5 rounded bg-white/5 text-[#4ADE80] text-xs font-mono">multipart/form-data</code> via <code className="px-1.5 py-0.5 rounded bg-white/5 text-[#4ADE80] text-xs font-mono">express-fileupload</code>.
            </p>

            <div className="space-y-3">
              <EndpointCard method="POST" path="/project/public" description="Get public projects (no auth required)" auth={false} />
            </div>

            <div className="space-y-3 mt-4">
              <h3 className="text-base font-semibold text-[#FFFBF4]">Project Fields</h3>
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#141414] border-b border-white/5">
                      <th className="text-left px-4 py-2.5 text-[#8A8578] font-medium text-xs">Field</th>
                      <th className="text-left px-4 py-2.5 text-[#8A8578] font-medium text-xs">Type</th>
                      <th className="text-left px-4 py-2.5 text-[#8A8578] font-medium text-xs">Required</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { field: "title", type: "string", required: true },
                      { field: "description", type: "string", required: true },
                      { field: "tech", type: "string (comma-separated)", required: true },
                      { field: "liveDemo", type: "string (URL)", required: false },
                      { field: "github", type: "string (URL)", required: false },
                      { field: "category", type: "string", required: true },
                      { field: "featured", type: "string (\"true\" | \"false\")", required: false },
                      { field: "image", type: "File (multipart)", required: false },
                      { field: "customFields", type: "string (object)", required: false },
                    ].map((row) => (
                      <tr key={row.field} className="hover:bg-white/[0.02]">
                        <td className="px-4 py-2.5 font-mono text-[#4ADE80] text-xs">{row.field}</td>
                        <td className="px-4 py-2.5 text-[#D8CFBC] text-xs">{row.type}</td>
                        <td className="px-4 py-2.5">
                          {row.required ? (
                            <Badge className="bg-[#F87171]/10 text-[#F87171] border border-[#F87171]/20 text-[9px]">Required</Badge>
                          ) : (
                            <Badge className="bg-white/5 text-[#8A8578] border border-white/10 text-[9px]">Optional</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <CodeBlock title="Project Response" language="json">
{`{
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
}`}
            </CodeBlock>
          </Section>

          <motion.div variants={item} className="h-px bg-white/5" />

          {/* Frontend Integration - Redesigned */}
          <Section icon={Code2} title="Frontend Integration">
            <p className="text-sm text-[#D8CFBC] leading-relaxed">
              The frontend uses React Query, Axios, and Redux for state management. All API calls are centralized with proper error handling and loading states.
            </p>

            {/* Axios Setup */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#FFFBF4] flex items-center gap-2">
                <Server className="w-4 h-4 text-[#60A5FA]" />
                Axios Configuration
              </h3>
              <CodeBlock title="axios.config.ts" language="typescript">
{`"use client";

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
}`}
              </CodeBlock>
            </div>

       

           

      

            

           
          </Section>

          <motion.div variants={item} className="h-px bg-white/5" />

          {/* Rate Limiting */}
          <Section icon={AlertTriangle} title="Rate Limiting">
            <p className="text-sm text-[#D8CFBC] leading-relaxed">
              All API endpoints are rate-limited to <strong className="text-[#FFFBF4]">10 requests per 30 seconds</strong> per IP. Exceeding this limit returns a <code className="px-1.5 py-0.5 rounded bg-white/5 text-[#F87171] text-xs font-mono">429 Too Many Requests</code> response.
            </p>
            <CodeBlock title="Rate Limit Response" language="json">
{`{
  "success": false,
  "message": "Too many requests, please try again later"
}`}
            </CodeBlock>
          </Section>

          <motion.div variants={item} className="h-px bg-white/5" />

          {/* Error Handling */}
          <Section icon={Terminal} title="Error Handling">
            <p className="text-sm text-[#D8CFBC] leading-relaxed">
              All errors follow a consistent format. The API returns appropriate HTTP status codes with a JSON body.
            </p>
            <CodeBlock title="Error Response Format" language="json">
{`{
  "success": false,
  "message": "Human-readable error description"
}`}
            </CodeBlock>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { code: "400", label: "Bad Request", desc: "Missing or invalid fields" },
                { code: "401", label: "Unauthorized", desc: "Invalid or missing auth token" },
                { code: "404", label: "Not Found", desc: "Resource does not exist" },
                { code: "429", label: "Rate Limited", desc: "Too many requests" },
                { code: "500", label: "Server Error", desc: "Internal server error" },
              ].map((err) => (
                <div key={err.code} className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-[#141414]">
                  <Badge className="bg-[#F87171]/10 text-[#F87171] border border-[#F87171]/20 text-[10px] font-mono">
                    {err.code}
                  </Badge>
                  <div>
                    <p className="text-xs font-medium text-[#FFFBF4]">{err.label}</p>
                    <p className="text-[10px] text-[#8A8578]">{err.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <motion.div variants={item} className="h-px bg-white/5" />

          {/* Quick Start */}
          <Section icon={Zap} title="Quick Start">
            <p className="text-sm text-[#D8CFBC] leading-relaxed">
              Get up and running in 3 steps:
            </p>
            <div className="space-y-3">
              {[
                { step: 1, title: "Register an account", },
                { step: 2, title: "Login to get your session cookie" },
                { step: 3, title: "Create your first project" },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-[#141414]">
                  <div className="w-6 h-6 rounded-full bg-[#4ADE80]/15 flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-bold text-[#4ADE80]">{s.step}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#FFFBF4]">{s.title}</p>
                   
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Link
                href="/login?auth=signup"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4ADE80] text-[#0A0A0A] text-sm font-semibold hover:bg-[#4ADE80]/90 transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Section>

        </motion.div>
      </main>
    </div>
  );
}