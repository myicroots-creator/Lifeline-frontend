"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DonorLayout } from "@/components/donor/donor-layout"
import { User, Mail, Phone, MapPin, Heart } from "lucide-react"

export default function DonorProfile() {
  const [notifications, setNotifications] = useState({
    shortageAlerts: true,
    eligibilityReminders: true,
    achievementUpdates: true,
  })

  const handleSaveChanges = () => {
    console.log("[v0] Saving profile changes")
    alert("Profile updated successfully!")
  }

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <DonorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="name" defaultValue="John Doe" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" defaultValue="john.doe@example.com" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="location" defaultValue="New York, NY" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <div className="relative">
                <Heart className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="bloodType" defaultValue="O+" className="pl-10 font-mono" disabled />
              </div>
              <p className="text-xs text-muted-foreground">Contact support to update blood type</p>
            </div>

            <Button className="w-full" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Shortage Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when your blood type is needed</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => toggleNotification("shortageAlerts")}>
                {notifications.shortageAlerts ? "Enabled" : "Disabled"}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Eligibility Reminders</p>
                <p className="text-sm text-muted-foreground">Reminder when you can donate again</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => toggleNotification("eligibilityReminders")}>
                {notifications.eligibilityReminders ? "Enabled" : "Disabled"}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Achievement Updates</p>
                <p className="text-sm text-muted-foreground">Notifications for new achievements</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => toggleNotification("achievementUpdates")}>
                {notifications.achievementUpdates ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DonorLayout>
  )
}
