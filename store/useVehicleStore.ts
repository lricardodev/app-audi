import { create } from "zustand";
import type {
  ServiceAlert,
  Destination,
  ScheduleSlot,
} from "@/lib/mockMaintenanceData";
import {
  THRESHOLDS,
  MOCK_SCHEDULE_SLOTS,
  DEALERSHIP_MAP,
} from "@/lib/mockMaintenanceData";

// ─────────────────────────────────────────────
// Tipos base existentes
// ─────────────────────────────────────────────

export type AlertLevel = "info" | "warning" | "critical";

export interface Alert {
  id: string;
  message: string;
  level: AlertLevel;
  date: string;
}

export interface Geofence {
  id: string;
  name: string;
  radius: number;
  lat: number;
  lng: number;
  isActive: boolean;
}

// ─────────────────────────────────────────────
// Tipos de Telemetría Predictiva (NUEVO)
// ─────────────────────────────────────────────

export type BatteryStatus = "optimal" | "good" | "low" | "critical";
export type OilLifeStatus = "optimal" | "good" | "low" | "replace";

/** Telemetría de componentes físicos del vehículo */
export interface PhysicalHealth {
  brakePadLevel: number;        // 0–100 %
  batteryStatus: BatteryStatus; // derivado de batteryLevel
  oilLifeStatus: OilLifeStatus; // derivado de oilLife
}

// ─────────────────────────────────────────────
// Estado completo del store
// ─────────────────────────────────────────────

export interface VehicleState {
  // ── Identidad ──────────────────────────────
  id: string;
  model: string;
  year: number;
  vin: string;

  // ── Estado del vehículo ────────────────────
  status: {
    isEngineOn: boolean;
    areDoorsLocked: boolean;
    climateEnabled: boolean;
    climateTemp: number;
  };

  // ── Salud base ────────────────────────────
  health: {
    fuelLevel: number;
    batteryLevel: number;
    oilLife: number;
    tirePressure: { fl: number; fr: number; rl: number; rr: number };
  };

  // ── Salud de componentes físicos (NUEVO) ───
  physicalHealth: PhysicalHealth;

  // ── Mantenimiento Predictivo (NUEVO) ───────
  requiresService: boolean;
  serviceAlert: ServiceAlert | null;
  activeDestination: Destination | null;

  // ── Scheduling UI state (NUEVO) ────────────
  isScheduleModalOpen: boolean;
  availableSlots: ScheduleSlot[];
  selectedSlot: ScheduleSlot | null;
  isConfirmingAppointment: boolean;
  appointmentConfirmed: boolean;

  // ── Telemetría ─────────────────────────────
  location: { lat: number; lng: number };
  telemetry: { alerts: Alert[]; geofences: Geofence[] };

  // ── UI Loading States ──────────────────────
  isTogglingEngine: boolean;
  isTogglingDoors: boolean;
  isTogglingClimate: boolean;

  // ── Acciones existentes ────────────────────
  toggleEngine: () => Promise<void>;
  toggleDoors: () => Promise<void>;
  toggleClimate: () => Promise<void>;
  setClimateTemp: (temp: number) => void;

  // ── Acciones de Mantenimiento Predictivo (NUEVO) ──
  dismissServiceAlert: () => void;
  openScheduleModal: () => void;
  closeScheduleModal: () => void;
  selectSlot: (slot: ScheduleSlot) => void;
  confirmAppointment: () => Promise<void>;
}

// ─────────────────────────────────────────────
// Lógica de umbrales (pura, sin side-effects)
// ─────────────────────────────────────────────

function deriveBatteryStatus(level: number): BatteryStatus {
  if (level > 50) return "optimal";
  if (level > THRESHOLDS.batteryLevel.warning) return "good";
  if (level > THRESHOLDS.batteryLevel.critical) return "low";
  return "critical";
}

function deriveOilLifeStatus(level: number): OilLifeStatus {
  if (level > 50) return "optimal";
  if (level > THRESHOLDS.oilLife.warning) return "good";
  if (level > THRESHOLDS.oilLife.critical) return "low";
  return "replace";
}

/**
 * Evalúa todos los umbrales y retorna la alerta de servicio más crítica,
 * o null si todo está dentro de rangos seguros.
 */
function evaluateThresholds(
  physicalHealth: PhysicalHealth,
  oilLife: number,
  batteryLevel: number
): ServiceAlert | null {
  // Evaluar frenos (más crítico visualmente — demo con 12%)
  if (physicalHealth.brakePadLevel < THRESHOLDS.brakePadLevel.critical) {
    return {
      id: `svc_brake_${Date.now()}`,
      component: "Pastillas de freno",
      metric: "brakePadLevel",
      currentValue: physicalHealth.brakePadLevel,
      unit: "%",
      threshold: THRESHOLDS.brakePadLevel.critical,
      severity: "critical",
      message: `Nivel de pastillas al ${physicalHealth.brakePadLevel}% — reemplazo inmediato recomendado`,
      recommendedAction: "Agendar revisión de frenos",
    };
  }

  if (physicalHealth.brakePadLevel < THRESHOLDS.brakePadLevel.warning) {
    return {
      id: `svc_brake_warn_${Date.now()}`,
      component: "Pastillas de freno",
      metric: "brakePadLevel",
      currentValue: physicalHealth.brakePadLevel,
      unit: "%",
      threshold: THRESHOLDS.brakePadLevel.warning,
      severity: "warning",
      message: `Nivel de pastillas al ${physicalHealth.brakePadLevel}% — desgaste próximo`,
      recommendedAction: "Programar revisión de frenos",
    };
  }

  // Evaluar aceite
  if (oilLife < THRESHOLDS.oilLife.critical) {
    return {
      id: `svc_oil_${Date.now()}`,
      component: "Aceite del motor",
      metric: "oilLife",
      currentValue: oilLife,
      unit: "%",
      threshold: THRESHOLDS.oilLife.critical,
      severity: "critical",
      message: `Vida útil del aceite al ${oilLife}% — cambio urgente`,
      recommendedAction: "Agendar cambio de aceite",
    };
  }

  return null;
}

