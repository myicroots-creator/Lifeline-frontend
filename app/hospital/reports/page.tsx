"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HospitalLayout } from "@/components/hospital/hospital-layout"
import { Download, FileText, TrendingUp, Users, DropletIcon } from "lucide-react"

export default function HospitalReports() {
  const reports = [
    {
      title: "Daily Usage Report",
      description: "Blood consumption by type for the last 24 hours",
      icon: DropletIcon,
      color: "text-primary",
    },
    {
      title: "Wastage Analysis",
      description: "Expired units and wastage trends over time",
      icon: TrendingUp,
      color: "text-yellow-500",
    },
    {
      title: "Donor Activity Report",
      description: "Donation frequency and donor engagement metrics",
      icon: Users,
      color: "text-accent",
    },
    {
      title: "Monthly Summary",
      description: "Comprehensive overview of all operations",
      icon: FileText,
      color: "text-blue-500",
    },
  ]

  return (
    <HospitalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Download usage and wastage reports</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {reports.map((report, index) => (
            <Card key={index} className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-muted ${report.color}`}>
                    <report.icon className="h-6 w-6" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
                <CardTitle className="text-lg">{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Custom Report Builder</CardTitle>
            <CardDescription>Generate custom reports with specific date ranges and filters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Custom report builder coming soon</p>
              <p className="text-sm">Create tailored reports based on your specific needs</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </HospitalLayout>
  )
}
