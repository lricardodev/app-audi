"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Navigation, ShieldAlert, Crosshair } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function MapPage() {
  return (
    <div className="relative w-full h-full min-h-screen bg-gradient-to-br from-[#1c2135] via-[#0b101d] to-[#020617] overflow-hidden animate-in fade-in duration-700">
      {/* Simulated Dark Map Background */}
      <div className="absolute inset-0 bg-transparent overflow-hidden">
        {/* Base Grid */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: `40px 40px`,
          }}
        />
        {/* Simulated Roads */}
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
          <path
            d="M 200 -100 C 250 300, 500 600, 400 1100"
            fill="none"
            stroke="#8a8a93"
            strokeWidth="3"
          />
          <path
            d="M -100 700 C 400 700, 600 400, 1100 300"
            fill="none"
            stroke="#8a8a93"
            strokeWidth="3"
          />
          <path
            d="M 700 -100 C 650 400, 800 700, 900 1100"
            fill="none"
            stroke="#8a8a93"
            strokeWidth="3"
          />
        </svg>
      </div>
      <div className="absolute inset-0 bg-[#0b101d]/40 pointer-events-none"></div>

      {/* Geofence Area (Geocerca) */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-dashed border-red-500/50 bg-red-500/5 flex items-center justify-center pointer-events-none">
        <div className="absolute top-4 bg-red-500/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
          <ShieldAlert className="w-3 h-3" /> Perímetro de Seguridad
        </div>
      </div>

      {/* Vehicle Location Marker */}
      <div className="absolute top-[42%] left-[48%] flex flex-col items-center">
        {/* Pulsing rings */}
        <div className="w-16 h-16 rounded-full bg-blue-500/20 absolute animate-ping"></div>
        <div className="w-12 h-12 rounded-full bg-blue-500/30 absolute animate-pulse"></div>

        {/* Central Vehicle Pin */}
        <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.8)] relative z-10">
          <Navigation
            className="w-5 h-5 text-white transform rotate-45"
            fill="currentColor"
          />
        </div>

        {/* Status Tag */}
        <div className="mt-2 px-2 py-1 rounded-md bg-[#1c1c1e]/90 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white shadow-lg whitespace-nowrap z-10">
          Audi-R8
        </div>
      </div>

      {/* Floating UI Bottom */}
      <div className="absolute bottom-32 left-0 right-0 px-4 space-y-3 z-20">
        <GlassCard className="p-4 bg-[#1c1c1e]/90 border-white/10 rounded-2xl flex flex-col gap-3 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Estado de Geolocalización
              </h3>
              <p className="text-xs text-white/50">
                Vehículo dentro del perímetro
              </p>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] text-green-400 font-medium">
                Conectado
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <Button
              variant="glass"
              className="h-10 px-4 text-xs bg-white/10 border-white/10 rounded-xl flex-1 justify-center gap-2 font-medium"
            >
              <Crosshair className="w-4 h-4" /> Centrar
            </Button>
            <Button
              variant="glass"
              className="h-10 px-4 text-xs bg-white/5 border-white/5 rounded-xl flex-1 justify-center gap-2 font-medium"
            >
              <ShieldAlert className="w-4 h-4 text-red-400" /> Geocercas
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
