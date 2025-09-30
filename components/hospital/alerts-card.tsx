import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Clock, TrendingDown } from "lucide-react"

const mockAlerts = [
  {
    id: 1,
    type: "critical",
    message: "O- blood type critically low",
    time: "2 hours ago",
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: "warning",
    message: "12 units expiring in 3 days",
    time: "5 hours ago",
    icon: Clock,
  },
  {
    id: 3,
    type: "info",
    message: "AB- stock below optimal level",
    time: "1 day ago",
    icon: TrendingDown,
  },
]

export function AlertsCard() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Active Alerts</CardTitle>
        <CardDescription>Critical notifications requiring attention</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                alert.type === "critical"
                  ? "bg-primary/10 text-primary"
                  : alert.type === "warning"
                    ? "bg-yellow-500/10 text-yellow-500"
                    : "bg-accent/10 text-accent"
              }`}
            >
              <alert.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{alert.message}</p>
              <p className="text-xs text-muted-foreground">{alert.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
