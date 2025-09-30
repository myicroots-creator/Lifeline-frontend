"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, LayoutDashboard, DropletIcon, Users, Activity, FileText, Settings, Bell, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface HospitalLayoutProps {
  children: React.ReactNode
}

export function HospitalLayout({ children }: HospitalLayoutProps) {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/hospital/dashboard", icon: LayoutDashboard },
    { name: "Inventory", href: "/hospital/inventory", icon: DropletIcon },
    { name: "Donors", href: "/hospital/donors", icon: Users },
    { name: "Requests", href: "/hospital/requests", icon: Activity },
    { name: "Reports", href: "/hospital/reports", icon: FileText },
    { name: "Settings", href: "/hospital/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-6 w-6 text-primary-foreground fill-current" />
            </div>
            <div>
              <span className="text-lg font-bold">Lifeline</span>
              <div className="text-xs text-muted-foreground">City General Hospital</div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            </Button>
            <Link href="/auth/login">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card">
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn("w-full justify-start", isActive && "bg-secondary")}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
