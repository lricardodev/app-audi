"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVehicleStore } from "@/store/useVehicleStore";
import { GlassCard } from "@/components/ui/GlassCard";
import dynamic from "next/dynamic";
const HereMap = dynamic(() => import("@/components/HereMap"), { ssr: false });
import { Navigation, ShieldAlert, Crosshair, MapPin, CalendarCheck, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function MapPage() {
  const { activeDestination, location } = useVehicleStore();

  // Centro del mapa: si hay destino activo, centrar en el concesionario
  const mapCenter = activeDestination
    ? activeDestination.location
    : location;

  return (
    <div className="relative w-full h-full min-h-screen bg-gradient-to-br from-[#1c2135] via-[#0b101d] to-[#020617] overflow-hidden animate-in fade-in duration-700">

      {/* ── Fondo de mapa real y simulado ── */}
      <div className="absolute inset-0 overflow-hidden">
        <HereMap theme="night" center={mapCenter} zoom={15} />
        {/* Grid base */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: `40px 40px`,
          }}
        />
        {/* Carreteras simuladas */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          preserveAspectRatio="none"
          viewBox="0 0 1000 1000"
        >
          <path
            d="M -100 200 C 300 400, 600 100, 1100 500"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]"
          />
          <path d="M 200 -100 C 250 300, 500 600, 400 1100" fill="none" stroke="#8a8a93" strokeWidth="3" />
          <path d="M -100 700 C 400 700, 600 400, 1100 300" fill="none" stroke="#8a8a93" strokeWidth="3" />
          <path d="M 700 -100 C 650 400, 800 700, 900 1100" fill="none" stroke="#8a8a93" strokeWidth="3" />

          {/* Ruta activa hacia concesionario */}
          {activeDestination && (
            <path
              d="M 480 420 C 550 350, 700 300, 850 250"
              fill="none"
              stroke="#10b981"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="12 6"
              className="drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]"
            />
          )}
        </svg>
      </div>
      <div className="absolute inset-0 bg-[#0b101d]/40 pointer-events-none" />

      {/* ── Geocerca ── */}
      {!activeDestination && (
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-dashed border-red-500/50 bg-red-500/5 flex items-center justify-center pointer-events-none">
          <div className="absolute top-4 bg-red-500/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            <ShieldAlert className="w-3 h-3" /> Perímetro de Seguridad
          </div>
        </div>
      )}

      {/* ── Marker del vehículo ── */}
      <div className="absolute top-[42%] left-[48%] flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-blue-500/20 absolute animate-ping" />
        <div className="w-12 h-12 rounded-full bg-blue-500/30 absolute animate-pulse" />
        <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.8)] relative z-10">
          <Navigation className="w-5 h-5 text-white transform rotate-45" fill="currentColor" />
        </div>
        <div className="mt-2 px-2 py-1 rounded-md bg-[#1c1c1e]/90 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white shadow-lg whitespace-nowrap z-10">
          Audi-R8
        </div>
      </div>

      {/* ── Marker del concesionario (destino activo) ── */}
      <AnimatePresence>
        {activeDestination && (
          <motion.div
            key="dealer-marker"
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute top-[28%] left-[72%] flex flex-col items-center z-20"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.8)]">
              <MapPin className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <div className="mt-1.5 px-2 py-1 rounded-md bg-emerald-900/90 backdrop-blur-md border border-emerald-500/30 text-[10px] font-medium text-emerald-300 shadow-lg whitespace-nowrap">
              {activeDestination.name}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Banner de destino activo (reemplaza o complementa el panel inferior) ── */}
      <AnimatePresence>
        {activeDestination && (
          <motion.div
            key="active-destination-banner"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 24, stiffness: 280, delay: 0.1 }}
            className="absolute bottom-32 left-0 right-0 px-4 z-20"
          >
            <div
              className="rounded-3xl border overflow-hidden p-4"
              style={{
                background: "rgba(16, 185, 129, 0.08)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderColor: "rgba(16, 185, 129, 0.25)",
              }}
            >
              {/* Top shimmer */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <CalendarCheck className="w-4.5 h-4.5 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider mb-0.5">
                    Cita confirmada · Navegando
                  </p>
                  <p className="text-[14px] font-semibold text-white truncate">
                    {activeDestination.name}
                  </p>
                  <p className="text-[11px] text-white/50 mt-0.5 truncate">
                    {activeDestination.scheduledSlot.timeLabel} · {activeDestination.scheduledSlot.durationMin} min
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Button
                  variant="glass"
                  className="h-10 px-4 text-xs bg-emerald-500/20 border-emerald-500/25 rounded-xl flex-1 justify-center gap-2 font-semibold text-emerald-300 hover:bg-emerald-500/30"
                >
                  <Navigation className="w-4 h-4" /> Iniciar navegación
                </Button>
                <Button
                  variant="glass"
                  className="h-10 px-3 text-xs bg-white/5 border-white/10 rounded-xl justify-center gap-1.5 font-medium text-white/50"
                >
                  <X className="w-4 h-4" /> Cancelar
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Panel inferior por defecto (sin destino activo) ── */}
      {!activeDestination && (
        <div className="absolute bottom-32 left-0 right-0 px-4 z-20">
          <GlassCard className="p-4 bg-[#1c1c1e]/90 border-white/10 rounded-2xl flex flex-col gap-3 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div>
                <h3 className="text-sm font-semibold text-white">Estado de Geolocalización</h3>
                <p className="text-xs text-white/50">Vehículo dentro del perímetro</p>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-green-400 font-medium">Conectado</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="glass" className="h-10 px-4 text-xs bg-white/10 border-white/10 rounded-xl flex-1 justify-center gap-2 font-medium">
                <Crosshair className="w-4 h-4" /> Centrar
              </Button>
              <Button variant="glass" className="h-10 px-4 text-xs bg-white/5 border-white/5 rounded-xl flex-1 justify-center gap-2 font-medium">
                <ShieldAlert className="w-4 h-4 text-red-400" /> Geocercas
              </Button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
