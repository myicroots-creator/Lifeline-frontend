"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminLayout } from "@/components/admin/admin-layout"
import { HospitalApprovalTable } from "@/components/admin/hospital-approval-table"
import { SystemLogsTable } from "@/components/admin/system-logs-table"
import { Building2, Users, Activity, AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  const stats = {
    totalHospitals: 47,
    pendingApprovals: 5,
    activeDonors: 2847,
    systemAlerts: 2,
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hospitals</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalHospitals}</div>
              <p className="text-xs text-muted-foreground">Active on platform</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <AlertCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeDonors}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.systemAlerts}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="approvals" className="space-y-4">
          <TabsList>
            <TabsTrigger value="approvals">Hospital Approvals</TabsTrigger>
            <TabsTrigger value="hospitals">All Hospitals</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="approvals" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Pending Hospital Approvals</CardTitle>
                <CardDescription>Review and approve new hospital registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <HospitalApprovalTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hospitals" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>All Hospitals</CardTitle>
                <CardDescription>Manage registered hospitals on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>47 hospitals registered</p>
                  <p className="text-sm">View detailed hospital information and activity</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>System Activity Logs</CardTitle>
                <CardDescription>Monitor system events and user activity</CardDescription>
              </CardHeader>
              <CardContent>
                <SystemLogsTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>System Reports</CardTitle>
                <CardDescription>Generate and download system-wide reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-border bg-card">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Platform Usage Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">Hospital and donor activity statistics</p>
                      <button className="text-sm text-primary hover:underline">Generate Report</button>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Blood Transfer Analytics</h3>
                      <p className="text-sm text-muted-foreground mb-4">Inter-hospital transfer statistics</p>
                      <button className="text-sm text-primary hover:underline">Generate Report</button>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Donor Engagement Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">Donor activity and retention metrics</p>
                      <button className="text-sm text-primary hover:underline">Generate Report</button>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">System Health Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">Uptime and performance metrics</p>
                      <button className="text-sm text-primary hover:underline">Generate Report</button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
