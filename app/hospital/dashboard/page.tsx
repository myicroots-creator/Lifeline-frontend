"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropletIcon, AlertTriangle, Users, FileUp, Plus, Download, Activity, Calendar } from "lucide-react"
import { InventoryTable } from "@/components/hospital/inventory-table"
import { DonorTable } from "@/components/hospital/donor-table"
import { PredictionsCard } from "@/components/hospital/predictions-card"
import { AlertsCard } from "@/components/hospital/alerts-card"
import { FileUploadDialog } from "@/components/hospital/file-upload-dialog"
import { AddInventoryDialog } from "@/components/hospital/add-inventory-dialog"
import { RequestBloodDialog } from "@/components/hospital/request-blood-dialog"
import { HospitalLayout } from "@/components/hospital/hospital-layout"

export default function HospitalDashboard() {
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [showAddInventory, setShowAddInventory] = useState(false)
  const [showRequestBlood, setShowRequestBlood] = useState(false)

  // Mock data for dashboard stats
  const stats = {
    totalUnits: 1247,
    criticalTypes: 3,
    expiringUnits: 12,
    activeDonors: 856,
  }

  return (
    <HospitalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your blood bank operations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowFileUpload(true)}>
              <FileUp className="mr-2 h-4 w-4" />
              Upload Data
            </Button>
            <Button onClick={() => setShowAddInventory(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Inventory
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Blood Units</CardTitle>
              <DropletIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUnits}</div>
              <p className="text-xs text-muted-foreground">Across all blood types</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.criticalTypes}</div>
              <p className="text-xs text-muted-foreground">Blood types below threshold</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.expiringUnits}</div>
              <p className="text-xs text-muted-foreground">Units expiring in 7 days</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeDonors}</div>
              <p className="text-xs text-muted-foreground">Eligible to donate</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts and Predictions */}
        <div className="grid gap-4 md:grid-cols-2">
          <AlertsCard />
          <PredictionsCard />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="inventory" className="space-y-4">
          <TabsList>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="donors">Donors</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Blood Inventory</CardTitle>
                    <CardDescription>Manage your blood stock and expiry dates</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <InventoryTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donors" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Donor Database</CardTitle>
                    <CardDescription>View and manage registered donors</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <DonorTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Blood Requests</CardTitle>
                    <CardDescription>Inter-hospital blood transfer requests</CardDescription>
                  </div>
                  <Button onClick={() => setShowRequestBlood(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Request
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No active requests</p>
                  <p className="text-sm">Request blood from nearby hospitals when needed</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>Download usage and wastage reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline" className="justify-start h-auto py-4 bg-transparent">
                    <div className="text-left">
                      <div className="font-semibold">Daily Usage Report</div>
                      <div className="text-sm text-muted-foreground">Blood consumption by type</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4 bg-transparent">
                    <div className="text-left">
                      <div className="font-semibold">Wastage Analysis</div>
                      <div className="text-sm text-muted-foreground">Expired units tracking</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4 bg-transparent">
                    <div className="text-left">
                      <div className="font-semibold">Donor Activity</div>
                      <div className="text-sm text-muted-foreground">Donation frequency report</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4 bg-transparent">
                    <div className="text-left">
                      <div className="font-semibold">Monthly Summary</div>
                      <div className="text-sm text-muted-foreground">Comprehensive overview</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <FileUploadDialog open={showFileUpload} onOpenChange={setShowFileUpload} />
      <AddInventoryDialog open={showAddInventory} onOpenChange={setShowAddInventory} />
      <RequestBloodDialog open={showRequestBlood} onOpenChange={setShowRequestBlood} />
    </HospitalLayout>
  )
}
