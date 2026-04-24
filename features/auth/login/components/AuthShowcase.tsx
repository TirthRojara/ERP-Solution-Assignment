"use client";

import React from "react";
import {
    UserCheck,
    CreditCard,
    FileText,
    ChartColumnBig,
    ShieldCheck,
    Database,
} from "lucide-react";

const LUCIDE_ICON_MAP = {
    UserCheck,
    CreditCard,
    FileText,
    ChartColumnBig,
    ShieldCheck,
    Database,
};

type IconType = keyof typeof LUCIDE_ICON_MAP;

// DATA
const FEATURES: { icon: IconType; text: string }[] = [
    {
        icon: "UserCheck",
        text: "Manage all vendor data and operations from a single platform",
    },
    {
        icon: "CreditCard",
        text: "Track outstanding, overdue and completed payments in real time",
    },
    {
        icon: "FileText",
        text: "Handle purchase orders, returns, and vendor transactions effectively",
    },
    {
        icon: "ChartColumnBig",
        text: "Analyze vendor activity and operational performance",
    },
    {
        icon: "ShieldCheck",
        text: "Maintain vendor agreements and ensure compliance standards",
    },
    {
        icon: "Database",
        text: "Access all vendor information in one centralized system",
    },
];

const LoginSideSection: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col justify-between bg-primary rounded-2xl p-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:14px_14px]" />

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-12">
                {/* Heading */}
                <div className="flex flex-col items-center gap-3">
                    <h2 className="text-3xl text-center font-semibold text-secondary">
                        Vendor Operations Management
                    </h2>
                    <p className="text-sm max-w-[420px] text-center text-secondary/80 leading-relaxed">
                        Manage vendors, track payments, and streamline
                        procurement processes within a unified enterprise
                        platform.
                    </p>
                </div>

                {/* Features */}
                <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
                    {FEATURES.map((item, index) => {
                        const LucideIcon = LUCIDE_ICON_MAP[item.icon];

                        return (
                            <div
                                key={index}
                                className="flex flex-col gap-5 p-6 rounded-2xl bg-ring/20 border border-primary-foreground/10 hover:bg-ring/50 transition-all duration-300 backdrop-blur-md"
                            >
                                {/* ICON  */}
                                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary shrink-0 shadow-sm">
                                    <LucideIcon
                                        className="w-5 h-5"
                                        strokeWidth={2.5}
                                    />
                                </div>

                                <p className="text-sm text-secondary/90 font-medium leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-y-2 md:gap-0 md:flex-row relative z-10 justify-between items-center text-secondary/70 text-xs w-full mt-8">
                <p>© 2026 Sterling Cloud. All rights reserved.</p>
                <div className="flex items-center gap-3 ">
                    <a
                        href="#"
                        className="hover:text-primary-foreground transition-colors"
                    >
                        Privacy Policy
                    </a>
                    <span className="opacity-50 text-[10px]">•</span>
                    <a
                        href="#"
                        className="hover:text-primary-foreground transition-colors"
                    >
                        Terms & Conditions
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginSideSection;
