"use client";

import React from "react";
import { useVehicleStore } from "@/store/useVehicleStore";
import { GlassCard } from "@/components/ui/GlassCard";
import { Lock, Unlock, ChevronRight, RefreshCw, Fan } from "lucide-react";
import Image from "next/image";

export default function ConductorControl() {
  const vehicle = useVehicleStore();

  return (
    <div className="pt-16 px-6 pb-32 animate-in fade-in duration-700">
      <div className="text-center mb-10">
        <h1 className="text-xl font-medium tracking-wide">
          Control total sobre
          <br />
          su Audi
        </h1>
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-1">
            A6 e-tron <ChevronRight className="w-5 h-5 opacity-50" />
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-white/50 mt-1">
            <RefreshCw className="w-3 h-3" /> justo ahora
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
          <Image
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
            width={32}
            height={32}
            alt="Profile"
          />
        </div>
      </div>

      <div className="relative h-48 w-full mb-8 flex items-center justify-center">
        {/* Placeholder for the car front image */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_60%)] opacity-50" />
        <Image
          src="/audilateral.png"
          alt="Audi"
          fill
          className="object-cover drop-shadow-2xl scale-[1.3] translate-y-4"
        />
        {/* Mock charging pillar */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-24 bg-gradient-to-b from-[#2a2a2a] to-black rounded-sm border border-white/10 flex flex-col items-center py-2 z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)] animate-pulse" />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-end justify-between mb-2">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-light tracking-tighter">344</span>
              <span className="text-lg text-white/60">km</span>
            </div>
            <span className="text-sm font-medium">
              {vehicle.health.batteryLevel}%
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-300 h-1 rounded-full transition-all duration-1000"
              style={{ width: `${vehicle.health.batteryLevel}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-white/50 mt-3 font-medium">
            Quedan 50 min. hasta el 95%
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          {/* Lock / Unlock buttons */}
          <GlassCard className="col-span-2 p-1 flex bg-white/5 border-white/5 rounded-2xl">
            <button
              onClick={vehicle.toggleDoors}
              disabled={vehicle.isTogglingDoors}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all text-sm font-medium ${vehicle.status.areDoorsLocked ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
            >
              <Lock className="w-4 h-4" /> Bloquear
            </button>
            <button
              onClick={vehicle.toggleDoors}
              disabled={vehicle.isTogglingDoors}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all text-sm font-medium ${!vehicle.status.areDoorsLocked ? "bg-white/10 text-white shadow-lg" : "text-white/40 hover:text-white"}`}
            >
              <Unlock className="w-4 h-4" /> Desbloqueado
            </button>
          </GlassCard>

          {/* Charging Status */}
          <GlassCard className="col-span-1 p-5 bg-white/5 border-white/5 rounded-2xl flex flex-col justify-between aspect-[4/3]">
            <span className="text-sm font-medium text-white/70">Cargando</span>
            <div>
              <div className="text-[28px] font-light tracking-tight mb-1">
                {vehicle.health.batteryLevel}{" "}
                <span className="text-lg text-white/60">%</span>
              </div>
              <div className="text-[10px] text-white/50 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Cargando, 50 min.
              </div>
            </div>
          </GlassCard>

          {/* Climate */}
          <GlassCard
            className="col-span-1 p-5 bg-white/5 border-white/5 rounded-2xl flex flex-col justify-between aspect-[4/3] cursor-pointer hover:bg-white/10 transition-colors"
            onClick={vehicle.toggleClimate}
          >
            <span className="text-sm font-medium text-white/70">
              Climatización
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[28px] font-light tracking-tight">
                {vehicle.status.climateTemp}°C
              </span>
              <Fan
                className={`w-6 h-6 ${vehicle.status.climateEnabled ? "text-blue-400 animate-[spin_2s_linear_infinite]" : "text-white/20"}`}
              />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
