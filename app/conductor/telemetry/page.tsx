"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useVehicleStore } from "@/store/useVehicleStore";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Activity,
  Battery,
  GaugeCircle,
  Thermometer,
  Disc,
  AlertTriangle,
  Info,
  Clock
} from "lucide-react";
import Image from "next/image";

export default function TelemetryPage() {
  const vehicle = useVehicleStore();
  const { tirePressure, batteryLevel, oilLife } = vehicle.health;
  const { brakePadLevel } = vehicle.physicalHealth;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="pb-32 px-6 pt-12 min-h-screen overflow-y-auto overflow-x-hidden">
      <motion.div initial="hidden" animate="show" variants={containerVariants}>
        <motion.h2 
          variants={itemVariants}
          className="text-[28px] font-semibold mb-6 tracking-tight flex items-center gap-2"
        >
          <Activity className="w-7 h-7 text-emerald-400" />
          Telemetría
        </motion.h2>

        {/* Tire Pressure Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white/80">Presión de Llantas</h3>
            <span className="text-xs text-white/40">Óptimo: 35 PSI</span>
          </div>
          
          <div className="relative w-full aspect-[4/3] rounded-2xl border border-white/5 bg-[#111111]/50 flex items-center justify-center mb-4 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.05)_0%,transparent_70%)]" />
            
            {/* Frontal Car Image (Placeholder for wireframe) */}
            <div className="relative w-24 h-48 opacity-60">
              <div className="absolute inset-0 border-2 border-white/20 rounded-t-full rounded-b-[40px]" />
              <div className="absolute top-[25%] left-2 right-2 h-10 border border-white/10 rounded-sm" />
            </div>

            {/* FL */}
            <div className="absolute top-[20%] left-[15%]">
              <GlassCard className="px-3 py-2 flex flex-col items-center bg-[#1a1a1a]/80 backdrop-blur-md">
                <span className="text-[10px] text-white/50 mb-0.5">Frontal Izq</span>
                <span className={`text-lg font-light ${tirePressure.fl < 32 ? 'text-amber-400' : 'text-white'}`}>{tirePressure.fl} <span className="text-[10px]">PSI</span></span>
              </GlassCard>
            </div>
            {/* FR */}
            <div className="absolute top-[20%] right-[15%]">
              <GlassCard className="px-3 py-2 flex flex-col items-center bg-[#1a1a1a]/80 backdrop-blur-md">
                <span className="text-[10px] text-white/50 mb-0.5">Frontal Der</span>
                <span className={`text-lg font-light ${tirePressure.fr < 32 ? 'text-amber-400' : 'text-white'}`}>{tirePressure.fr} <span className="text-[10px]">PSI</span></span>
              </GlassCard>
            </div>
            {/* RL */}
            <div className="absolute bottom-[20%] left-[15%]">
              <GlassCard className="px-3 py-2 flex flex-col items-center bg-[#1a1a1a]/80 backdrop-blur-md">
                <span className="text-[10px] text-white/50 mb-0.5">Trasera Izq</span>
                <span className={`text-lg font-light ${tirePressure.rl < 32 ? 'text-amber-400' : 'text-white'}`}>{tirePressure.rl} <span className="text-[10px]">PSI</span></span>
              </GlassCard>
            </div>
            {/* RR */}
            <div className="absolute bottom-[20%] right-[15%]">
              <GlassCard className="px-3 py-2 flex flex-col items-center bg-[#1a1a1a]/80 backdrop-blur-md">
                <span className="text-[10px] text-white/50 mb-0.5">Trasera Der</span>
                <span className={`text-lg font-light ${tirePressure.rr < 32 ? 'text-amber-400' : 'text-white'}`}>{tirePressure.rr} <span className="text-[10px]">PSI</span></span>
              </GlassCard>
            </div>
          </div>
        </motion.div>

        {/* Health Metrics */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-8">
          <GlassCard className="p-4 bg-white/5 border-white/5 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Battery className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] text-emerald-400 font-medium">Óptimo</span>
            </div>
            <div>
              <div className="text-2xl font-light">{batteryLevel}%</div>
              <div className="text-[11px] text-white/40">Salud de Batería</div>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full mt-1">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${batteryLevel}%` }} />
            </div>
          </GlassCard>

          <GlassCard className="p-4 bg-white/5 border-white/5 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Thermometer className="w-5 h-5 text-blue-400" />
              <span className="text-[10px] text-blue-400 font-medium">Bueno</span>
            </div>
            <div>
              <div className="text-2xl font-light">{oilLife}%</div>
              <div className="text-[11px] text-white/40">Vida del Aceite</div>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full mt-1">
              <div className="h-full bg-blue-400 rounded-full" style={{ width: `${oilLife}%` }} />
            </div>
          </GlassCard>

          <GlassCard className="p-4 bg-white/5 border-white/5 flex flex-col gap-2 col-span-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Disc className="w-5 h-5 text-red-400" />
                <span className="text-sm text-white/80">Pastillas de Freno</span>
              </div>
              <span className="text-[10px] text-red-400 font-medium px-2 py-0.5 bg-red-400/10 rounded-full border border-red-400/20">Crítico</span>
            </div>
            <div className="flex items-end gap-3 mt-1">
              <div className="text-3xl font-light text-red-400">{brakePadLevel}%</div>
              <div className="text-xs text-white/40 mb-1">Reemplazo recomendado inmediatamente</div>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-red-500 rounded-full animate-pulse" style={{ width: `${brakePadLevel}%` }} />
            </div>
          </GlassCard>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={itemVariants}>
          <h3 className="text-sm font-medium text-white/80 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-white/50" />
            Registro de Actividad
          </h3>
          <div className="flex flex-col gap-3">
            {vehicle.telemetry.alerts.map((alert) => (
              <GlassCard key={alert.id} className="p-3 bg-white/5 border-white/5 flex items-start gap-3">
                <div className={`mt-0.5 p-1.5 rounded-full ${
                  alert.level === 'info' ? 'bg-blue-500/20 text-blue-400' :
                  alert.level === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {alert.level === 'info' ? <Info className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-white/90 leading-tight">{alert.message}</p>
                  <p className="text-[10px] text-white/40 mt-1">
                    {new Date(alert.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
