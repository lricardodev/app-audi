"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Search, Mic, BatteryCharging, ParkingCircle, Coffee } from "lucide-react";
import { Button } from "@/components/ui/Button";
import dynamic from "next/dynamic";

const HereMap = dynamic(() => import("@/components/HereMap"), { ssr: false });

export default function MapPage() {
  return (
    <div className="relative w-full h-full min-h-screen bg-[#0b101d] overflow-hidden animate-in fade-in duration-700">
      
      {/* Interactive Map Background */}
      <div className="absolute inset-0 opacity-80">
        <HereMap theme="night" />
      </div>
      <div className="absolute inset-0 bg-[#0b101d]/40 pointer-events-none"></div>

      {/* Mock Map Markers */}
      <div className="absolute top-[30%] left-[40%] flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-xs font-bold shadow-lg relative z-10">
          6
        </div>
        <div className="w-12 h-12 rounded-full bg-blue-500/20 absolute animate-ping"></div>
      </div>

      <div className="absolute top-[45%] left-[25%] flex flex-col items-center opacity-70">
        <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[10px] shadow-lg">
          34
        </div>
      </div>

      <div className="absolute top-[55%] left-[60%] flex flex-col items-center">
        <div className="px-2 py-1 rounded-full bg-emerald-500 border border-white flex items-center justify-center text-[10px] font-bold shadow-lg gap-1">
          <BatteryCharging className="w-3 h-3" /> 150 kW
        </div>
      </div>

      {/* Floating UI Bottom */}
      <div className="absolute bottom-32 left-0 right-0 px-4 space-y-3 z-20">
        <GlassCard className="p-3 bg-[#1c1c1e]/90 border-white/10 rounded-2xl flex items-center gap-3 shadow-2xl backdrop-blur-xl">
          <Search className="w-5 h-5 text-white/40" />
          <input 
            type="text" 
            placeholder="Buscar y Favoritos" 
            className="bg-transparent border-none outline-none flex-1 text-sm text-white placeholder:text-white/40"
          />
          <Mic className="w-5 h-5 text-white/40" />
        </GlassCard>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          <Button variant="glass" className="h-9 px-4 text-xs bg-white/10 border-white/10 rounded-xl flex-shrink-0 gap-2 font-normal">
            <BatteryCharging className="w-3.5 h-3.5" /> Cargar
          </Button>
          <Button variant="glass" className="h-9 px-4 text-xs bg-white/5 border-white/5 rounded-xl flex-shrink-0 gap-2 font-normal">
            <ParkingCircle className="w-3.5 h-3.5" /> Estacionar
          </Button>
          <Button variant="glass" className="h-9 px-4 text-xs bg-white/5 border-white/5 rounded-xl flex-shrink-0 gap-2 font-normal">
            <Coffee className="w-3.5 h-3.5" /> Área de descanso
          </Button>
        </div>
      </div>
      
    </div>
  );
}
