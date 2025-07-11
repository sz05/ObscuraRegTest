import * as React from "react"
import { cn } from "@/lib/utils"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, ...props }, ref) => {
        return (
            <label
                ref={ref}
                {...props}
                className={cn(
                    "mb-2 block text-sm font-semibold leading-none text-rose-100 tracking-wide",
                    className
                )}
            />
        )
    }
)
Label.displayName = "Label"

export { Label }
