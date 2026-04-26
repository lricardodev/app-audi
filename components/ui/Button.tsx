import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'glass' | 'outline' | 'danger' | 'ghost';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      default: "bg-[#E60000] text-white hover:bg-[#CC0000] shadow-[0_0_15px_rgba(230,0,0,0.3)] hover:shadow-[0_0_25px_rgba(230,0,0,0.5)]",
      glass: "glass hover:bg-white/5 border-white/10 hover:border-white/20",
      outline: "border border-white/20 bg-transparent hover:bg-white/5 text-white",
      danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20",
      ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-none px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white/50 focus:ring-offset-1 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group",
          variants[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {/* Subtle shine effect on hover for primary button */}
        {variant === 'default' && (
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
        )}
      </button>
    )
  }
)
Button.displayName = "Button"
