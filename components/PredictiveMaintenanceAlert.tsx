"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVehicleStore } from "@/store/useVehicleStore";
import {
  AlertTriangle,
  ShieldAlert,
  X,
  Calendar,
  ChevronRight,
} from "lucide-react";

// ─── Variantes de animación ───────────────────
const alertVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.97,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      damping: 22,
      stiffness: 260,
      duration: 0.45,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.95,
    filter: "blur(4px)",
    transition: { duration: 0.28, ease: "easeIn" as const },
  },
};

// ─── Sub-componente: ícono por severidad ───────
function SeverityIcon({ severity }: { severity: "warning" | "critical" }) {
  if (severity === "critical") {
    return (
      <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/30 flex-shrink-0">
        <ShieldAlert className="w-5 h-5 text-red-400" />
        {/* Glow animado */}
        <span className="absolute inset-0 rounded-2xl animate-ping bg-red-500/10" />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-2xl bg-amber-400/15 border border-amber-400/25 flex items-center justify-center flex-shrink-0">
      <AlertTriangle className="w-5 h-5 text-amber-400" />
    </div>
  );
}

// ─── Barra de progreso del componente ─────────
function ComponentBar({
  value,
  severity,
}: {
  value: number;
  severity: "warning" | "critical";
}) {
  const colorClass =
    severity === "critical"
      ? "from-red-500 to-red-400"
      : "from-amber-500 to-amber-400";

  return (
    <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className={`absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r ${colorClass}`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(value, 100)}%` }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── Componente principal ─────────────────────
export default function PredictiveMaintenanceAlert() {
  const { requiresService, serviceAlert, dismissServiceAlert, openScheduleModal } =
    useVehicleStore();

  const isCritical = serviceAlert?.severity === "critical";

  return (
    <>
      {/* ── Alerta flotante ── */}
      <AnimatePresence>
        {requiresService && serviceAlert && (
          <motion.div
            key={`alert-${serviceAlert.id}`}
            variants={alertVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            // Glassmorphism base — TW4 compatible
            className="mx-4 mt-4 rounded-3xl border overflow-hidden"
            style={{
              background:
                isCritical
                  ? "rgba(220, 38, 38, 0.08)"
                  : "rgba(245, 158, 11, 0.07)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderColor: isCritical
                ? "rgba(239, 68, 68, 0.25)"
                : "rgba(245, 158, 11, 0.22)",
            }}
          >
            {/* Subtle top shimmer */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: isCritical
                  ? "linear-gradient(90deg, transparent, rgba(239,68,68,0.5), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)",
              }}
            />

            <div className="relative p-4">
              {/* ── Header row ── */}
              <div className="flex items-start gap-3">
                <SeverityIcon severity={serviceAlert.severity} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest ${
                        isCritical ? "text-red-400" : "text-amber-400"
                      }`}
                    >
                      {isCritical ? "Crítico" : "Advertencia"}
                    </span>
                  </div>
                  <p className="text-[13px] font-semibold text-white leading-snug">
                    {serviceAlert.message}
                  </p>
                </div>

                {/* Dismiss */}
                <button
                  onClick={dismissServiceAlert}
                  aria-label="Descartar alerta"
                  className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors flex-shrink-0 mt-0.5"
                >
                  <X className="w-3.5 h-3.5 text-white/60" />
                </button>
              </div>

              {/* ── Barra de progreso del componente ── */}
              <div className="mt-3 mb-1 px-0.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-white/50">{serviceAlert.component}</span>
                  <span
                    className={`text-[11px] font-bold tabular-nums ${
                      isCritical ? "text-red-400" : "text-amber-400"
                    }`}
                  >
                    {serviceAlert.currentValue}
                    {serviceAlert.unit}
                  </span>
                </div>
                <ComponentBar
                  value={Number(serviceAlert.currentValue)}
                  severity={serviceAlert.severity}
                />
              </div>

              {/* ── CTA ── */}
              <div className="flex items-center gap-2 mt-3.5">
                {/* Botón primario — "Agendar revisión" */}
                <button
                  id="btn-agendar-revision"
                  onClick={openScheduleModal}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-[12px] font-semibold transition-all duration-200 active:scale-[0.97] ${
                    isCritical
                      ? "bg-red-500 hover:bg-red-400 text-white shadow-[0_4px_16px_rgba(239,68,68,0.35)]"
                      : "bg-amber-500 hover:bg-amber-400 text-black shadow-[0_4px_16px_rgba(245,158,11,0.3)]"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Agendar revisión
                  <ChevronRight className="w-3 h-3 opacity-70" />
                </button>

                {/* Botón secundario — "Más tarde" */}
                <button
                  onClick={dismissServiceAlert}
                  className="px-3.5 py-2.5 rounded-2xl text-[12px] font-medium text-white/50 hover:text-white/80 hover:bg-white/8 transition-all duration-200 border border-white/10"
                >
                  Más tarde
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
