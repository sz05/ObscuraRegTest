import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                ref={ref}
                {...props}
                className={cn(
                    "flex h-11 w-full rounded-md border border-rose-500/30 bg-black/40 px-4 py-2 text-sm text-white placeholder:text-rose-100/40 shadow-[0_0_10px_1px_rgba(255,0,90,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 backdrop-blur-md transition-all duration-200",
                    className
                )}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
