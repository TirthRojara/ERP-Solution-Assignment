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
      { title: "Dashboard", url: "/coming-soon" },
      { title: "Quick Actions", url: "/coming-soon" },
      { title: "Recent Activities", url: "/coming-soon" },
      { title: "Notifications", url: "/coming-soon" },
    ],
  },
  {
    id: "accounting",
    title: "Accounting",
    icon: "/accounting.svg",
    items: [
      { title: "Accounts Dashboard", url: "/coming-soon" },
      { title: "Chart of Accounts", url: "/coming-soon" },
      { title: "Journal Entry", url: "/coming-soon" },
      { title: "Payment Entry", url: "/coming-soon" },
      { title: "General Ledger", url: "/coming-soon" },
      { title: "Profit & Loss", url: "/coming-soon" },
      { title: "Balance Sheet", url: "/coming-soon" },
      { title: "Financial Reports", url: "/coming-soon" },
    ],
  },
  {
    id: "inventory",
    title: "Inventory",
    icon: "/inventory.svg",
    items: [
      { title: "Stock Dashboard", url: "/coming-soon" },
      { title: "Stock Entry", url: "/coming-soon" },
      { title: "Material Request", url: "/coming-soon" },
      { title: "Delivery Note", url: "/coming-soon" },
      { title: "Stock Reconciliation", url: "/coming-soon" },
      { title: "Inventory Reports", url: "/coming-soon" },
    ],
  },
  {
    id: "purchase",
    title: "Purchase",
    icon: "/purchase.svg",
    invertedIcon: true,
    items: [
      { title: "Purchase Dashboard", url: "/coming-soon" },
      { title: "Vendor", url: "/vendor" },
      { title: "Request for Quotation", url: "/coming-soon" },
      { title: "Purchase Order", url: "/coming-soon" },
      { title: "Purchase Return", url: "/coming-soon" },
      { title: "Free Text Purchase", url: "/coming-soon" },
      { title: "Vendor Payment", url: "/coming-soon" },
      { title: "Purchase Reports", url: "/coming-soon" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: "/analytics.svg",
    items: [
      { title: "Sales Analytics", url: "/coming-soon" },
      { title: "Purchase Analytics", url: "/coming-soon" },
      { title: "Inventory Analytics", url: "/coming-soon" },
      { title: "Financial Analytics", url: "/coming-soon" },
      { title: "Vendor Performance", url: "/coming-soon" },
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
        if (item.url !== "#" && item.url !== "/coming-soon" && path.startsWith(item.url)) {
          return section.id
        }
      }
    }
    return navSections[0].id
  }, [])

  const [activeSection, setActiveSection] = React.useState(() => {
    if (pathname === "/coming-soon") return "workspace" // default if loaded directly on coming-soon
    return getActiveSectionFromPath(pathname)
  })

  // Update active section when pathname changes
  React.useEffect(() => {
    if (pathname !== "/coming-soon") {
      setActiveSection(getActiveSectionFromPath(pathname))
    }
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
          const isActive = item.url !== "#" && item.url !== "/coming-soon" && pathname.startsWith(item.url)
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

