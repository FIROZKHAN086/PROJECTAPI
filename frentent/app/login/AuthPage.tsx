"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/src/lib/hooks";
import { useAuth } from "@/src/hooks/useAuth";
import BrandPanel from "./components/BrandPanel";
import AuthForm from "./components/AuthForm";
import MobileFeatures from "./components/MobileFeatures";

const isSafePath = (value?: string) =>
  !!value && value.startsWith("/") && !value.startsWith("//");

/* ─── deterministic pseudo-random particles ─── */
const SEED = [7, 23, 41, 58, 71, 88, 12, 34, 52, 66, 83, 95, 18, 29, 47, 63];
const PARTICLE_COUNT = 28;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  x: SEED[i % SEED.length],
  y: ((SEED[(i * 3) % SEED.length] * 1.3) % 100),
  size: 2 + (SEED[(i * 5) % SEED.length] % 4),
  dur: 18 + (SEED[(i * 7) % SEED.length] % 24),
  delay: -(SEED[(i * 2) % SEED.length] % 20),
  kind: i % 3 === 0 ? "ring" : "dot",
}));

/* ─── Canvas constellation background ─── */
function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 0.5;
      canvas.height = canvas.offsetHeight * 0.5;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    for (let i = 0; i < 40; i++) {
      nodes.push({
        x: SEED[i % SEED.length] / 100 * canvas.width + i * 12,
        y: SEED[(i * 3) % SEED.length] / 100 * canvas.height + i * 8,
        vx: (SEED[(i * 5) % SEED.length] - 50) * 0.003,
        vy: (SEED[(i * 7) % SEED.length] - 50) * 0.003,
        r: 1 + (SEED[(i * 2) % SEED.length] % 3) * 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(74,222,128,0.25)";
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(74,222,128,${((1 - d / 80) * 0.12).toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      frameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
}

/* ─── Cinematic floating orbs ─── */
const ORB_DATA = [
  { w: 420, h: 420, x: "18%", y: "12%", green: true },
  { w: 340, h: 340, x: "72%", y: "58%", green: false },
  { w: 260, h: 260, x: "55%", y: "22%", green: true },
  { w: 380, h: 380, x: "28%", y: "72%", green: false },
  { w: 200, h: 200, x: "82%", y: "15%", green: true },
  { w: 300, h: 300, x: "10%", y: "50%", green: false },
];

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {ORB_DATA.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.w,
            height: orb.h,
            left: orb.x,
            top: orb.y,
            background: orb.green
              ? "radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, (i % 2 === 0 ? 40 : -30), 0],
            y: [0, (i % 3 === 0 ? -35 : 25), 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 16 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── CSS particles ─── */
function DriftingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              p.kind === "dot"
                ? "rgba(74,222,128,0.35)"
                : "transparent",
            border:
              p.kind === "ring"
                ? "1px solid rgba(74,222,128,0.25)"
                : "none",
            animation: `authParticleDrift ${p.dur}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes authParticleDrift {
          0%   { opacity: 0; transform: translate(0, 12vh) rotate(0deg); }
          12%  { opacity: 0.5; }
          88%  { opacity: 0.4; }
          100% { opacity: 0; transform: translate(3vw, -18vh) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}

/* ─── Scanning beam ─── */
function ScanBeam() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px z-10 pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(74,222,128,0.4) 30%, rgba(59,130,246,0.4) 70%, transparent 100%)",
      }}
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
    />
  );
}

/* ─── Animated corner accents ─── */
function CornerAccents() {
  const corners = [
    { pos: "top-0 left-0", border: "border-t-2 border-l-2", color: "border-[#4ADE80]/40", round: "rounded-tl-3xl" },
    { pos: "top-0 right-0", border: "border-t-2 border-r-2", color: "border-[#3B82F6]/40", round: "rounded-tr-3xl" },
    { pos: "bottom-0 left-0", border: "border-b-2 border-l-2", color: "border-[#3B82F6]/40", round: "rounded-bl-3xl" },
    { pos: "bottom-0 right-0", border: "border-b-2 border-r-2", color: "border-[#4ADE80]/40", round: "rounded-br-3xl" },
  ];

  return (
    <>
      {corners.map((c, i) => (
        <motion.div
          key={i}
          className={`absolute ${c.pos} w-20 h-20 ${c.border} ${c.color} ${c.round}`}
          animate={{ opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

/* ─── Main auth page ─── */
function AuthPageContent() {
  const searchParams = useSearchParams();
  const initialAuth = searchParams.get("auth") ?? undefined;
  const nextPath = searchParams.get("next") ?? undefined;
  const isSignUp = initialAuth === "signup";
  const redirectTarget = isSafePath(nextPath) ? nextPath! : "/dashboard";
  const router = useRouter();
  const { user, isLoading: authLoading } = useAppSelector((s) => s.auth);
  const { otpRequired, pendingEmail } = useAuth();

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  const gridScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  useEffect(() => {
    if (!authLoading && user?.userVerified) {
      router.replace(redirectTarget);
    }
  }, [user, authLoading, router, redirectTarget]);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      className="relative min-h-screen overflow-hidden flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #111111 50%, #151515 100%)" }}
    >
      {/* ─── Layer 1: Cinematic background ─── */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY, opacity: bgOpacity }}>
        {/* Radial glow top + bottom */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[#4ADE80]/8 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-[#3B82F6]/8 via-transparent to-transparent" />

        {/* Large breathing orbs */}
        <motion.div
          className="absolute top-[15%] left-[20%] w-[650px] h-[650px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(74,222,128,0.08), transparent 70%)" }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[15%] w-[550px] h-[550px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%)" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      {/* ─── Layer 2: Grid pattern ─── */}
      <motion.div className="absolute inset-0 -z-10 opacity-[0.025]" style={{ scale: gridScale }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #4ADE80 1px, transparent 1px),
                              linear-gradient(to bottom, #4ADE80 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* ─── Layer 3: Floating orbs ─── */}
      <FloatingOrbs />

      {/* ─── Layer 4: Constellation canvas ─── */}
      <div className="absolute inset-0 -z-5 pointer-events-none">
        <ConstellationCanvas />
      </div>

      {/* ─── Layer 5: Drifting particles ─── */}
      <DriftingParticles />

      {/* ─── Layer 6: Wandering spotlight ─── */}
      <motion.div
        className="absolute inset-0 -z-10 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 40%, rgba(74,222,128,0.07) 0%, transparent 50%)",
            "radial-gradient(circle at 75% 55%, rgba(59,130,246,0.07) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 70%, rgba(74,222,128,0.07) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 40%, rgba(74,222,128,0.07) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ─── Content ─── */}
      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10">
        {/* LEFT: Brand panel */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrandPanel isSignUp={isSignUp} />
        </motion.div>

        {/* RIGHT: Auth form card */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[480px] mx-auto lg:mx-0 relative group"
        >
          {/* Animated glow border */}
          <motion.div
            className="absolute -inset-1 rounded-3xl blur-xl pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(74,222,128,0.35), rgba(59,130,246,0.35), rgba(74,222,128,0.35))",
            }}
            animate={{
              opacity: formInView ? [0.25, 0.55, 0.25] : 0,
              scale: [0.97, 1.03, 0.97],
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Card */}
          <div className="relative bg-gradient-to-br from-[#1A1A1A]/95 to-[#0F0F0F]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
            <CornerAccents />
            <ScanBeam />

            {/* Mobile logo */}
            <div className="lg:hidden mb-8 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 border border-white/15 rounded-full backdrop-blur-sm"
              >
                <span className="relative flex size-2.5">
                  <span className="animate-ping absolute inline-flex size-full rounded-full bg-[#4ADE80] opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-[#4ADE80]" />
                </span>
                <span className="text-base font-bold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] bg-clip-text text-transparent">
                  ProjectAPI
                </span>
              </motion.div>
            </div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 relative z-10"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#FFFBF4] font-space-grotesk leading-tight mb-3">
                {otpRequired ? (
                  <>
                    <motion.span
                      className="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] bg-clip-text text-transparent"
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      transition={{ duration: 6, repeat: Infinity }}
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      Verify your email
                    </motion.span>
                  </>
                ) : isSignUp ? (
                  <>
                    Start your{" "}
                    <motion.span
                      className="bg-gradient-to-r from-[#4ADE80] via-[#3B82F6] to-[#4ADE80] bg-clip-text text-transparent"
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      transition={{ duration: 6, repeat: Infinity }}
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      journey
                    </motion.span>
                  </>
                ) : (
                  <>
                    Welcome{" "}
                    <motion.span
                      className="bg-gradient-to-r from-[#4ADE80] via-[#3B82F6] to-[#4ADE80] bg-clip-text text-transparent"
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      transition={{ duration: 6, repeat: Infinity }}
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      back
                    </motion.span>
                  </>
                )}
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-base text-[#D8CFBC]/80 leading-relaxed"
              >
                {otpRequired
                  ? `Check your inbox! We sent a 6-digit code to ${pendingEmail ?? "your email"}`
                  : isSignUp
                    ? "Create your account and unlock access to powerful API tools."
                    : "Sign in to access your dashboard and manage your projects."}
              </motion.p>
            </motion.div>

            <AuthForm isSignUp={isSignUp} redirectTarget={redirectTarget} />
          </div>

          <MobileFeatures />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3"
      >
        <motion.span
          className="text-xs text-[#D8CFBC]/50 font-medium tracking-wider uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Scroll to explore
        </motion.span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 border-2 border-white/15 rounded-full flex items-start justify-center p-1.5 bg-white/5 backdrop-blur-sm"
        >
          <motion.div
            className="w-1.5 h-2.5 rounded-full"
            style={{ background: "linear-gradient(to bottom, #4ADE80, #3B82F6)" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthPageContent />
    </Suspense>
  );
}
