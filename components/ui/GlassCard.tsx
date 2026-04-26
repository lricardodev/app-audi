import * as React from "react"
import { cn } from "@/lib/utils"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function GlassCard({ className, hoverEffect = false, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-none p-8 transition-all duration-500 ease-out border-white/10 bg-black/40",
        hoverEffect && "hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:-translate-y-1 hover:border-white/20 hover:bg-black/60",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
