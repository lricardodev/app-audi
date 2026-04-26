"use client";

import React from "react";
import { useVehicleStore } from "@/store/useVehicleStore";
import { GlassCard } from "@/components/ui/GlassCard";
import { CheckCircle2, ChevronLeft, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StatusPage() {
  const vehicle = useVehicleStore();

  return (
    <div className="pt-16 px-6 pb-32 animate-in fade-in duration-700">
      <div className="flex items-center mb-8 relative">
        <Link
          href="/conductor"
          className="absolute left-0 text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="w-full text-center">
          <h1 className="text-sm font-medium tracking-wide">
            Estado del vehículo
          </h1>
          <p className="text-[10px] text-white/50 mt-1">hace 4 min.</p>
        </div>
      </div>

      <div className="relative h-64 w-full mb-8 flex items-center justify-center">
        {/* Placeholder for top-down car image */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_60%)] opacity-50" />
        {/* Simulating top down with a rotated or different image, since we only have audilateral we just use a generic style block */}
        <div className="w-24 h-56 bg-gradient-to-b from-gray-800 to-black rounded-full border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] flex items-center justify-center relative">
          <div className="w-20 h-40 bg-black/50 rounded-full border border-white/5 absolute"></div>
          <div className="text-[10px] text-white/20 rotate-90 tracking-widest uppercase">
            Audi-R8
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <GlassCard className="p-4 bg-[#14231b]/50 border-emerald-500/20 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <span className="text-sm font-medium text-emerald-100/90">
            El vehículo está aparcado de forma segura
          </span>
        </GlassCard>

        <GlassCard className="p-5 bg-white/5 border-white/5 rounded-2xl">
          <div className="divide-y divide-white/10">
            <StatusRow
              label="Bloqueo"
              value={
                vehicle.status.areDoorsLocked ? "bloqueado" : "desbloqueado"
              }
              isOk={vehicle.status.areDoorsLocked}
            />
            <StatusRow label="Puertas" value="cerradas" isOk={true} />
            <StatusRow label="Ventanas" value="cerradas" isOk={true} />
            <StatusRow label="Capó" value="cerrado" isOk={true} />
            <StatusRow label="Maletero" value="cerrado" isOk={true} />
            <StatusRow label="Luz" value="apagada" isOk={true} />
            <div className="flex items-center justify-between py-3 pt-4 text-sm">
              <span className="text-white/60">Kilometraje</span>
              <span className="font-medium">11.540 km</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function StatusRow({
  label,
  value,
  isOk,
}: {
  label: string;
  value: string;
  isOk: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3 text-sm">
      <span className="text-white/60">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-medium text-white/90">{value}</span>
        {isOk && (
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
        )}
      </div>
    </div>
  );
}
