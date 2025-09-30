"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HospitalLayout } from "@/components/hospital/hospital-layout"
import { DonorTable } from "@/components/hospital/donor-table"
import { Download, UserPlus } from "lucide-react"

export default function HospitalDonors() {
  return (
    <HospitalLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Donor Database</h1>
            <p className="text-muted-foreground">View and manage registered donors</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Donor
            </Button>
          </div>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Registered Donors</CardTitle>
            <CardDescription>Complete donor records with eligibility status</CardDescription>
          </CardHeader>
          <CardContent>
            <DonorTable />
          </CardContent>
        </Card>
      </div>
    </HospitalLayout>
  )
}
