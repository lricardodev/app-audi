"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVehicleStore } from "@/store/useVehicleStore";
import { MOCK_DEALERSHIPS, DEALERSHIP_MAP } from "@/lib/mockMaintenanceData";
import { X, Clock, Zap, MapPin, CheckCircle2, Loader2, Star } from "lucide-react";

// ─── Variantes de animación ───────────────────
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:   { opacity: 0, transition: { duration: 0.2 } },
};

const sheetVariants = {
  hidden:  { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" as const, damping: 28, stiffness: 300 } },
  exit:    { y: "100%", opacity: 0, transition: { duration: 0.25, ease: "easeIn" as const } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.3 },
  }),
};

// ─── Helpers ──────────────────────────────────
function formatRating(r: number) {
  return `${r.toFixed(1)}`;
}

export default function ScheduleModal() {
  const {
    isScheduleModalOpen,
    availableSlots,
    selectedSlot,
    isConfirmingAppointment,
    appointmentConfirmed,
    serviceAlert,
    closeScheduleModal,
    selectSlot,
    confirmAppointment,
  } = useVehicleStore();

  // Agrupar slots por concesionario
  const slotsByDealer = React.useMemo(() => {
    const map = new Map<string, typeof availableSlots>();
    for (const slot of availableSlots) {
      const list = map.get(slot.dealershipId) ?? [];
      list.push(slot);
      map.set(slot.dealershipId, list);
    }
    return map;
  }, [availableSlots]);

  return (
    <AnimatePresence>
      {isScheduleModalOpen && (
        <>
          {/* ── Overlay ── */}
          <motion.div
            key="schedule-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={closeScheduleModal}
          />

          {/* ── Bottom Sheet ── */}
          <motion.div
            key="schedule-sheet"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[70] flex flex-col"
            style={{ maxHeight: "88vh" }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Sheet body */}
            <div className="bg-[#141416]/95 backdrop-blur-2xl border-t border-x border-white/10 rounded-t-3xl flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-start justify-between p-5 pb-4 border-b border-white/8">
                <div>
                  <h2 className="text-[15px] font-semibold text-white tracking-tight">
                    Agendar revisión
                  </h2>
                  {serviceAlert && (
                    <p className="text-[11px] text-white/50 mt-0.5">
                      {serviceAlert.component} · {serviceAlert.currentValue}{serviceAlert.unit}
                    </p>
                  )}
                </div>
                <button
                  onClick={closeScheduleModal}
                  className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>

              {/* Slots scrollable */}
              <div className="overflow-y-auto flex-1 px-4 py-3 space-y-5 scrollbar-hide">
                {Array.from(slotsByDealer.entries()).map(([dealerId, slots]) => {
                  const dealer = DEALERSHIP_MAP.get(dealerId);
                  if (!dealer) return null;

                  return (
                    <div key={dealerId}>
                      {/* Dealer header */}
                      <div className="flex items-center justify-between mb-2.5 px-1">
                        <div>
                          <p className="text-[13px] font-semibold text-white/90">{dealer.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <MapPin className="w-3 h-3 text-white/30" />
                            <span className="text-[10px] text-white/40">{dealer.distanceKm} km · {dealer.address}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-400/10 px-2 py-1 rounded-full border border-amber-400/20">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-[11px] text-amber-400 font-semibold">{formatRating(dealer.rating)}</span>
                        </div>
                      </div>

                      {/* Slot cards */}
                      <div className="space-y-2">
                        {slots.map((slot, i) => {
                          const isSelected = selectedSlot?.id === slot.id;
                          return (
                            <motion.button
                              key={slot.id}
                              custom={i}
                              variants={itemVariants}
                              initial="hidden"
                              animate="visible"
                              onClick={() => selectSlot(slot)}
                              className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                                isSelected
                                  ? "bg-white/15 border-white/30 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
                                  : "bg-white/5 border-white/8 hover:bg-white/10 hover:border-white/15"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
                                  <span className="text-[13px] font-medium text-white/90">{slot.timeLabel}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  {slot.isExpress && (
                                    <span className="flex items-center gap-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-2 py-0.5 text-[10px] font-semibold text-cyan-400">
                                      <Zap className="w-2.5 h-2.5" />
                                      Exprés
                                    </span>
                                  )}
                                  {isSelected && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-3 mt-1.5 pl-5.5">
                                <span className="text-[11px] text-white/40">{slot.durationMin} min</span>
                                <span className="text-white/20">·</span>
                                <span className="text-[11px] text-white/40">{slot.technicianName}</span>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer — CTA */}
              <div className="p-4 pb-32 border-t border-white/8">
                <button
                  onClick={() => confirmAppointment()}
                  disabled={!selectedSlot || isConfirmingAppointment}
                  className={`w-full py-3.5 rounded-2xl font-semibold text-[14px] flex items-center justify-center gap-2 transition-all duration-300 ${
                    selectedSlot && !isConfirmingAppointment
                      ? "bg-white text-black hover:bg-white/90 active:scale-[0.98]"
                      : "bg-white/10 text-white/30 cursor-not-allowed"
                  }`}
                >
                  {isConfirmingAppointment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Confirmando cita…
                    </>
                  ) : (
                    "Confirmar horario"
                  )}
                </button>
                {!selectedSlot && (
                  <p className="text-[11px] text-center text-white/30 mt-2">
                    Selecciona un horario para continuar
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
