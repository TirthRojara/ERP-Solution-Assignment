"use client"

import { Menu } from "lucide-react"
import { useSidebarContext } from "./app-sidebar"
import "./topbar.css"

export function Topbar() {
  const { mobileOpen, setMobileOpen } = useSidebarContext()

  return (
    <div className="topbar">
      <button
        className="mobile-menu-trigger"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        style={{ display: mobileOpen ? 'none' : undefined }}
      >
        <Menu size={20} />
      </button>
      <div className="topbar-spacer" />
      <div className="topbar-profile">
        <div className="avatar-container">
          <img 
            src="https://i.pravatar.cc/150?img=11" 
            alt="Robbi Darwis" 
            className="avatar" 
          />
          <span className="online-indicator"></span>
        </div>
        <div className="profile-info">
          <span className="profile-name">Robbi Darwis</span>
          <span className="profile-role">Admin</span>
        </div>
      </div>
    </div>
  )
}
