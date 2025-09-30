import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const mockPredictions = [
  { bloodType: "O-", prediction: "Shortage in 3 days", trend: "down", confidence: 92 },
  { bloodType: "A+", prediction: "Stable for 2 weeks", trend: "stable", confidence: 88 },
  { bloodType: "B-", prediction: "Increasing demand", trend: "up", confidence: 85 },
]

export function PredictionsCard() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>AI Predictions</CardTitle>
        <CardDescription>Forecasted shortages and demand patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockPredictions.map((pred) => (
          <div
            key={pred.bloodType}
            className="flex items-center justify-between p-3 rounded-lg bg-card border border-border"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  pred.trend === "down"
                    ? "bg-primary/10 text-primary"
                    : pred.trend === "up"
                      ? "bg-yellow-500/10 text-yellow-500"
                      : "bg-accent/10 text-accent"
                }`}
              >
                {pred.trend === "down" ? (
                  <TrendingDown className="h-4 w-4" />
                ) : pred.trend === "up" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <Minus className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium font-mono">{pred.bloodType}</p>
                <p className="text-xs text-muted-foreground">{pred.prediction}</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
              {pred.confidence}% confidence
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
