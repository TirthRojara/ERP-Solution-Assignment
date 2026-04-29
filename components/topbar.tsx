"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, LogOut, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSidebarContext } from "./app-sidebar"
import "./topbar.css"
import { useLogout } from "@/features/auth/login/api/hooks"

export function Topbar() {
  const { mobileOpen, setMobileOpen } = useSidebarContext()
  const [profileOpen, setProfileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { mutate: logoutMutate } = useLogout()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    logoutMutate(
      undefined,
      {
        onSuccess: () => {
          router.push("/")
        },
      }
    )
  }

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
      <div className="topbar-profile-container" ref={dropdownRef}>
        <div className="topbar-profile" onClick={() => setProfileOpen(!profileOpen)}>
          <div className="avatar-container">
            <img
              src="/avatar.jpg"
              alt="Robbi Darwis"
              className="avatar"
            />
            <span className="online-indicator"></span>
          </div>
          <div className="profile-info">
            <span className="profile-name">Robbi Darwis</span>
            <span className="profile-role">Admin</span>
          </div>
          <ChevronDown
            size={16}
            className={`text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`}
          />
        </div>

        {profileOpen && (
          <div className="profile-dropdown">
            <button className="profile-dropdown-item" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Log out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
