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
  const [showWelcome, setShowWelcome] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Iniciando sistemas...");

  const messages = [
    "Sincronizando perfil...",
    "Calibrando sensores...",
    "Conectando a la red Audi...",
    "Acceso concedido",
  ];

  const handleSimulateAuth = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setShowWelcome(true);

      // Cycle through messages
      messages.forEach((msg, index) => {
        setTimeout(
          () => {
            setLoadingMessage(msg);
          },
          (index + 1) * 1200,
        );
      });

      setTimeout(() => {
        router.push(`/conductor`);
      }, 6000);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111318] via-[#050505] to-black flex flex-col items-center justify-center relative overflow-hidden text-white font-sans selection:bg-white/20 selection:text-white">
      {/* Imagen de Fondo Cinemática */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <Image
          src="/audifrontal.png"
          alt="Fondo de Audi"
          fill
          className="object-cover opacity-50 mix-blend-luminosity scale-110 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="w-full max-w-lg z-10 p-6 flex flex-col min-h-screen">
        {/* Área del Logo / Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex-none pt-12 pb-8 flex flex-col items-center justify-center space-y-4"
        >
          <div className="relative w-48 h-16">
            <Image
              src="/logo.png"
              alt="Audi Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="h-[1px] w-12 bg-white/20 mt-2"></div>
          <p className="text-white/50 text-xs tracking-widest uppercase mt-4">
            Interfaz de Telemetría y Control
          </p>
        </motion.div>

        {/* Área de Contenido Principal */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!showWelcome ? (
              <motion.div
                key="mfa"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard className="p-10 border-t border-l border-white/20 border-b border-r border-transparent backdrop-blur-3xl shadow-[0_0_40px_rgba(255,255,255,0.05)] bg-gradient-to-br from-white/5 via-black/40 to-black/80">
                  <div className="space-y-8 text-center flex flex-col items-center">
                    <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                      {/* Anillos de animación de escaneo */}
                      <motion.div
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.3, 0, 0.3],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-full border border-white/20"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0, 0.1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          delay: 1.5,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-full border border-white/10"
                      />

                      <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center z-10 shadow-inner rounded-full backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.2)_0%,rgba(0,0,0,0)_70%)]"></div>
                        <div className="relative z-10">
                          {isAuthenticating ? (
                            <ScanFace
                              className="w-8 h-8 text-white animate-pulse"
                              style={{
                                filter:
                                  "drop-shadow(0 0 8px rgba(255,255,255,0.8))",
                              }}
                            />
                          ) : (
                            <Fingerprint className="w-8 h-8 text-white/40" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl font-light tracking-widest uppercase bg-gradient-to-r from-white via-gray-300 to-gray-500 text-transparent bg-clip-text">
                        Identidad del Conductor
                      </h2>
                      <p className="text-white/40 text-sm font-mono">
                        Esperando verificación biométrica...
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
                          ? "Autenticando..."
                          : "Autorizar Acceso"}
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center space-y-12"
              >
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                    className="absolute inset-0 rounded-full border-t border-l border-white/40"
                  />
                  <div className="relative w-24 h-8">
                    <Image
                      src="/logo.png"
                      alt="Audi Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-3xl font-light tracking-widest bg-gradient-to-r from-white via-gray-300 to-gray-500 text-transparent bg-clip-text"
                  >
                    BIENVENIDO
                  </motion.h1>
                  <motion.p
                    key={loadingMessage}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.4 }}
                    className="text-white/50 text-[10px] font-mono tracking-[0.2em] uppercase"
                  >
                    {loadingMessage}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Área del Pie de Página */}
        <div className="flex-none py-8 text-center opacity-40 text-[10px] uppercase tracking-[0.2em] font-mono flex flex-col items-center gap-2">
          <span>Conexión Segura Establecida</span>
          <span className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
        </div>
      </div>
    </div>
  );
}
