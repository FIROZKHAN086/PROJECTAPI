"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Code2, 
  Sparkles, 
  BookOpen, 
  CreditCard, 
  Terminal, 
  LogIn,
  ChevronRight,
  LogOut,
  User,
  Settings,
  Key,
  ChevronDown,
  CircleQuestionMark,
  Info,
  View,
  Home
} from "lucide-react";
import { 
  Sheet, 
  SheetTrigger, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet";
import { HugeiconsIcon } from "@hugeicons/react";
import { Github01Icon, Help, HelpCircleFreeIcons, TwitterSquareIcon } from "@hugeicons/core-free-icons";
import { useRouter  } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/src/lib/hooks";
import { useLogout } from "@/src/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector((s) => s.auth);
  const logoutMutation = useLogout();

  const router = useRouter();

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navbarRef.current) {
        const rect = navbarRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Motion values for floating elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-1, 1], [3, -3]);
  const rotateY = useTransform(mouseX, [-1, 1], [-3, 3]);

  useEffect(() => {
    mouseX.set(mousePosition.x);
    mouseY.set(mousePosition.y);
  }, [mousePosition, mouseX, mouseY]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Home, description: "Return to the homepage" },
    { name: "Features", href: "#features", icon: Sparkles, description: "Discover powerful tools" },
    { name: "Docs", href: "/docs", icon: BookOpen, description: "Read the documentation" },
    { name: "Dashboard", href: "/dashboard", icon: Terminal, description: "Test your API" },
  ];

  const dropdownItems = [
    { name: "Pricing", href: "#pricing", icon: CreditCard },
    { name: "About", href: "#playground", icon:Info },
    { name: "Contact us", href: "#playground", icon: CircleQuestionMark },
    { name: "API Playground", href: "#playground", icon: Terminal },
  ];

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring" as const, 
        stiffness: 120,
        damping: 15
      } 
    },
  };

  const logoVariants = {
    initial: { rotate: 0 },
    hover: {
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut" as const,
      },
    },
  };

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: {
      opacity: 1,
      scale: 1.2,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  const mobileListVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: 30, rotateY: -10 },
    show: { 
      opacity: 1, 
      x: 0, 
      rotateY: 0,
      transition: { 
        type: "spring" as const, 
        stiffness: 150, 
        damping: 18 
      } 
    },
  };

  const buttonGlowVariants = {
    idle: { boxShadow: "0px 0px 20px rgba(74, 222, 128, 0)" },
    hover: { 
      boxShadow: "0px 0px 30px rgba(74, 222, 128, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      }
    },
  };

  return (
    <>
      <motion.header
      suppressHydrationWarning={true}
        ref={navbarRef}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        style={{
          rotateX: useTransform(rotateX, (v) => v * 0.3),
          rotateY: useTransform(rotateY, (v) => v * 0.3),
        }}
        className={`sticky top-0 z-50 cursor-pointer transition-all duration-300 border-b ${
          scrolled
            ? "py-3 bg-[#0A0A0A]/85 backdrop-blur-xl border-[#4ADE80]/20 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            : "py-5 bg-transparent border-white/5"
        }`}
      >
        <div className="max-w-[1140px] mx-auto px-6 flex items-center justify-between relative">
          {/* Logo Section with Enhanced Animation */}
          <motion.div 
            variants={childVariants}
            className="flex items-center gap-2 cursor-pointer group relative"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHoveringLogo(true)}
            onHoverEnd={() => setIsHoveringLogo(false)}
          >
            {/* Glow effect */}
            <motion.div
              variants={glowVariants}
              initial="initial"
              animate={isHoveringLogo ? "hover" : "initial"}
              className="absolute inset-0 rounded-full bg-[#4ADE80]/20 blur-xl"
            />
            
            <motion.span
              variants={logoVariants}
              initial="initial"
              animate={isHoveringLogo ? "hover" : "initial"}
              className="text-[#ececec] font-bold font-mono tracking-wider flex items-center justify-center p-1.5 rounded-lg bg-[#141414] border border-white/10 group-hover:border-[#4ADE80]/50 group-hover:shadow-[0_0_15px_rgba(74,222,128,0.25)] transition-all duration-300 relative z-10"
            >
              <Code2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </motion.span>
            
            <motion.span 
            onClick={()=>router.push('/')}
              className="text-lg font-bold text-[#FFFBF4] tracking-tight font-sans relative z-10"
              animate={isHoveringLogo ? { 
                textShadow: "0 0 20px rgba(74,222,128,0.2)",
                color: "#4ADE80"
              } : { 
                textShadow: "0 0 0px rgba(74,222,128,0)",
                color: "#FFFBF4"
              }}
              transition={{ duration: 0.3 }}
            >
              Project<span className="text-[#4ADE80]">API</span>
            </motion.span>

            {/* Floating particles on hover */}
            <AnimatePresence>
              {isHoveringLogo && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        opacity: 0,
                        scale: 0,
                        x: 0,
                        y: 0 
                      }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [0, (i - 2.5) * 20],
                        y: [0, -20 - i * 5],
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeOut" as const,
                      }}
                      className="absolute w-1 h-1 rounded-full bg-[#4ADE80]"
                      style={{
                        left: "50%",
                        top: "50%",
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Desktop Navigation with Enhanced Interactions */}
          <motion.nav 
            variants={childVariants} 
            className="hidden md:flex items-center gap-1 bg-[#141414]/40 border border-white/5 p-1 rounded-full relative"
          >
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative px-4 py-1.5 text-xs font-medium text-[#D8CFBC] hover:text-[#FFFBF4] transition-colors duration-200 z-10 flex items-center gap-1.5"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {hoveredIndex === index && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full z-[-1]"
                      transition={{ type: "spring" as const, stiffness: 350, damping: 25 }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    />
                  )}
                  <motion.span
                    animate={hoveredIndex === index ? { 
                      rotate: [0, 10, -10, 0],
                      transition: { duration: 0.5 }
                    } : {}}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </motion.span>
                  <span>{link.name}</span>
                  {hoveredIndex === index && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[#4ADE80] text-[10px]"
                    >
                      •
                    </motion.span>
                  )}
                </motion.a>
              );
            })}

            {/* Dropdown trigger with animation */}
            <motion.div
              className="relative"
              onHoverStart={() => setActiveDropdown("more")}
              onHoverEnd={() => setActiveDropdown(null)}
            >
              <motion.button
                className="px-4 py-1.5 text-xs font-medium text-[#D8CFBC] hover:text-[#FFFBF4] transition-colors duration-200 flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                More
                <motion.span
                  animate={{ rotate: activeDropdown === "more" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="w-3 h-3" />
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {activeDropdown === "more" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute top-full mt-2 right-0 w-48 bg-[#141414] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                  >
                    {dropdownItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <motion.a
                          key={item.name}
                          href={item.href}
                          whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
                          className="flex items-center gap-3 px-4 py-3 text-xs text-[#D8CFBC] hover:text-[#FFFBF4] transition-all duration-200"
                        >
                          <Icon className="w-4 h-4 text-[#4ADE80]" />
                          <span>{item.name}</span>
                        </motion.a>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.nav>

          {/* Right Actions with Enhanced Animation */}
          <motion.div variants={childVariants} className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative" ref={profileDropdownRef}>
                <motion.button
                  onClick={() => setProfileOpen(!profileOpen)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414]/60 border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
                >
                  <div className="size-6 rounded-full bg-[#4ADE80]/15 border border-[#4ADE80]/30 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[#4ADE80]">
                      {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-[#FFFBF4] max-w-[100px] truncate">
                    {user.name || user.email.split("@")[0]}
                  </span>
                  <motion.span
                    animate={{ rotate: profileOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-3 h-3 text-[#D8CFBC]" />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="absolute top-full mt-2 right-0 w-52 bg-[#141414] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
                    >
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-medium text-[#FFFBF4] truncate">{user.name || "User"}</p>
                        <p className="text-[10px] text-[#8A8578] truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <a href="#profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#D8CFBC] hover:text-[#FFFBF4] hover:bg-white/5 transition-all duration-200">
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </a>
                      
                          <a onClick={() => {setProfileOpen(false); router.push('/dashboard?path=api-key');}} className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#D8CFBC] hover:text-[#FFFBF4] hover:bg-white/5 transition-all duration-200">
                            <Key className="w-4 h-4" />
                            <span>API Keys</span>
                          </a>
                          <a onClick={() => {setProfileOpen(false); router.push('/api-look');}} className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#D8CFBC] hover:text-[#FFFBF4] hover:bg-white/5 transition-all duration-200">
                            <View className="w-4 h-4" />
                            <span>API Looks</span>
                          </a>
                          <a onClick={() => {setProfileOpen(false); router.push('/dashboard');}} className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#D8CFBC] hover:text-[#FFFBF4] hover:bg-white/5 transition-all duration-200">
                            <Terminal className="w-4 h-4" />
                            <span>Dashboard</span>
                          </a>
                       
                        <a href="#help" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#D8CFBC] hover:text-[#FFFBF4] hover:bg-white/5 transition-all duration-200">
                          <HugeiconsIcon icon={HelpCircleFreeIcons} className="w-4 h-4" />
                          <span>Help</span>
                        </a>
                        <a href="#settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#D8CFBC] hover:text-[#FFFBF4] hover:bg-white/5 transition-all duration-200">
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </a>
                      </div>
                      <div className="border-t border-white/10 py-1">
                        <button
                          onClick={() => { logoutMutation.mutate(); setProfileOpen(false); }}
                          disabled={logoutMutation.isPending}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-[#F87171] hover:bg-[#F87171]/10 transition-all duration-200 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{logoutMutation.isPending ? "..." : "Logout"}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                
                  <motion.a
                  onClick={()=>router.push("/login?auth=login")}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      textShadow: "0 0 20px rgba(74,222,128,0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative text-sm font-medium text-[#D8CFBC] hover:text-[#FFFBF4] transition-colors flex items-center gap-1.5 px-3 py-1.5 group"
                  >
                    <motion.span
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut" as const,
                        delay: 0.5
                      }}
                    >
                      <LogIn className="w-4 h-4 text-[#D8CFBC] group-hover:text-[#4ADE80] transition-colors" />
                    </motion.span>
                    <span>Log in</span>
                  </motion.a>
                

                
                  <motion.button
                  onClick={()=>router.push('/login?auth=signup')}
                    variants={buttonGlowVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden px-5 py-2 bg-gradient-to-r from-[#FBF7F4] to-[#EBE7E4] text-[#0A0A0A] rounded-lg text-sm font-medium transition-all duration-300 group flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      Get Started
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "easeInOut" as const
                        }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent z-0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" as const }}
                    />
                  </motion.button>
                
              </>
            )}
          </motion.div>

          {/* Mobile Menu Button with Animation */}
          <div className="flex md:hidden items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="flex items-center justify-center p-2 text-[#D8CFBC] hover:text-[#FFFBF4] rounded-lg bg-[#141414] border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer">
                <motion.div
                  animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="bg-[#0A0A0A] border-l border-white/10 p-0 flex flex-col justify-between w-[340px] text-[#FFFBF4] overflow-hidden"
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>Mobile Navigation</SheetTitle>
                  <SheetDescription>Access sections, log in, or get started</SheetDescription>
                </SheetHeader>

                <motion.div 
                  className="flex flex-col h-full justify-between p-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.3, ease: "easeOut" as const }}
                >
                  <div className="space-y-8 pt-4">
                    {/* Mobile Header */}
                    <motion.div 
                      className="flex items-center justify-between border-b border-white/10 pb-4"
                      initial={{ opacity: 0, y: -20 }}
                      animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.div 
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                      >
                        <motion.span 
                          className="text-[#4ADE80] font-bold font-mono p-1.5 rounded-lg bg-[#141414] border border-white/10"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" as const }}
                        >
                          <Code2 className="w-5 h-5" />
                        </motion.span>
                        <span className="text-base font-bold text-[#FFFBF4]">
                          Project<span className="text-[#4ADE80]">API</span>
                        </span>
                      </motion.div>
                      
                      <motion.button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                        whileHover={{ rotate: 90 }}
                      >
                        <X className="w-4 h-4 text-[#D8CFBC]" />
                      </motion.button>
                    </motion.div>

                    {/* Mobile Navigation Links with Stagger */}
                    <motion.nav 
                      variants={mobileListVariants}
                      initial="hidden"
                      animate={isOpen ? "show" : "hidden"}
                      className="flex flex-col gap-2"
                    >
                      {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <motion.a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            variants={mobileItemVariants}
                            whileHover={{ 
                              x: 8, 
                              backgroundColor: "rgba(74,222,128,0.1)",
                              borderColor: "rgba(74,222,128,0.3)"
                            }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#141414]/50 border border-white/5 hover:border-[#4ADE80]/20 hover:bg-[#141414]/80 text-[#D8CFBC] hover:text-[#FFFBF4] text-sm font-medium transition-all duration-200 group"
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              className="p-1.5 rounded-lg bg-[#4ADE80]/10 text-[#4ADE80]"
                            >
                              <Icon className="w-4 h-4" />
                            </motion.div>
                            <div className="flex-1">
                              <span>{link.name}</span>
                              <span className="block text-[10px] text-[#D8CFBC]/50">{link.description}</span>
                            </div>
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" as const }}
                            >
                              <ChevronRight className="w-4 h-4 text-[#D8CFBC]/30 group-hover:text-[#4ADE80] transition-colors" />
                            </motion.div>
                          </motion.a>
                        );
                      })}

                      {/* Additional mobile items */}
                      {dropdownItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <motion.a
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            variants={mobileItemVariants}
                            whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.05)" }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#141414]/30 border border-white/5 hover:border-white/10 text-[#D8CFBC] hover:text-[#FFFBF4] text-sm font-medium transition-all duration-200"
                          >
                            <Icon className="w-4 h-4 text-[#D8CFBC]" />
                            <span>{item.name}</span>
                          </motion.a>
                        );
                      })}
                    </motion.nav>
                  </div>

                  {/* Mobile Bottom Actions */}
                  <motion.div 
                    className="flex flex-col gap-3 border-t border-white/10 pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 }}
                  >
                    {user ? (
                      <>
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#141414]/50 border border-white/5">
                          <div className="size-8 rounded-full bg-[#4ADE80]/15 border border-[#4ADE80]/30 flex items-center justify-center">
                            <span className="text-xs font-bold text-[#4ADE80]">
                              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#FFFBF4] truncate">{user.name || "User"}</p>
                            <p className="text-[10px] text-[#8A8578] truncate">{user.email}</p>
                          </div>
                        </div>
                        <motion.button
                          onClick={() => { logoutMutation.mutate(); setIsOpen(false); }}
                          disabled={logoutMutation.isPending}
                          whileHover={{ scale: 1.02, backgroundColor: "rgba(248,113,113,0.1)" }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#F87171]/20 text-sm font-medium text-[#F87171] hover:bg-[#F87171]/10 transition-all duration-200 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{logoutMutation.isPending ? "Logging out..." : "Logout"}</span>
                        </motion.button>
                      </>
                    ) : (
                      <>
                       
                          <motion.a

                          onClick={() => {setIsOpen(false); router.push('/login')}}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-transparent border border-white/10 text-sm font-medium text-[#FFFBF4] hover:bg-white/5 transition-all duration-200"
                          >
                            <LogIn className="w-4 h-4" />
                            <span>Log in</span>
                          </motion.a>
                     
                       
                          <motion.button
                           onClick={() => {setIsOpen(false); router.push('/login?auth=signup')}}
                            whileHover={{ scale: 1.02, boxShadow: "0px 0px 30px rgba(74,222,128,0.2)" }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#FBF7F4] to-[#EBE7E4] text-[#0A0A0A] text-sm font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer shadow-[0_4px_15px_rgba(255,255,255,0.05)] relative overflow-hidden group"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              Get Started
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent z-0"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.6, ease: "easeInOut" as const }}
                            />
                          </motion.button>
                      
                      </>
                    )}

                    <motion.div 
                      className="flex items-center justify-center gap-4 pt-2"
                      initial={{ opacity: 0 }}
                      animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.a
                        href="#"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="text-[#D8CFBC] hover:text-[#4ADE80] transition-colors"
                      >
                <HugeiconsIcon icon={Github01Icon} />
                      </motion.a>
                      <motion.a
                        href="#"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="text-[#D8CFBC] hover:text-[#4ADE80] transition-colors"
                      >
                      <HugeiconsIcon icon={TwitterSquareIcon} />
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Scroll Progress Bar with Enhanced Style */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4ADE80] via-[#FFFBF4] to-[#4ADE80] origin-[0%] z-50 shadow-[0_0_15px_rgba(74,222,128,0.3)]"
          style={{ scaleX }}
        />
      </motion.header>
    </>
  );
};

export default Navbar;