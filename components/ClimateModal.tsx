import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVehicleStore } from "@/store/useVehicleStore";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { X, Fan, Power, ThermometerSun, Wind, Droplets } from "lucide-react";

interface ClimateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClimateModal({ isOpen, onClose }: ClimateModalProps) {
  const vehicle = useVehicleStore();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/60 backdrop-blur-sm p-4 pb-0 sm:pb-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-[430px] rounded-t-3xl sm:rounded-3xl bg-[#111111]/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 pb-2 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-white">Climatización</h3>
              <p className="text-sm text-white/50">Control de temperatura y zonas</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>

          <div className="p-6 pt-4 flex flex-col gap-6">
            {/* Power Toggle */}
            <div className="flex justify-center">
              <button
                onClick={vehicle.toggleClimate}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                  vehicle.status.climateEnabled
                    ? "bg-blue-500 text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] border border-blue-400/50"
                    : "bg-[#1a1a1a] text-white/40 border border-white/10"
                }`}
              >
                <Power className={`w-8 h-8 ${vehicle.status.climateEnabled ? "animate-pulse" : ""}`} />
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm font-medium text-white/60">
                {vehicle.status.climateEnabled ? "Sistema Encendido" : "Sistema Apagado"}
              </span>
            </div>

            {/* Temperature Dial Sim (Buttons for now) */}
            <GlassCard className="p-6 bg-white/5 border-white/5 flex flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-between w-full max-w-[200px]">
                <button 
                  className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-2xl font-light text-blue-400 transition-colors"
                  onClick={() => vehicle.setClimateTemp(Math.max(16, vehicle.status.climateTemp - 1))}
                  disabled={!vehicle.status.climateEnabled}
                >
                  -
                </button>
                <div className="flex flex-col items-center">
                  <span className={`text-5xl font-light tracking-tighter ${!vehicle.status.climateEnabled ? "text-white/20" : "text-white"}`}>
                    {vehicle.status.climateTemp}°
                  </span>
                </div>
                <button 
                  className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-2xl font-light text-red-400 transition-colors"
                  onClick={() => vehicle.setClimateTemp(Math.min(30, vehicle.status.climateTemp + 1))}
                  disabled={!vehicle.status.climateEnabled}
                >
                  +
                </button>
              </div>
            </GlassCard>

            {/* Quick Modes */}
            <div className="grid grid-cols-3 gap-3">
              <GlassCard className={`p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${vehicle.status.climateEnabled ? 'hover:bg-white/10' : 'opacity-50 pointer-events-none'}`}>
                <ThermometerSun className="w-5 h-5 text-amber-400" />
                <span className="text-[10px] text-white/70 uppercase">Desempañar</span>
              </GlassCard>
              <GlassCard className={`p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${vehicle.status.climateEnabled ? 'hover:bg-white/10' : 'opacity-50 pointer-events-none'}`}>
                <Wind className="w-5 h-5 text-blue-400" />
                <span className="text-[10px] text-white/70 uppercase">Max AC</span>
              </GlassCard>
              <GlassCard className={`p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${vehicle.status.climateEnabled ? 'hover:bg-white/10' : 'opacity-50 pointer-events-none'}`}>
                <Droplets className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] text-white/70 uppercase">Eco</span>
              </GlassCard>
            </div>

            <div className="h-4" /> {/* bottom padding */}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