// ─────────────────────────────────────────────
// Estado inicial
// ─────────────────────────────────────────────

const INITIAL_PHYSICAL_HEALTH: PhysicalHealth = {
  brakePadLevel: 12,          // ← 12% dispara la alerta crítica para demo
  batteryStatus: "optimal",
  oilLifeStatus: "optimal",
};

const INITIAL_HEALTH = {
  fuelLevel: 0,
  batteryLevel: 84,
  oilLife: 100,
  tirePressure: { fl: 34, fr: 34, rl: 36, rr: 35 },
};

const INITIAL_SERVICE_ALERT = evaluateThresholds(
  INITIAL_PHYSICAL_HEALTH,
  INITIAL_HEALTH.oilLife,
  INITIAL_HEALTH.batteryLevel
);

const simulateLatency = (ms = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ─────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────

export const useVehicleStore = create<VehicleState>((set, get) => ({
  // Identidad
  id: "veh_001",
  model: "Audi-R8",
  year: 2026,
  vin: "WAUZZZGE2MA00000X",

  // Estado
  status: {
    isEngineOn: false,
    areDoorsLocked: true,
    climateEnabled: false,
    climateTemp: 22,
  },

  // Salud base
  health: INITIAL_HEALTH,

  // Salud componentes físicos
  physicalHealth: INITIAL_PHYSICAL_HEALTH,

  // Mantenimiento Predictivo
  requiresService: INITIAL_SERVICE_ALERT !== null,
  serviceAlert: INITIAL_SERVICE_ALERT,
  activeDestination: null,

  // Scheduling
  isScheduleModalOpen: false,
  availableSlots: [],
  selectedSlot: null,
  isConfirmingAppointment: false,
  appointmentConfirmed: false,

  // Telemetría
  location: { lat: 19.432608, lng: -99.133209 },
  telemetry: {
    alerts: [
      {
        id: "a1",
        message: "Bajo nivel de líquido limpiaparabrisas",
        level: "info" as AlertLevel,
        date: new Date().toISOString(),
      },
      {
        id: "a2",
        message: "Mantenimiento programado próximo",
        level: "warning" as AlertLevel,
        date: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
    geofences: [
      {
        id: "geo1",
        name: "Casa",
        radius: 500,
        lat: 19.4326,
        lng: -99.1332,
        isActive: true,
      },
      {
        id: "geo2",
        name: "Oficina",
        radius: 300,
        lat: 19.42,
        lng: -99.15,
        isActive: false,
      },
    ],
  },

  // UI Loading
  isTogglingEngine: false,
  isTogglingDoors: false,
  isTogglingClimate: false,

  // ── Acciones existentes ──────────────────────────────────

  toggleEngine: async () => {
    set({ isTogglingEngine: true });
    await simulateLatency();
    set((state) => ({
      status: { ...state.status, isEngineOn: !state.status.isEngineOn },
      isTogglingEngine: false,
    }));
  },

  toggleDoors: async () => {
    set({ isTogglingDoors: true });
    await simulateLatency(600);
    set((state) => ({
      status: { ...state.status, areDoorsLocked: !state.status.areDoorsLocked },
      isTogglingDoors: false,
    }));
  },

  toggleClimate: async () => {
    set({ isTogglingClimate: true });
    await simulateLatency(400);
    set((state) => ({
      status: { ...state.status, climateEnabled: !state.status.climateEnabled },
      isTogglingClimate: false,
    }));
  },

  setClimateTemp: (temp: number) => {
    set((state) => ({
      status: { ...state.status, climateTemp: temp },
    }));
  },

  // ── Acciones de Mantenimiento Predictivo ────────────────

  dismissServiceAlert: () => {
    set({ serviceAlert: null, requiresService: false });
  },

  openScheduleModal: () => {
    // Cargar slots disponibles desde el mock (simula llamada a API)
    const { serviceAlert } = get();
    const slots = serviceAlert
      ? MOCK_SCHEDULE_SLOTS
      : [];
    set({ isScheduleModalOpen: true, availableSlots: slots, selectedSlot: null });
  },

  closeScheduleModal: () => {
    set({ isScheduleModalOpen: false, selectedSlot: null });
  },

  selectSlot: (slot: ScheduleSlot) => {
    set({ selectedSlot: slot });
  },

  confirmAppointment: async () => {
    const { selectedSlot } = get();
    if (!selectedSlot) return;

    set({ isConfirmingAppointment: true });
    await simulateLatency(1200); // Simula POST a API

    const dealership = DEALERSHIP_MAP.get(selectedSlot.dealershipId);
    if (!dealership) {
      set({ isConfirmingAppointment: false });
      return;
    }

    const destination: Destination = {
      dealershipId: dealership.id,
      name: dealership.name,
      address: dealership.address,
      location: dealership.location,
      scheduledSlot: selectedSlot,
    };

    set({
      isConfirmingAppointment: false,
      appointmentConfirmed: true,
      isScheduleModalOpen: false,
      serviceAlert: null,
      requiresService: false,
      activeDestination: destination,   // ← Mapa reacciona aquí
    });
  },
}));
