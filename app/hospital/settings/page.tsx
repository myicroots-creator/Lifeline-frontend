"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HospitalLayout } from "@/components/hospital/hospital-layout"
import { Building2, Mail, Phone, MapPin, Bell } from "lucide-react"

export default function HospitalSettings() {
  return (
    <HospitalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your hospital profile and preferences</p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Hospital Information</CardTitle>
            <CardDescription>Update your hospital details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hospitalName">Hospital Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="hospitalName" defaultValue="City General Hospital" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" defaultValue="contact@citygeneral.med" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="phone" type="tel" defaultValue="+1 (555) 987-6543" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="address" defaultValue="123 Medical Plaza, New York, NY 10001" className="pl-10" />
              </div>
            </div>

            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Alert Preferences</CardTitle>
            <CardDescription>Configure when and how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Low Stock Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when blood types fall below threshold</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Enabled
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Expiry Warnings</p>
                  <p className="text-sm text-muted-foreground">Alerts for units expiring within 7 days</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Enabled
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Request Notifications</p>
                  <p className="text-sm text-muted-foreground">New blood requests from other hospitals</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Enabled
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">AI Predictions</p>
                  <p className="text-sm text-muted-foreground">Forecasted shortage alerts</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Enabled
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </HospitalLayout>
  )
}
