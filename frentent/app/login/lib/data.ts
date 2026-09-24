import { Shield, Zap, Users, Code } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface AuthFeature {
  icon: LucideIcon;
  text: string;
}

export const authFeatures: AuthFeature[] = [
  { icon: Shield, text: "Enterprise-grade security" },
  { icon: Zap, text: "Lightning fast API responses" },
  { icon: Users, text: "Trusted by 10,000+ developers" },
  { icon: Code, text: "Beautiful developer experience" },
];