import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FieldDescription } from "@/components/ui/field";

/* ------------------------------------------------------------------ */
/*  Input variants                                                     */
/* ------------------------------------------------------------------ */

const customInputVariants = cva(
    // Base styles shared by all variants
    "flex w-full items-center min-w-0 bg-transparent transition-colors",
    {
        variants: {
            /** `outlined` = full border (default shadcn look) · `underline` = bottom‑border only */
            variant: {
                outlined:
                    "rounded-md border border-gray/30 px-3 py-1 focus-within:border-primary focus-within:ring-1 focus-within:ring-ring/50",
                underline:
                    "rounded-none border-b border-gray/30  px-1 py-1 focus-within:border-primary",
            },
        },
        defaultVariants: {
            variant: "outlined",
        },
    },
);

/* ------------------------------------------------------------------ */
/*  Icon wrapper props                                                 */
/* ------------------------------------------------------------------ */

export interface IconProps {
    /** The icon element (e.g. a Lucide icon) */
    icon: React.ReactNode;
    /** Click handler for the icon */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /** Custom text color — accepts any Tailwind text-color class */
    textColor?: string;
}

/* ------------------------------------------------------------------ */
/*  Input props                                                        */
/* ------------------------------------------------------------------ */

export interface CustomInputProps
    extends
        Omit<React.ComponentProps<"input">, "width">,
        VariantProps<typeof customInputVariants> {
    /** Left icon configuration */
    leftIcon?: IconProps;
    /** Right icon configuration */
    rightIcon?: IconProps;
    /** Shorthand: color for the left icon — overrides leftIcon.textColor */
    leftIconColor?: string;
    /** Shorthand: color for the right icon — overrides rightIcon.textColor */
    rightIconColor?: string;
    /** Fixed width — accepts any CSS value (e.g. "300px", "100%", "50%") */
    width?: string;
    /** Error message to display below the input */
    errorMessage?: string;
}

/* ------------------------------------------------------------------ */
/*  Icon renderer                                                      */
/* ------------------------------------------------------------------ */

function IconSlot({ icon, onClick, textColor }: IconProps) {
    const colorClass = textColor ?? "text-muted-foreground";

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className={cn(
                    "shrink-0 cursor-pointer outline-none transition-colors hover:opacity-70 [&_svg]:size-4",
                    colorClass,
                )}
            >
                {icon}
            </button>
        );
    }

    return (
        <span
            className={cn(
                "pointer-events-none shrink-0 [&_svg]:size-4",
                colorClass,
            )}
        >
            {icon}
        </span>
    );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
    (
        {
            className,
            type,
            variant = "outlined",
            leftIcon,
            rightIcon,
            leftIconColor = "text-muted-foreground/50",
            rightIconColor = "text-muted-foreground/50",
            width,
            errorMessage,
            ...props
        },
        ref,
    ) => {
        return (
            <div
                className="flex flex-col gap-1"
                style={width ? { width } : undefined}
            >
                <div
                    className={cn(
                        customInputVariants({ variant }),
                        (leftIcon || rightIcon) && "gap-2",
                        className,
                    )}
                >
                    {leftIcon && (
                        <IconSlot
                            {...leftIcon}
                            textColor={leftIconColor ?? leftIcon.textColor}
                        />
                    )}

                    {/* Use shadcn Input with border/ring stripped — the wrapper handles that */}
                    <Input
                        ref={ref}
                        type={type}
                        data-slot="custom-input"
                        className="h-8 border-0 p-0 shadow-none outline-none ring-0 focus-visible:border-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                        {...props}
                    />

                    {rightIcon && (
                        <IconSlot
                            {...rightIcon}
                            textColor={rightIconColor ?? rightIcon.textColor}
                        />
                    )}
                </div>

                {errorMessage && (
                    <FieldDescription className="text-destructive">
                        {errorMessage}
                    </FieldDescription>
                )}
            </div>
        );
    },
);

CustomInput.displayName = "CustomInput";

export { CustomInput, customInputVariants };
