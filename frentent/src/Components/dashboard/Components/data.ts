import { Cloud, Code, Database, GitBranch, Lock, Monitor, Palette, Server, Smartphone } from "lucide-react";

 
 
 
 
 export const techOptions = [
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "TypeScript",
  "JavaScript",
  "Python",
  "Django",
  "Flask",
  "Node.js",
  "Express",
  "Java",
  "Spring Boot",
  "C#",
  ".NET",
  "Go",
  "Rust",
  "Ruby on Rails",
  "PHP",
  "Laravel",
  "Tailwind CSS",
  "Bootstrap",
  "Material UI",
  "Chakra UI",
  "Framer Motion",
  "Three.js",
  "WebGL",
  "GraphQL",
  "REST API",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "Firebase",
  "Supabase",
  "Vercel",
  "Netlify",
  "Cloudflare",
];



 export  const categoryOptions = [
  { value: "web-app", label: "Web App", icon: Monitor },
  { value: "mobile-app", label: "Mobile App", icon: Smartphone },
  { value: "api", label: "API", icon: Server },
  { value: "library", label: "Library", icon: Code },
  { value: "desktop-app", label: "Desktop App", icon: Monitor },
  { value: "game", label: "Game", icon: Palette },
  { value: "ai-ml", label: "AI/ML", icon: Database },
  { value: "blockchain", label: "Blockchain", icon: Lock },
  { value: "saas", label: "SaaS", icon: Cloud },
  { value: "open-source", label: "Open Source", icon: GitBranch },
];


 export const glassInput =
  "rounded-xl border border-white/10 bg-white/[0.04] text-[#FAFAFA] placeholder:text-[#6B6B6B] focus-visible:border-[#4ADE80]/50 focus-visible:ring-[#4ADE80]/20";
