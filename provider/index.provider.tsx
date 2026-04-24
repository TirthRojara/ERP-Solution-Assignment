"use client";

import { Toaster } from "@/components/ui/sonner";
import TanStackProvider from "./tanStack.provider";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <TanStackProvider>
            <main>{children}</main>
            <Toaster
                position="top-center"
                richColors
                theme="system"
                style={{ zIndex: 99999 }}
            />
        </TanStackProvider>
    );
};

export default AppProvider;
