"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Triangle, Navigation, Mic, User } from "lucide-react";

export default function ConductorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/conductor", icon: Car, label: "Control" },
    { href: "/conductor/status", icon: Triangle, label: "Status" },
    { href: "/conductor/map", icon: Navigation, label: "Map" },
    { href: "/conductor/assistant", icon: Mic, label: "Assistant" },
    { href: "/conductor/discover", icon: User, label: "Discover" },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white flex justify-center font-sans">
      {/* Mobile container constraint */}
      <div className="w-full max-w-[430px] h-screen relative flex flex-col overflow-hidden bg-[#111318] shadow-2xl border-x border-white/5">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide relative z-0">
          {children}
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 w-full max-w-[430px] h-28 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/95 to-transparent flex items-end justify-center pb-8 z-50 pointer-events-none">
          <nav className="flex items-center justify-between w-full px-8 pt-2 pointer-events-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative ${isActive ? "text-white" : "text-white/40 hover:text-white/80"}`}
                >
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                  {isActive && (
                    <span className="absolute -bottom-3 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
