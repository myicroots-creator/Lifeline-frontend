"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, Home, Calendar, Award, User, Bell, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface DonorLayoutProps {
  children: React.ReactNode
}

export function DonorLayout({ children }: DonorLayoutProps) {
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/donor/dashboard", icon: Home },
    { name: "History", href: "/donor/history", icon: Calendar },
    { name: "Achievements", href: "/donor/achievements", icon: Award },
    { name: "Profile", href: "/donor/profile", icon: User },
  ]

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-6 w-6 text-primary-foreground fill-current" />
            </div>
            <span className="text-lg font-bold">Lifeline</span>
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

      {/* Main Content */}
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">{children}</main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card">
        <div className="flex justify-around items-center h-16 px-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href} className="flex-1">
                <Button
                  variant="ghost"
                  className={cn("w-full flex flex-col items-center gap-1 h-auto py-2", isActive && "text-primary")}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs">{item.name}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
