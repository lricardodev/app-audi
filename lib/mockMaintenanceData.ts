// ─────────────────────────────────────────────
// TypeScript Interfaces — Mantenimiento Predictivo
// ─────────────────────────────────────────────

export type ServiceSeverity = "warning" | "critical";

export interface ServiceAlert {
  id: string;
  component: string;       // Nombre legible del componente físico
  metric: string;          // Métrica que disparó la alerta (ej: "brakePadLevel")
  currentValue: number | string;
  unit: string;
  threshold: number | string;
  severity: ServiceSeverity;
  message: string;         // Mensaje para el usuario
  recommendedAction: string;
}

export interface Dealership {
  id: string;
  name: string;
  address: string;
  phone: string;
  location: { lat: number; lng: number };
  distanceKm: number;
  rating: number;          // 0-5
  nextAvailableDate: string;
}

export interface ScheduleSlot {
  id: string;
  dealershipId: string;
  date: string;            // ISO format
  timeLabel: string;       // Ej: "Martes 29 Abr · 10:00 AM"
  durationMin: number;
  serviceType: string;
  technicianName: string;
  isExpress: boolean;
}

export interface Destination {
  dealershipId: string;
  name: string;
  address: string;
  location: { lat: number; lng: number };
  scheduledSlot: ScheduleSlot;
}

// ─────────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────────

export const MOCK_DEALERSHIPS: Dealership[] = [
  {
    id: "dealer_001",
    name: "Audi Centro CDMX",
    address: "Av. Presidente Masaryk 61, Polanco",
    phone: "+52 55 5281 0400",
    location: { lat: 19.4326, lng: -99.1923 },
    distanceKm: 3.2,
    rating: 4.9,
    nextAvailableDate: "2026-04-29",
  },
  {
    id: "dealer_002",
    name: "Audi Santa Fe",
    address: "Vasco de Quiroga 3900, Santa Fe",
    phone: "+52 55 2169 3800",
    location: { lat: 19.3601, lng: -99.2603 },
    distanceKm: 8.7,
    rating: 4.8,
    nextAvailableDate: "2026-04-28",
  },
  {
    id: "dealer_003",
    name: "Audi Satélite",
    address: "Blvd. Manuel Ávila Camacho 1, Satélite",
    phone: "+52 55 5393 2900",
    location: { lat: 19.5102, lng: -99.2271 },
    distanceKm: 12.4,
    rating: 4.7,
    nextAvailableDate: "2026-04-30",
  },
];

export const MOCK_SCHEDULE_SLOTS: ScheduleSlot[] = [
  {
    id: "slot_001",
    dealershipId: "dealer_001",
    date: "2026-04-28T09:00:00",
    timeLabel: "Lun 28 Abr · 9:00 AM",
    durationMin: 90,
    serviceType: "Revisión de Frenos",
    technicianName: "Ing. Carlos Vega",
    isExpress: false,
  },
  {
    id: "slot_002",
    dealershipId: "dealer_001",
    date: "2026-04-28T14:00:00",
    timeLabel: "Lun 28 Abr · 2:00 PM",
    durationMin: 90,
    serviceType: "Revisión de Frenos",
    technicianName: "Ing. María Reyes",
    isExpress: false,
  },
  {
    id: "slot_003",
    dealershipId: "dealer_001",
    date: "2026-04-29T10:00:00",
    timeLabel: "Mar 29 Abr · 10:00 AM",
    durationMin: 60,
    serviceType: "Servicio Exprés de Frenos",
    technicianName: "Ing. Sofía Torres",
    isExpress: true,
  },
  {
    id: "slot_004",
    dealershipId: "dealer_002",
    date: "2026-04-28T11:00:00",
    timeLabel: "Lun 28 Abr · 11:00 AM",
    durationMin: 90,
    serviceType: "Revisión de Frenos",
    technicianName: "Ing. Diego Morales",
    isExpress: false,
  },
  {
    id: "slot_005",
    dealershipId: "dealer_002",
    date: "2026-04-29T08:30:00",
    timeLabel: "Mar 29 Abr · 8:30 AM",
    durationMin: 60,
    serviceType: "Servicio Exprés de Frenos",
    technicianName: "Ing. Ana Guzmán",
    isExpress: true,
  },
  {
    id: "slot_006",
    dealershipId: "dealer_003",
    date: "2026-04-30T13:00:00",
    timeLabel: "Mié 30 Abr · 1:00 PM",
    durationMin: 90,
    serviceType: "Revisión de Frenos",
    technicianName: "Ing. Roberto Núñez",
    isExpress: false,
  },
];

// Mapa rápido dealershipId → Dealership
export const DEALERSHIP_MAP = new Map<string, Dealership>(
  MOCK_DEALERSHIPS.map((d) => [d.id, d])
);

// ─────────────────────────────────────────────
// Umbrales críticos de componentes físicos
// ─────────────────────────────────────────────
export const THRESHOLDS = {
  brakePadLevel: { warning: 25, critical: 15 },
  oilLife:       { warning: 20, critical: 10 },
  batteryLevel:  { warning: 20, critical: 10 },
} as const;
