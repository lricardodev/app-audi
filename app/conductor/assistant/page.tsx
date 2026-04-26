"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ExternalLink, MicOff } from "lucide-react";

export default function AssistantPage() {
  return (
    <div className="pt-20 px-6 pb-32 min-h-screen bg-[#0b0c10] flex flex-col animate-in fade-in duration-700">
      
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-wide">¡Hola! ¿Cómo puedo<br/>ayudarte?</h1>
      </div>

      <div className="flex-1 space-y-6">
        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-white/10 text-white text-sm py-3 px-4 rounded-2xl rounded-tr-sm max-w-[85%] border border-white/5">
            ¿Cómo guardo la presión de mis neumáticos?
          </div>
        </div>

        {/* AI Response */}
        <div className="flex justify-start">
          <div className="text-white/80 text-sm leading-relaxed max-w-[95%]">
            Para guardar la presión de los neumáticos, asegúrate de que las presiones actuales de los 4 neumáticos cumplan con los valores prescritos. Enciende el vehículo y selecciona en la pantalla central: Vehículo {'>'} Servicio {'>'} Control de presión de neumáticos {'>'} Guardar presión de neumáticos {'>'} Sí, guardar ahora. Por favor, consulta el capítulo sobre Ruedas, Indicador de control de presión de neumáticos en el manual del propietario.
            
            <button className="flex items-center gap-1.5 mt-4 text-xs font-medium text-white hover:text-white/80 transition-colors">
              Al manual del propietario <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="pt-6 space-y-2">
          <Suggestion text="¿Dónde encuentro la llave de emergencia?" />
          <Suggestion text="¿Dónde puedo ajustar la iluminación ambiental?" />
          <Suggestion text="¿Cómo ajusto los espejos exteriores?" />
        </div>
      </div>

      {/* Voice Visualizer */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-1 h-12">
           <div className="w-1.5 h-6 bg-white/40 rounded-full animate-[pulse_1s_ease-in-out_infinite]"></div>
           <div className="w-2 h-10 bg-white rounded-full animate-[pulse_1.2s_ease-in-out_infinite]"></div>
           <div className="w-2.5 h-12 bg-white rounded-full animate-[pulse_0.8s_ease-in-out_infinite]"></div>
           <div className="w-2 h-8 bg-white/80 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
           <div className="w-1.5 h-5 bg-white/40 rounded-full animate-[pulse_1s_ease-in-out_infinite]"></div>
        </div>
        <span className="text-xs text-white/40">Toca para detener</span>
      </div>

    </div>
  );
}

function Suggestion({ text }: { text: string }) {
  return (
    <div className="py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 text-xs text-white/70 hover:bg-white/10 transition-colors cursor-pointer w-fit">
      {text}
    </div>
  );
}
