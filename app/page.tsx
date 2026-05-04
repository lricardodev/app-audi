"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  Fingerprint,
  ScanFace,
  Lock,
  Mail,
  Key,
  Hash,
  CarFront,
  ShieldCheck,
  MapPin,
  Bluetooth,
  Bell,
  Camera,
} from "lucide-react";

type AuthStep = "permissions" | "login" | "link" | "biometric" | "welcome";

export default function Home() {
  const router = useRouter();
  const [authStep, setAuthStep] = useState<AuthStep | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Iniciando sistemas...");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vin, setVin] = useState("");

  const [perms, setPerms] = useState({
    location: true,
    bluetooth: true,
    notifications: true,
    camera: true,
  });

  const togglePerm = (key: keyof typeof perms) => {
    setPerms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const hasOnboarded = localStorage.getItem("audi_demo_onboarded");
    if (hasOnboarded) {
      setAuthStep("biometric");
    } else {
      setAuthStep("permissions");
    }
  }, []);

  const messages = [
    "Sincronizando perfil...",
    "Preparando entorno de demostración...",
    "Conectando a la red Audi...",
    "Accediendo a la App Demo",
  ];

  const handlePermissionsSubmit = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthStep("login");
    }, 1500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthStep("link");
    }, 1500);
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthStep("biometric");
    }, 1500);
  };

  const handleSimulateBiometric = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthStep("welcome");

      // Cycle through messages
      messages.forEach((msg, index) => {
        setTimeout(
          () => {
            setLoadingMessage(msg);
          },
          (index + 1) * 1200,
        );
      });

      localStorage.setItem("audi_demo_onboarded", "true");

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

          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-7xl font-extrabold tracking-tighter uppercase mt-8 
                       bg-gradient-to-b from-white via-gray-200 to-gray-400 
                       text-transparent bg-clip-text
                       drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          >
            audi app
          </motion.h1>

          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent mt-6"></div>

          {/* <p className="text-white/50 text-xs tracking-[0.25em] uppercase mt-5 font-mono">
            Terminal de Enlace y Telemetría Avanzada
          </p> */}
        </motion.div>

        {/* Área de Contenido Principal */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {authStep === "permissions" && (
              <motion.div
                key="permissions"
                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard className="p-8 border-t border-l border-white/20 border-b border-r border-transparent backdrop-blur-3xl shadow-[0_0_40px_rgba(255,255,255,0.05)] bg-gradient-to-br from-white/5 via-black/40 to-black/80">
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-6">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="w-6 h-6 text-white/60" />
                      </div>
                      <h2 className="text-xl font-light tracking-widest uppercase bg-gradient-to-r from-white via-gray-300 to-gray-500 text-transparent bg-clip-text">
                        Permisos del Sistema
                      </h2>
                      <p className="text-white/40 text-xs font-mono">
                        Para la experiencia completa, Audi App requiere:
                      </p>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          id: "location",
                          icon: MapPin,
                          title: "Ubicación Precisa",
                          desc: "Para navegación y geocercas",
                        },
                        {
                          id: "bluetooth",
                          icon: Bluetooth,
                          title: "Bluetooth",
                          desc: "Para llave digital del vehículo",
                        },
                        {
                          id: "notifications",
                          icon: Bell,
                          title: "Notificaciones",
                          desc: "Alertas críticas de mantenimiento",
                        },
                        {
                          id: "camera",
                          icon: Camera,
                          title: "Cámara / Biometría",
                          desc: "Autenticación de alta seguridad",
                        },
                      ].map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-black/50 rounded-lg border border-white/5">
                              <p.icon className="w-4 h-4 text-white/70" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm text-white">{p.title}</p>
                              <p className="text-[10px] text-white/40 font-mono">
                                {p.desc}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => togglePerm(p.id as any)}
                            className={`relative w-10 h-6 rounded-full transition-colors duration-300 flex-shrink-0 ${perms[p.id as keyof typeof perms] ? "bg-emerald-500" : "bg-white/20"}`}
                          >
                            <motion.div
                              animate={{
                                x: perms[p.id as keyof typeof perms] ? 16 : 2,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                              className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <Button
                      type="button"
                      variant="default"
                      className="w-full py-4 text-xs mt-6"
                      isLoading={isAuthenticating}
                      onClick={handlePermissionsSubmit}
                    >
                      Otorgar Permisos y Continuar
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {authStep === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard className="p-8 border-t border-l border-white/20 border-b border-r border-transparent backdrop-blur-3xl shadow-[0_0_40px_rgba(255,255,255,0.05)] bg-gradient-to-br from-white/5 via-black/40 to-black/80">
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-8">
                      <h2 className="text-xl font-light tracking-widest uppercase bg-gradient-to-r from-white via-gray-300 to-gray-500 text-transparent bg-clip-text">
                        Iniciar Sesión
                      </h2>
                      <p className="text-white/40 text-xs font-mono">
                        Accede a tu cuenta de myAudi
                      </p>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-5">
                      <div className="space-y-4">
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                          <input
                            type="email"
                            required
                            placeholder="Correo Electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-mono"
                          />
                        </div>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                          <input
                            type="password"
                            required
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-mono"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        variant="default"
                        className="w-full py-4 text-xs mt-4"
                        isLoading={isAuthenticating}
                      >
                        Continuar
                      </Button>
                    </form>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {authStep === "link" && (
              <motion.div
                key="link"
                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard className="p-8 border-t border-l border-white/20 border-b border-r border-transparent backdrop-blur-3xl shadow-[0_0_40px_rgba(255,255,255,0.05)] bg-gradient-to-br from-white/5 via-black/40 to-black/80">
                  <div className="space-y-6 text-center">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CarFront className="w-8 h-8 text-white/60" />
                    </div>

                    <div className="space-y-2 mb-8">
                      <h2 className="text-xl font-light tracking-widest uppercase bg-gradient-to-r from-white via-gray-300 to-gray-500 text-transparent bg-clip-text">
                        Vincular Vehículo
                      </h2>
                      <p className="text-white/40 text-xs font-mono">
                        Ingresa el VIN de tu Audi para sincronizar la telemetría
                      </p>
                    </div>

                    <form
                      onSubmit={handleLinkSubmit}
                      className="space-y-5 text-left"
                    >
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="text"
                          required
                          placeholder="Número de Identificación Vehicular (VIN)"
                          value={vin}
                          onChange={(e) => setVin(e.target.value.toUpperCase())}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-mono uppercase"
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="default"
                        className="w-full py-4 text-xs mt-4"
                        isLoading={isAuthenticating}
                        onClick={() => {
                          if (!vin) setVin("WAUZZZGE2MA00000X");
                        }}
                      >
                        Usar Vehículo de Prueba (DEMO)
                      </Button>
                    </form>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {authStep === "biometric" && (
              <motion.div
                key="biometric"
                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
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
                        onClick={handleSimulateBiometric}
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
            )}

            {authStep === "welcome" && (
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

                <div className="text-center space-y-6 flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                  >
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-[0.2em] bg-gradient-to-b from-white via-gray-100 to-gray-500 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] uppercase mb-2">
                      Bienvenido
                    </h1>
                    <p className="text-emerald-400/80 text-[10px] font-mono tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                      Modo Demostración Activo
                    </p>
                  </motion.div>
                  <motion.p
                    key={loadingMessage}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.4 }}
                    className="text-white/80 text-xs font-mono tracking-[0.2em] uppercase bg-white/5 py-2 px-6 rounded-full border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]"
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
