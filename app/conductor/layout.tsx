import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Car, MapPin, Gauge } from "lucide-react";

export default function ConductorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1549317661-ef32295623dd?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center bg-fixed">
      {/* Dark gradient overlay for contrast */}
      <div className="fixed inset-0 bg-gradient-to-br from-background/90 to-background/50 backdrop-blur-sm pointer-events-none" />
      
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Navigation Top Bar */}
        <header className="px-6 py-4">
          <GlassCard className="flex items-center justify-between px-6 py-3 rounded-full">
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-foreground" />
              <span className="font-semibold text-foreground tracking-tight">Driver Profile</span>
            </div>
            <nav className="flex gap-6 text-sm font-medium">
              <span className="text-foreground border-b-2 border-foreground pb-1">Dashboard</span>
              <span className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer">Map & Geofences</span>
              <span className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer">Maintenance</span>
              <span className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer">Settings</span>
            </nav>
          </GlassCard>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 px-6 pb-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
