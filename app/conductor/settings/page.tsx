"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { Settings, User, Bell, Shield, Car as CarIcon, LogOut, MapPin, Bluetooth, Camera, Mail, Hash } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const [perms, setPerms] = useState({
    location: true,
    bluetooth: true,
    notifications: true,
    camera: true,
  });

  const [vin, setVin] = useState("WAUZZZGE2MA00000X");
  const [email, setEmail] = useState("demo@audi.com");

  const togglePerm = (key: keyof typeof perms) => {
    setPerms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResetDemo = () => {
    localStorage.removeItem("audi_demo_onboarded");
    router.push("/");
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) setExpandedSection(null);
    else setExpandedSection(section);
  };

  return (
    <div className="pb-32 px-6 pt-12 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[28px] font-semibold tracking-tight flex items-center gap-2">
          <Settings className="w-7 h-7 text-white/80" />
          Ajustes
        </h2>
        <button 
          onClick={handleResetDemo}
          className="text-xs flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors bg-white/5 px-3 py-1.5 rounded-full"
        >
          <LogOut className="w-3 h-3" />
          Cerrar Sesión
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {/* Perfil del Conductor */}
        <GlassCard className="flex flex-col border-white/5 bg-white/5 overflow-hidden transition-all">
          <div 
            onClick={() => toggleSection("profile")}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <User className="w-5 h-5 text-white/80" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Perfil del Conductor (Sesión)</h3>
                <p className="text-xs text-white/50">Gestionar cuenta myAudi</p>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {expandedSection === "profile" && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4 pt-2 border-t border-white/10"
              >
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all font-mono"
                    />
                  </div>
                  <Button variant="default" className="w-full text-xs">Actualizar Cuenta</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

        {/* Vehículo Vinculado */}
        <GlassCard className="flex flex-col border-white/5 bg-white/5 overflow-hidden transition-all">
          <div 
            onClick={() => toggleSection("vehicle")}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CarIcon className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Vehículo Vinculado</h3>
                <p className="text-xs text-white/50">Configurar VIN y preferencias</p>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {expandedSection === "vehicle" && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4 pt-2 border-t border-white/10"
              >
                <div className="space-y-4">
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      value={vin}
                      onChange={(e) => setVin(e.target.value.toUpperCase())}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all font-mono uppercase"
                    />
                  </div>
                  <Button variant="default" className="w-full text-xs">Sincronizar Vehículo</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

        {/* Permisos y Seguridad */}
        <GlassCard className="flex flex-col border-white/5 bg-white/5 overflow-hidden transition-all">
          <div 
            onClick={() => toggleSection("security")}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Permisos del Sistema</h3>
                <p className="text-xs text-white/50">Ubicación, notificaciones y biometría</p>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {expandedSection === "security" && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4 pt-2 border-t border-white/10"
              >
                <div className="space-y-3 mt-2">
                  {[
                    { id: 'location', icon: MapPin, title: 'Ubicación Precisa' },
                    { id: 'bluetooth', icon: Bluetooth, title: 'Bluetooth (Llave Digital)' },
                    { id: 'notifications', icon: Bell, title: 'Notificaciones Push' },
                    { id: 'camera', icon: Camera, title: 'Cámara / Biometría' },
                  ].map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                      <div className="flex items-center gap-3">
                        <p.icon className="w-4 h-4 text-white/60" />
                        <span className="text-sm text-white/80">{p.title}</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); togglePerm(p.id as any); }}
                        className={`relative w-10 h-6 rounded-full transition-colors duration-300 flex-shrink-0 ${perms[p.id as keyof typeof perms] ? 'bg-emerald-500' : 'bg-white/20'}`}
                      >
                        <motion.div
                          animate={{ x: perms[p.id as keyof typeof perms] ? 16 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

      </div>
    </div>
  );
}
