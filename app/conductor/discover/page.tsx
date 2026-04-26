"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#111318] flex flex-col relative animate-in fade-in duration-700">
      {/* Background Gradient/Image */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1c23] to-[#0a0c10] opacity-80" />

      <div className="relative z-10 pt-16 px-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-2xl font-semibold tracking-wide">
              Soporte Técnico
            </h1>
            <p className="text-xs text-white/50 mt-1">Asistencia y Recursos</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20 shadow-lg">
            <Image src="/profile.png" width={32} height={32} alt="Profile" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 max-w-[85%]">
          <h2 className="text-4xl font-light tracking-tight">
            ¿Cómo podemos ayudarte?
          </h2>
          <p className="text-sm text-white/60 leading-relaxed">
            Encuentra soluciones a tus problemas, consulta manuales detallados o
            contacta directamente con nuestro equipo de asistencia.
          </p>
          <div className="pt-4">
            <Button
              variant="outline"
              className="rounded-full px-6 py-5 text-sm gap-2 border-white/20 hover:bg-white/10 hover:text-white transition-all bg-transparent text-white"
            >
              <a
                href="https://www.audicenterinsurgentes.com.mx/es/?gad_source=1&gad_campaignid=20925262525&gbraid=0AAAAAqtHY3JBIOwpEETf90Vh5KS1Ur7pf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Centro de ayuda <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom Image */}
        <div className="absolute bottom-28 right-0 w-[120%] -mr-[10%] h-64 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent z-10" />
          <Image
            src="/logo.png"
            alt="Soporte Técnico"
            fill
            className="object-cover object-right grayscale opacity-70 mix-blend-screen scale-x-[-1] scale-125"
          />
        </div>
      </div>
    </div>
  );
}
