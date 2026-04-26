"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  Car,
  Building2,
  Fingerprint,
  ScanFace,
  ChevronRight,
  Lock,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSimulateAuth = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      router.push(`/conductor`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden text-white font-sans selection:bg-[#E60000] selection:text-white">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/audilateral.png"
          alt="Audi e-tron background"
          fill
          className="object-cover opacity-40 mix-blend-luminosity scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="w-full max-w-lg z-10 p-6 flex flex-col min-h-screen">
        {/* Header / Logo Area */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex-none pt-12 pb-8 flex flex-col items-center justify-center space-y-4"
        >
          <div className="text-4xl font-light tracking-widest uppercase flex items-center gap-3">
            <span>AutoConnect</span>
            <span className="font-bold text-[#E60000]">OS</span>
          </div>
          <div className="h-[1px] w-12 bg-[#E60000] mt-2"></div>
          <p className="text-white/50 text-xs tracking-widest uppercase mt-4">
            Telemetry & Control Interface
          </p>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key="mfa"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard className="p-10 border-t border-[#E60000]/30 backdrop-blur-3xl shadow-[0_0_50px_rgba(230,0,0,0.1)]">
                <div className="space-y-8 text-center flex flex-col items-center">
                  <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                    {/* Scanning animation rings */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-full border border-[#E60000]/50"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        delay: 0.5,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-full border border-[#E60000]/30"
                    />

                    <div className="w-16 h-16 bg-black border border-white/10 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                      {isAuthenticating ? (
                        <ScanFace className="w-8 h-8 text-[#E60000] animate-pulse" />
                      ) : (
                        <Fingerprint className="w-8 h-8 text-white/60" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-light tracking-widest uppercase">
                      Driver Identity
                    </h2>
                    <p className="text-white/40 text-sm font-mono">
                      Awaiting biometric verification...
                    </p>
                  </div>

                  <div className="pt-8 w-full space-y-4">
                    <Button
                      variant="default"
                      className="w-full py-4 text-xs"
                      onClick={handleSimulateAuth}
                      isLoading={isAuthenticating}
                    >
                      <Lock className="w-4 h-4" />
                      {isAuthenticating
                        ? "Authenticating..."
                        : "Authorize Access"}
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Area */}
        <div className="flex-none py-8 text-center opacity-40 text-[10px] uppercase tracking-[0.2em] font-mono flex flex-col items-center gap-2">
          <span>Secure Connection Established</span>
          <span className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
        </div>
      </div>
    </div>
  );
}
