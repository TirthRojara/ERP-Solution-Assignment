"use client"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="cursor-default hover:bg-transparent"
        >
          <div className="flex items-center justify-center size-8">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="20" height="20" rx="4" transform="rotate(10 14 14)" fill="#2DB78A" />
              <rect x="8" y="8" width="16" height="16" rx="3" transform="rotate(10 16 16)" fill="#3CC99C" opacity="0.8" />
            </svg>
          </div>
          <span className="truncate font-semibold text-base">Sterling Cloud</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
