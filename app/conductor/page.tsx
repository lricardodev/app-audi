"use client";

import React, { useState } from "react";
import { useVehicleStore } from "@/store/useVehicleStore";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Power, Lock, Unlock, Thermometer, BatteryCharging, Gauge, Settings2, ShieldCheck, MapPin, Car, Calendar, Navigation } from "lucide-react";

export default function ConductorDashboard() {
  const vehicle = useVehicleStore();
  const [showBiometrics, setShowBiometrics] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const handleCriticalAction = (action: () => void) => {
    setPendingAction(() => action);
    setShowBiometrics(true);
  };

  const confirmBiometrics = () => {
    setShowBiometrics(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Info */}
      <div className="flex items-end justify-between pt-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">{vehicle.model}</h1>
          <p className="text-foreground/60">VIN: {vehicle.vin}</p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Connected
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Remote Controls Panel */}
        <GlassCard className="col-span-1 md:col-span-4 space-y-6" hoverEffect>
          <div className="flex items-center gap-2 mb-4">
            <Settings2 className="w-5 h-5 opacity-70" />
            <h2 className="text-lg font-semibold">Remote Controls</h2>
          </div>
          
          <div className="space-y-4">
            <Button 
              variant="glass" 
              className="w-full justify-start h-14 text-base gap-4"
              isLoading={vehicle.isTogglingEngine}
              onClick={() => handleCriticalAction(vehicle.toggleEngine)}
            >
              <Power className={`w-5 h-5 ${vehicle.status.isEngineOn ? "text-emerald-500" : ""}`} />
              {vehicle.status.isEngineOn ? "Turn Engine Off" : "Start Engine"}
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="glass" 
                className="h-14 gap-2"
                isLoading={vehicle.isTogglingDoors}
                onClick={vehicle.toggleDoors}
              >
                {vehicle.status.areDoorsLocked ? (
                  <><Lock className="w-4 h-4 text-emerald-500" /> Locked</>
                ) : (
                  <><Unlock className="w-4 h-4 text-amber-500" /> Unlocked</>
                )}
              </Button>
              <Button 
                variant="glass" 
                className="h-14 gap-2"
                isLoading={vehicle.isTogglingClimate}
                onClick={vehicle.toggleClimate}
              >
                <Thermometer className={`w-4 h-4 ${vehicle.status.climateEnabled ? "text-blue-500" : ""}`} />
                {vehicle.status.climateTemp}°C
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* Unit Health Bento Grid */}
        <div className="col-span-1 md:col-span-8 grid grid-cols-2 gap-6">
          <GlassCard className="col-span-2 md:col-span-1 flex flex-col justify-between" hoverEffect>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 opacity-70">
                <BatteryCharging className="w-5 h-5" />
                <span className="font-medium">Battery Level</span>
              </div>
              <span className="text-emerald-500 font-medium">Healthy</span>
            </div>
            <div>
              <div className="text-4xl font-bold tracking-tighter mb-2">{vehicle.health.batteryLevel}%</div>
              <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${vehicle.health.batteryLevel}%` }}></div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="col-span-2 md:col-span-1 flex flex-col justify-between" hoverEffect>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 opacity-70">
                <Gauge className="w-5 h-5" />
                <span className="font-medium">Oil Life</span>
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold tracking-tighter mb-2">{vehicle.health.oilLife}%</div>
              <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${vehicle.health.oilLife}%` }}></div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="col-span-2 flex flex-col justify-between" hoverEffect>
             <div className="flex items-center gap-2 opacity-70 mb-6">
                <Gauge className="w-5 h-5" />
                <span className="font-medium">Tire Pressure (PSI)</span>
             </div>
             <div className="grid grid-cols-4 gap-4 text-center">
               <div>
                  <div className="text-2xl font-bold">{vehicle.health.tirePressure.fl}</div>
                  <div className="text-xs opacity-60 uppercase mt-1">Front L</div>
               </div>
               <div>
                  <div className="text-2xl font-bold">{vehicle.health.tirePressure.fr}</div>
                  <div className="text-xs opacity-60 uppercase mt-1">Front R</div>
               </div>
               <div>
                  <div className="text-2xl font-bold">{vehicle.health.tirePressure.rl}</div>
                  <div className="text-xs opacity-60 uppercase mt-1">Rear L</div>
               </div>
               <div>
                  <div className="text-2xl font-bold">{vehicle.health.tirePressure.rr}</div>
                  <div className="text-xs opacity-60 uppercase mt-1">Rear R</div>
               </div>
             </div>
          </GlassCard>
        </div>

        {/* Map and Geofencing (RF-C03) */}
        <div className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6">
          <GlassCard className="col-span-1 md:col-span-8 overflow-hidden relative p-0 h-[350px]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-50 dark:opacity-30"></div>
            <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px]"></div>
            
            <div className="absolute top-6 left-6 z-10 flex gap-2">
              <GlassCard className="py-2 px-4 inline-flex items-center gap-2 backdrop-blur-md bg-background/60">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-sm">Vehicle Location (Mock)</span>
              </GlassCard>
            </div>

            {/* Placeholder Car Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full animate-ping absolute"></div>
              <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white dark:border-black shadow-lg relative flex items-center justify-center">
                 <Car className="w-4 h-4 text-white" />
              </div>
            </div>
            
            {/* Geofence UI overlay mockup */}
            <div className="absolute bottom-6 right-6 z-10">
               <Button variant="default" className="shadow-lg h-10 gap-2 text-xs">
                 <Navigation className="w-4 h-4" /> Edit Geofences
               </Button>
            </div>
          </GlassCard>

          {/* Active Geofences List */}
          <GlassCard className="col-span-1 md:col-span-4 space-y-4" hoverEffect>
            <div className="flex items-center gap-2 mb-2">
               <Navigation className="w-5 h-5 opacity-70" />
               <h2 className="text-lg font-semibold">Active Geofences</h2>
            </div>
            <div className="space-y-3">
              {vehicle.telemetry.geofences.map(geo => (
                 <div key={geo.id} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                    <div>
                       <div className="font-medium text-sm">{geo.name}</div>
                       <div className="text-xs opacity-60">Radius: {geo.radius}m</div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${geo.isActive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-white/20'}`}></div>
                 </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Maintenance Scheduling (RF-C04) */}
        <GlassCard className="col-span-1 md:col-span-12 space-y-6" hoverEffect>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 opacity-70" />
            <h2 className="text-lg font-semibold">Maintenance & Service</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium opacity-80 mb-4">Upcoming Service Needs</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div>
                    <div className="font-medium">10,000 km Scheduled Service</div>
                    <div className="text-xs opacity-60 mt-1">Due in 1,200 km or 2 months</div>
                  </div>
                  <Button variant="outline" className="text-xs h-8">Schedule</Button>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div>
                    <div className="font-medium text-amber-500">Wiper Blades Replacement</div>
                    <div className="text-xs opacity-60 mt-1">Recommended based on season</div>
                  </div>
                  <Button variant="outline" className="text-xs h-8">Schedule</Button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center space-y-4 p-6 bg-white/5 border border-white/10 rounded-lg text-center">
              <Calendar className="w-8 h-8 mx-auto opacity-50" />
              <div>
                <div className="font-medium">Need immediate service?</div>
                <div className="text-xs opacity-60 mt-1">Check availability at your preferred agency.</div>
              </div>
              <Button variant="default" className="w-full h-10">Book Appointment</Button>
            </div>
          </div>
        </GlassCard>

      </div>

      {/* Mock Biometrics Modal Overlay */}
      {showBiometrics && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-md animate-in fade-in duration-200">
          <GlassCard className="max-w-sm w-full p-8 text-center space-y-6 shadow-2xl">
            <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Authentication Required</h3>
              <p className="text-sm opacity-70">Confirm your identity via FaceID / TouchID to execute critical vehicle commands.</p>
            </div>
            <div className="flex gap-4 w-full">
              <Button variant="outline" className="flex-1" onClick={() => setShowBiometrics(false)}>Cancel</Button>
              <Button variant="default" className="flex-1" onClick={confirmBiometrics}>Simulate Auth</Button>
            </div>
          </GlassCard>
        </div>
      )}

    </div>
  );
}
