import { AppSidebar, AppSidebarProvider } from "@/components/app-sidebar"
import { Topbar } from "@/components/topbar"
import type { Metadata } from "next";
import React from "react"

export const metadata: Metadata = {
    title: "Vendor Management",
    description: "Vendor Management",
    icons: {
        icon: "/logo.svg",
    },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppSidebarProvider>
            <div className="dashboard-layout">
                <AppSidebar />
                <div className="dashboard-content">
                    <Topbar />
                    <main className="dashboard-main">{children}</main>
                </div>
            </div>
        </AppSidebarProvider>
    )
}
