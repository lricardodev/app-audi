"use client";

import React from "react";
import { useVehicleStore } from "@/store/useVehicleStore";
import { GlassCard } from "@/components/ui/GlassCard";
import PredictiveMaintenanceAlert from "@/components/PredictiveMaintenanceAlert";
import {
  Lock,
  Unlock,
  ChevronRight,
  RefreshCw,
  Fan,
  PlugZap,
  Car as CarIcon,
} from "lucide-react";
import Image from "next/image";

export default function ConductorControl() {
  const vehicle = useVehicleStore();

  return (
    <div className="pb-32 animate-in fade-in duration-700">
      {/* ── Alerta de Mantenimiento Predictivo ── */}
      <PredictiveMaintenanceAlert />

      {/* ── Contenido principal ── */}
      <div className="pt-6 px-6">
      {/* Header section */}
      <div className="flex justify-between items-start mb-8 animate-slide-up-fade [animation-delay:100ms]">
        <div>
          <h2 className="text-[28px] font-semibold flex items-center gap-1 tracking-tight">
            Audi-R8
            <ChevronRight className="w-5 h-5 text-white/50 mt-1" />
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-white/40 mt-0.5">
            <RefreshCw className="w-3 h-3" /> justo ahora
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/10">
          <Image src="/profile.png" width={40} height={40} alt="Profile" />
        </div>
      </div>

      {/* Car Display Section */}
      <div className="relative h-56 w-full mb-8 flex items-center justify-center mt-2 animate-slide-up-fade [animation-delay:200ms]">
        {/* Glowing ellipse line */}
        <div className="absolute bottom-6 w-[85%] h-[50px] rounded-[100%] border-b-[2px] border-r-[1px] border-emerald-400/80 shadow-[0_15px_30px_rgba(52,211,153,0.3)] transform -rotate-2"></div>

        {/* Car Image */}
        <div className="absolute inset-0 z-10 animate-float pointer-events-none">
          <Image
            src="/audir8.png"
            alt="Audi"
            fill
            className="object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.7)] scale-[1.15] translate-y-2 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
          />
        </div>

        {/* Charge point connection */}
        <div className="absolute right-4 bottom-8 w-16 h-16 z-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-emerald-400/20 scale-[1.5] animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border border-emerald-400/40 scale-[1.0]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)]"></div>
        </div>
      </div>

      {/* Range and Battery */}
      <div className="mb-8 px-1 animate-slide-up-fade [animation-delay:300ms]">
        <div className="flex items-end justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-[64px] font-light tracking-tighter leading-none">
              344
            </span>
            <div className="flex flex-col items-center mb-2">
              <CarIcon className="w-5 h-5 text-white/40 mb-0.5" />
              <span className="text-xl text-white/50 leading-none">km</span>
            </div>
          </div>
          <span className="text-xl font-medium text-white/90 mb-2">
            {vehicle.health.batteryLevel}%
          </span>
        </div>

        <div className="relative w-full h-1.5 bg-white/10 rounded-full mb-4">
          <div
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
            style={{ width: `${vehicle.health.batteryLevel}%` }}
          >
            {/* Glowing Thumb */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.8)] border-2 border-white translate-x-1/2" />
          </div>
        </div>
        <p className="text-[13px] text-white/40 font-medium">
          Quedan 50 min. hasta el 95%
        </p>
      </div>

      {/* Control Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Left Column */}
        <div className="flex flex-col gap-3">
          {/* Charging Status */}
          <GlassCard className="p-4 bg-white/5 border-white/5 rounded-[20px] flex flex-col justify-between aspect-[4/3.5] animate-slide-up-fade [animation-delay:400ms]">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-white/80">
                Cargando
              </span>
              <PlugZap className="w-6 h-6 text-white/30" />
            </div>
            <div>
              <div className="text-[32px] font-light tracking-tight mb-1">
                {vehicle.health.batteryLevel}{" "}
                <span className="text-xl text-white/50">%</span>
              </div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]" />
                Cargando, 50 min.
              </div>
            </div>
          </GlassCard>

          {/* Climate */}
          <GlassCard
            className="p-4 bg-white/5 border-white/5 rounded-[20px] flex flex-col justify-between aspect-[4/3.5] cursor-pointer hover:bg-white/10 transition-colors animate-slide-up-fade [animation-delay:500ms]"
            onClick={vehicle.toggleClimate}
          >
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-white/80">
                Climatización
              </span>
              <Fan
                className={`w-5 h-5 ${vehicle.status.climateEnabled ? "text-white animate-[spin_2s_linear_infinite]" : "text-white/30"}`}
              />
            </div>
            <div>
              <div className="text-[32px] font-light tracking-tight mb-1">
                {vehicle.status.climateTemp}°C
              </div>
              <div className="text-[11px] text-white/40 font-medium">
                Auto o Enfrascado
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-3">
          {/* Central Controls */}
          <GlassCard className="p-4 bg-white/5 border-white/5 rounded-[20px] flex flex-col items-center flex-1 py-5 animate-slide-up-fade [animation-delay:450ms]">
            <span className="text-sm font-medium text-white/80 mb-6 self-center w-full text-center">
              Controles Centrales
            </span>

            {/* Big Lock Button */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 p-[1.5px] mb-4 shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#111111] flex items-center justify-center border border-black/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
                {vehicle.status.areDoorsLocked ? (
                  <Lock className="w-8 h-8 text-white drop-shadow-md" />
                ) : (
                  <Unlock className="w-8 h-8 text-white drop-shadow-md" />
                )}
              </div>
            </div>

            <span className="text-sm text-white/70 mb-5 font-medium">
              {vehicle.status.areDoorsLocked ? "Bloqueado" : "Desbloqueado"}
            </span>

            <button
              onClick={vehicle.toggleDoors}
              disabled={vehicle.isTogglingDoors}
              className="w-full py-3 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors text-[13px] font-medium border border-white/5 text-white/90"
            >
              {vehicle.status.areDoorsLocked ? "Desbloquear" : "Bloquear"}
            </button>
          </GlassCard>

          {/* Location */}
          <GlassCard className="p-4 bg-white/5 border-white/5 rounded-[20px] flex justify-between items-center relative overflow-hidden h-[76px] animate-slide-up-fade [animation-delay:550ms]">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center [mask-image:linear-gradient(to_right,transparent,black_50%)]"></div>
            <div className="relative z-10 flex flex-col justify-center">
              <span className="text-sm font-medium text-white/80 mb-0.5">
                Ubicación
              </span>
              <span className="text-[11px] text-white/40">Ir al vehículo</span>
            </div>
            <div className="relative z-10 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 mr-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
            </div>
          </GlassCard>
        </div>
      </div>
      </div>{/* cierre .pt-6.px-6 */}
    </div>
  );
}
