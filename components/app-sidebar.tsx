"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import "./app-sidebar.css"

// Navigation data
const navSections = [
  {
    id: "workspace",
    title: "Workspace",
    icon: "/workspace.svg",
    items: [
      { title: "Dashboard", url: "/dashboard" },
      { title: "Quick Actions", url: "/quick-actions" },
      { title: "Recent Activities", url: "/activities" },
      { title: "Notifications", url: "/notifications" },
    ],
  },
  {
    id: "accounting",
    title: "Accounting",
    icon: "/accounting.svg",
    items: [
      { title: "Accounts Dashboard", url: "#" },
      { title: "Chart of Accounts", url: "#" },
      { title: "Journal Entry", url: "#" },
      { title: "Payment Entry", url: "#" },
      { title: "General Ledger", url: "#" },
      { title: "Profit & Loss", url: "#" },
      { title: "Balance Sheet", url: "#" },
      { title: "Financial Reports", url: "#" },
    ],
  },
  {
    id: "inventory",
    title: "Inventory",
    icon: "/inventory.svg",
    items: [
      { title: "Stock Dashboard", url: "#" },
      { title: "Stock Entry", url: "#" },
      { title: "Material Request", url: "#" },
      { title: "Delivery Note", url: "#" },
      { title: "Stock Reconciliation", url: "#" },
      { title: "Inventory Reports", url: "#" },
    ],
  },
  {
    id: "purchase",
    title: "Purchase",
    icon: "/purchase.svg",
    invertedIcon: true,
    items: [
      { title: "Purchase Dashboard", url: "#" },
      { title: "Vendor", url: "/vendor" },
      { title: "Request for Quotation", url: "#" },
      { title: "Purchase Order", url: "#" },
      { title: "Purchase Return", url: "#" },
      { title: "Free Text Purchase", url: "#" },
      { title: "Vendor Payment", url: "#" },
      { title: "Purchase Reports", url: "#" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: "/analytics.svg",
    items: [
      { title: "Sales Analytics", url: "/analytics/sales" },
      { title: "Purchase Analytics", url: "/analytics/purchase" },
      { title: "Inventory Analytics", url: "/analytics/inventory" },
      { title: "Financial Analytics", url: "/analytics/finance" },
      { title: "Vendor Performance", url: "/analytics/vendors" },
    ],
  },
]

// Context for sidebar state
type SidebarContextType = {
  activeSection: string
  setActiveSection: (id: string) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextType | null>(null)

export function useSidebarContext() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebarContext must be used within AppSidebarProvider")
  return ctx
}

export function AppSidebarProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  // Determine active section from pathname
  const getActiveSectionFromPath = React.useCallback((path: string) => {
    for (const section of navSections) {
      for (const item of section.items) {
        if (item.url !== "#" && path.startsWith(item.url)) {
          return section.id
        }
      }
    }
    return navSections[0].id
  }, [])

  const [activeSection, setActiveSection] = React.useState(() =>
    getActiveSectionFromPath(pathname)
  )

  // Update active section when pathname changes
  React.useEffect(() => {
    setActiveSection(getActiveSectionFromPath(pathname))
  }, [pathname, getActiveSectionFromPath])

  // Close mobile sidebar on navigation
  React.useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile sidebar is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const value = React.useMemo(
    () => ({ activeSection, setActiveSection, mobileOpen, setMobileOpen }),
    [activeSection, mobileOpen]
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

// The icon strip (narrow left column)
function IconStrip() {
  const { activeSection, setActiveSection } = useSidebarContext()

  return (
    <div className="icon-strip">
      {navSections.map((section) => {
        const isActive = activeSection === section.id
        return (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={cn("icon-strip-btn", isActive && "icon-strip-btn--active")}
            title={section.title}
            aria-label={section.title}
          >
            <Image
              src={section.icon}
              alt={section.title}
              width={22}
              height={22}
              className={cn(
                "icon-strip-img",
                isActive && "icon-strip-img--active",
                section.invertedIcon && "icon-strip-img--inverted"
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

// The submenu panel (wider right column showing items for active section)
function SubmenuPanel() {
  const { activeSection } = useSidebarContext()
  const pathname = usePathname()

  const section = navSections.find((s) => s.id === activeSection)
  if (!section) return null

  return (
    <div className="submenu-panel">
      <p className="submenu-section-label">{section.title}</p>
      <nav className="submenu-nav">
        {section.items.map((item) => {
          const isActive = item.url !== "#" && pathname.startsWith(item.url)
          return (
            <Link
              key={item.title}
              href={item.url}
              className={cn("submenu-link", isActive && "submenu-link--active")}
            >
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

// Brand header
function SidebarBrand() {
  const { mobileOpen, setMobileOpen } = useSidebarContext()

  return (
    <div className="sidebar-brand">
      <button
        className="sidebar-hamburger"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <div className="sidebar-brand-logo">
        <Image src="/logo.svg" alt="Sterling Cloud" width={32} height={28} />
      </div>
      <span className="sidebar-brand-text">Sterling Cloud</span>
    </div>
  )
}

// Mobile overlay
function MobileOverlay() {
  const { mobileOpen, setMobileOpen } = useSidebarContext()

  if (!mobileOpen) return null

  return (
    <div className="sidebar-mobile-overlay" onClick={() => setMobileOpen(false)} aria-hidden />
  )
}


// Main sidebar component
export function AppSidebar() {
  const { mobileOpen } = useSidebarContext()

  return (
    <>
      <MobileOverlay />
      <aside className={cn("app-sidebar", mobileOpen && "app-sidebar--mobile-open")}>
        <SidebarBrand />
        <div className="sidebar-body">
          <IconStrip />
          <SubmenuPanel />
        </div>
      </aside>
    </>
  )
}

