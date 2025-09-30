"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DonorLayout } from "@/components/donor/donor-layout"
import { Calendar, CheckCircle2 } from "lucide-react"

const donationHistory = [
  {
    id: 1,
    date: "2024-11-15",
    hospital: "City General Hospital",
    bloodType: "O+",
    units: 1,
    status: "completed",
  },
  {
    id: 2,
    date: "2024-08-10",
    hospital: "Memorial Medical Center",
    bloodType: "O+",
    units: 1,
    status: "completed",
  },
  {
    id: 3,
    date: "2024-05-22",
    hospital: "City General Hospital",
    bloodType: "O+",
    units: 1,
    status: "completed",
  },
  {
    id: 4,
    date: "2024-02-18",
    hospital: "St. Mary's Hospital",
    bloodType: "O+",
    units: 1,
    status: "completed",
  },
  {
    id: 5,
    date: "2023-11-05",
    hospital: "City General Hospital",
    bloodType: "O+",
    units: 1,
    status: "completed",
  },
]

export default function DonorHistory() {
  return (
    <DonorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Donation History</h1>
          <p className="text-muted-foreground">Your complete donation record</p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Total Donations</CardTitle>
            <CardDescription>You've made {donationHistory.length} life-saving donations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {donationHistory.map((donation) => (
              <div key={donation.id} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{donation.hospital}</p>
                    <Badge variant="outline" className="bg-accent/20 text-accent border-accent/30 font-mono">
                      {donation.bloodType}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {donation.date}
                    </span>
                    <span>{donation.units} unit</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DonorLayout>
  )
}
