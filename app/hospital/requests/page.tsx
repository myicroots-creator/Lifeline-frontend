"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { HospitalLayout } from "@/components/hospital/hospital-layout"
import { RequestBloodDialog } from "@/components/hospital/request-blood-dialog"
import { Plus, Clock, CheckCircle2, XCircle, Send, Inbox, MapPin, Calendar } from "lucide-react"

const mockOutgoingRequests = [
  {
    id: 1,
    bloodType: "O-",
    units: 5,
    urgency: "critical",
    hospital: "Memorial Medical Center",
    distance: "3.2 km",
    status: "pending",
    createdAt: "2025-01-30 14:30",
    notes: "Emergency surgery scheduled",
  },
  {
    id: 2,
    bloodType: "AB+",
    units: 3,
    urgency: "urgent",
    hospital: "St. Mary's Hospital",
    distance: "5.8 km",
    status: "approved",
    createdAt: "2025-01-30 10:15",
    notes: "Routine transfusion",
  },
  {
    id: 3,
    bloodType: "B-",
    units: 2,
    urgency: "normal",
    hospital: "Valley Health Center",
    distance: "8.1 km",
    status: "rejected",
    createdAt: "2025-01-29 16:45",
    notes: "Planned procedure",
  },
]

const mockIncomingRequests = [
  {
    id: 4,
    bloodType: "A+",
    units: 4,
    urgency: "urgent",
    hospital: "Riverside Medical Center",
    distance: "4.5 km",
    status: "pending",
    createdAt: "2025-01-30 15:20",
    notes: "Multiple trauma patients",
  },
  {
    id: 5,
    bloodType: "O+",
    units: 6,
    urgency: "critical",
    hospital: "Lakeside Community Hospital",
    distance: "6.2 km",
    status: "pending",
    createdAt: "2025-01-30 13:45",
    notes: "Critical shortage - maternal emergency",
  },
]

export default function HospitalRequests() {
  const [showRequestDialog, setShowRequestDialog] = useState(false)
  const [incomingRequests, setIncomingRequests] = useState(mockIncomingRequests)

  const handleApprove = (id: number) => {
    setIncomingRequests(incomingRequests.map((req) => (req.id === id ? { ...req, status: "approved" } : req)))
  }

  const handleReject = (id: number) => {
    setIncomingRequests(incomingRequests.map((req) => (req.id === id ? { ...req, status: "rejected" } : req)))
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-primary/20 text-primary border-primary/30"
      case "urgent":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "normal":
        return "bg-accent/20 text-accent border-accent/30"
      default:
        return ""
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-accent/20 text-accent border-accent/30"
      case "rejected":
        return "bg-primary/20 text-primary border-primary/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      default:
        return ""
    }
  }

  return (
    <HospitalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Blood Requests</h1>
            <p className="text-muted-foreground">Manage inter-hospital blood transfers</p>
          </div>
          <Button onClick={() => setShowRequestDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{incomingRequests.filter((r) => r.status === "pending").length}</div>
              <p className="text-xs text-muted-foreground">Awaiting your response</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {[...mockOutgoingRequests, ...incomingRequests].filter((r) => r.status === "approved").length}
              </div>
              <p className="text-xs text-muted-foreground">Successful transfers</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockOutgoingRequests.length + incomingRequests.length}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Requests Tabs */}
        <Tabs defaultValue="incoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="incoming">
              <Inbox className="mr-2 h-4 w-4" />
              Incoming ({incomingRequests.filter((r) => r.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="outgoing">
              <Send className="mr-2 h-4 w-4" />
              Outgoing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="incoming" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Incoming Requests</CardTitle>
                <CardDescription>Requests from other hospitals for blood units</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {incomingRequests.map((request) => (
                  <Card key={request.id} className="border-border bg-card">
                    <CardContent className="pt-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-lg">{request.hospital}</h3>
                            <Badge variant="outline" className={getUrgencyColor(request.urgency)}>
                              {request.urgency}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Blood Type</p>
                              <p className="font-semibold font-mono text-lg">{request.bloodType}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Units Needed</p>
                              <p className="font-semibold text-lg">{request.units}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Distance</p>
                              <p className="font-semibold flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {request.distance}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Requested</p>
                              <p className="font-semibold flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {request.createdAt.split(" ")[1]}
                              </p>
                            </div>
                          </div>

                          {request.notes && (
                            <div className="p-3 rounded-lg bg-muted">
                              <p className="text-sm text-muted-foreground">Notes:</p>
                              <p className="text-sm">{request.notes}</p>
                            </div>
                          )}
                        </div>

                        {request.status === "pending" && (
                          <div className="flex lg:flex-col gap-2">
                            <Button onClick={() => handleApprove(request.id)} className="flex-1 lg:flex-none">
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleReject(request.id)}
                              className="flex-1 lg:flex-none bg-transparent"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outgoing" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Outgoing Requests</CardTitle>
                <CardDescription>Your requests to other hospitals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockOutgoingRequests.map((request) => (
                  <Card key={request.id} className="border-border bg-card">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg">{request.hospital}</h3>
                          <Badge variant="outline" className={getUrgencyColor(request.urgency)}>
                            {request.urgency}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Blood Type</p>
                            <p className="font-semibold font-mono text-lg">{request.bloodType}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Units Requested</p>
                            <p className="font-semibold text-lg">{request.units}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Distance</p>
                            <p className="font-semibold flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {request.distance}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Sent</p>
                            <p className="font-semibold flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {request.createdAt.split(" ")[1]}
                            </p>
                          </div>
                        </div>

                        {request.notes && (
                          <div className="p-3 rounded-lg bg-muted">
                            <p className="text-sm text-muted-foreground">Notes:</p>
                            <p className="text-sm">{request.notes}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <RequestBloodDialog open={showRequestDialog} onOpenChange={setShowRequestDialog} />
    </HospitalLayout>
  )
}
