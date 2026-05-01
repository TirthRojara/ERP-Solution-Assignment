"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

export interface CustomCheckboxProps extends React.ComponentProps<
    typeof Checkbox
> {
    /** Label text displayed next to the checkbox */
    label?: string;
    /**
     * `default`     — checkbox only (no label)
     * `withLabel`   — checkbox + label in normal foreground color
     * `withLabelMuted` — checkbox + label in muted gray/50 color
     */
    variant?: "default" | "withLabel" | "withLabelMuted";
    /** Custom text color for the label — overrides the variant default */
    labelTextColor?: string;
    /** Unique id used to link the label to the checkbox */
    id?: string;
    /** Error message to display below the input */
    errorMessage?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function CustomCheckbox({
    label,
    variant = "default",
    labelTextColor,
    id,
    className,
    errorMessage,
    ...props
}: CustomCheckboxProps) {
    // Generate a stable id if none is provided
    const checkboxId = id ?? React.useId();

    // Determine label color based on variant (can be overridden via labelTextColor)
    const resolvedLabelColor =
        labelTextColor ??
        (variant === "withLabelMuted"
            ? "text-foreground/70"
            : "text-foreground");

    // Variant: default — checkbox only
    if (variant === "default" || !label) {
        return (
            <div className="flex flex-col gap-1">
                <Checkbox id={checkboxId} className={className} {...props} />
                {errorMessage && (
                    <span className="text-[13px] text-destructive">{errorMessage}</span>
                )}
            </div>
        );
    }

    // Variants: withLabel / withLabelMuted — checkbox + label
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
                <Checkbox id={checkboxId} className={className} {...props} />
                <Label
                    htmlFor={checkboxId}
                    className={cn(
                        "cursor-pointer text-sm font-normal leading-none",
                        resolvedLabelColor,
                    )}
                >
                    {label}
                </Label>
            </div>
            {errorMessage && (
                <span className="text-[13px] text-destructive">{errorMessage}</span>
            )}
        </div>
    );
}

export { CustomCheckbox };
