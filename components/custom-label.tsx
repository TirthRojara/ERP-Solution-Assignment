import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export interface CustomLabelProps extends React.ComponentProps<typeof Label> {
    /** The label text to display */
    label: string;
    /** Whether to show a red asterisk indicating the field is required */
    required?: boolean;
    /** Custom text color — accepts any Tailwind text-color class (e.g. "text-foreground", "text-muted-foreground") */
    textColor?: string;
}

function CustomLabel({
    label,
    required = false,
    textColor = "text-foreground",
    className,
    ...props
}: CustomLabelProps) {
    return (
        <Label
            data-slot="custom-label"
            className={cn(textColor, className)}
            {...props}
        >
            {label}
            {required && (
                <span
                    className="text-red-500 relative right-1"
                    aria-hidden="true"
                >
                    *
                </span>
            )}
        </Label>
    );
}

export { CustomLabel };
