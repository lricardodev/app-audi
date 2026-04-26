"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-[#111318] flex flex-col relative animate-in fade-in duration-700">
      {/* Background Gradient/Image */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1c23] to-[#0a0c10] opacity-80" />

      <div className="relative z-10 pt-16 px-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-2xl font-semibold tracking-wide">
              Descubre Audi
            </h1>
            <p className="text-xs text-white/50 mt-1">
              Contenido de Audi España
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20 shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
              width={32}
              height={32}
              alt="Profile"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 max-w-[85%]">
          <h2 className="text-4xl font-light tracking-tight">
            Strive for clarity
          </h2>
          <p className="text-sm text-white/60 leading-relaxed">
            Descubre nuestra nueva filosofía de diseño a través del Audi Concept
            C.
          </p>
          <div className="pt-4">
            <Button
              variant="outline"
              className="rounded-full px-6 py-5 text-sm gap-2 border-white/20 hover:bg-white/10 hover:text-white transition-all bg-transparent text-white"
            >
              Saber más <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Bottom Image */}
        <div className="absolute bottom-28 right-0 w-[120%] -mr-[10%] h-64 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent z-10" />
          <Image
            src="/audilateral.png"
            alt="Audi Concept"
            fill
            className="object-cover object-right grayscale opacity-70 mix-blend-screen scale-x-[-1] scale-125"
          />
        </div>
      </div>
    </div>
  );
}
