import { create } from 'zustand';

export type AlertLevel = 'info' | 'warning' | 'critical';

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

export interface VehicleState {
  id: string;
  model: string;
  year: number;
  vin: string;
  status: {
    isEngineOn: boolean;
    areDoorsLocked: boolean;
    climateEnabled: boolean;
    climateTemp: number;
  };
  health: {
    fuelLevel: number; // percentage
    batteryLevel: number; // percentage
    oilLife: number; // percentage
    tirePressure: {
      fl: number;
      fr: number;
      rl: number;
      rr: number;
    };
  };
  location: {
    lat: number;
    lng: number;
  };
  telemetry: {
    alerts: Alert[];
    geofences: Geofence[];
  };

  // Ui Loading States
  isTogglingEngine: boolean;
  isTogglingDoors: boolean;
  isTogglingClimate: boolean;

  // Actions
  toggleEngine: () => Promise<void>;
  toggleDoors: () => Promise<void>;
  toggleClimate: () => Promise<void>;
  setClimateTemp: (temp: number) => void;
}

// Simulated initial complex state
const INITIAL_VEHICLE_DATA = {
  id: 'veh_001',
  model: 'Audi e-tron GT Simulation',
  year: 2026,
  vin: 'WAUZZZGE2MA00000X',
  status: {
    isEngineOn: false,
    areDoorsLocked: true,
    climateEnabled: false,
    climateTemp: 22,
  },
  health: {
    fuelLevel: 0,
    batteryLevel: 84,
    oilLife: 100,
    tirePressure: {
      fl: 34,
      fr: 34,
      rl: 36,
      rr: 35,
    },
  },
  location: {
    lat: 19.432608,
    lng: -99.133209, // Mexico City CDMX center mock
  },
  telemetry: {
    alerts: [
      { id: 'a1', message: 'Low washer fluid', level: 'info' as AlertLevel, date: new Date().toISOString() },
      { id: 'a2', message: 'Scheduled maintenance approaching', level: 'warning' as AlertLevel, date: new Date(Date.now() - 86400000).toISOString() }
    ],
    geofences: [
      { id: 'geo1', name: 'Home', radius: 500, lat: 19.4326, lng: -99.1332, isActive: true },
      { id: 'geo2', name: 'Office', radius: 300, lat: 19.4200, lng: -99.1500, isActive: false }
    ],
  },
};

const simulateLatency = (ms: number = 800) => new Promise((resolve) => setTimeout(resolve, ms));

export const useVehicleStore = create<VehicleState>((set, get) => ({
  ...INITIAL_VEHICLE_DATA,
  isTogglingEngine: false,
  isTogglingDoors: false,
  isTogglingClimate: false,

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
      status: { ...state.status, climateTemp: temp }
    }));
  }
}));
