"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PhoneCall, Calendar, Activity, Radio, AlertCircle, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useVehicleStore } from "@/store/useVehicleStore";

export default function AssistantPage() {
  const { openScheduleModal } = useVehicleStore();
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const sequence = [
      "Iniciando enlace seguro con Audi Center...",
      "Sincronizando telemetría del motor y sensores.",
      "Escaneo de subsistemas: 100% completado.",
      "Lectura: Presión baja en neumático TR (28 PSI).",
      "Reporte enviado. Asistente técnico notificado."
    ];
    
    sequence.forEach((text, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, text]);
      }, (i + 1) * 1500);
    });
  }, []);

  return (
    <div className="pt-20 px-6 pb-32 min-h-screen bg-gradient-to-br from-[#111318] via-[#050505] to-black flex flex-col animate-in fade-in duration-700">
      
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-wide flex items-center gap-2">
            <Radio className="w-6 h-6 text-emerald-400" />
            Service Link
          </h1>
          <p className="text-[10px] text-white/50 font-mono mt-1 uppercase tracking-widest">
            Conexión Telemétrica Activa
          </p>
        </div>
        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">En Línea</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {/* Radar / Status Card */}
        <GlassCard className="p-6 border-white/10 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden flex flex-col items-center justify-center min-h-[180px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.05)_0%,transparent_70%)]" />
          
          <div className="relative w-24 h-24 flex items-center justify-center mb-6">
             <motion.div
                animate={{ scale: [1, 2, 2.5], opacity: [0.6, 0.2, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
                className="absolute inset-0 border border-emerald-500/50 rounded-full"
             />
             <motion.div
                animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 0.6, ease: "easeOut" }}
                className="absolute inset-0 border border-emerald-400/50 rounded-full"
             />
             <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center backdrop-blur-md border border-emerald-500/30 z-10">
               <Activity className="w-5 h-5 text-emerald-400" />
             </div>
          </div>
          
          <h3 className="text-sm font-medium text-emerald-400 z-10">Transmitiendo Datos</h3>
          <p className="text-[10px] text-white/50 font-mono mt-1 z-10 text-center">
            Destino: Audi Center Sur<br/>
            VIN: WAUZZZGE2MA00000X
          </p>
        </GlassCard>

        {/* Console / Logs */}
        <GlassCard className="p-5 border-white/10 bg-[#0a0a0a]/80 font-mono text-[10px] flex-1 min-h-[220px] shadow-inner relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
            <span className="text-white/40 uppercase tracking-widest flex items-center gap-2">
              <Wrench className="w-3 h-3" /> Registro de Diagnóstico
            </span>
          </div>
          
          <div className="space-y-3">
            {logs.map((log, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3 items-start text-white/70"
              >
                <span className="text-emerald-400/50 shrink-0 mt-[1px]">{`[${String(index + 1).padStart(2, '0')}]`}</span>
                <span className={log.includes("baja") || log.includes("anomalía") ? "text-amber-300" : ""}>
                  {log}
                </span>
              </motion.div>
            ))}
            {logs.length < 5 && (
              <div className="flex gap-3 items-center text-white/30 animate-pulse mt-2">
                <span>{`[${String(logs.length + 1).padStart(2, '0')}]`}</span>
                <span className="w-2 h-4 bg-emerald-400/50 inline-block animate-[blink_1s_step-end_infinite]" />
              </div>
            )}
          </div>
        </GlassCard>

        {/* Action Buttons */}
        <div className="mt-2 grid grid-cols-2 gap-3">
          <Button variant="default" className="py-4 flex-col gap-2 h-auto bg-white text-black hover:bg-gray-200">
            <PhoneCall className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Llamar Agencia</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={openScheduleModal}
            className="py-4 flex-col gap-2 h-auto border-white/10 bg-white/5 hover:bg-white/10"
          >
            <Calendar className="w-5 h-5 text-white/70" />
            <span className="text-[10px] uppercase tracking-widest text-white/70">Agendar Cita</span>
          </Button>
        </div>
        
        <GlassCard className="p-3 border-amber-500/20 bg-amber-500/5 flex items-start gap-3 mt-2">
           <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
           <p className="text-[10px] text-amber-500/80 leading-relaxed font-mono">
             Se recomienda una revisión preventiva de la presión de los neumáticos. Un asesor técnico ya tiene su reporte.
           </p>
        </GlassCard>

      </div>
    </div>
  );
}
