"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DonorLayout } from "@/components/donor/donor-layout"
import { Award, Trophy, Star, Heart, Target, Zap } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "First Donation",
    description: "Completed your first blood donation",
    icon: Heart,
    unlocked: true,
    date: "2023-02-15",
  },
  {
    id: 2,
    title: "Regular Donor",
    description: "Made 5 donations",
    icon: Star,
    unlocked: true,
    date: "2023-11-20",
  },
  {
    id: 3,
    title: "Gold Donor",
    description: "Made 10 donations",
    icon: Trophy,
    unlocked: true,
    date: "2024-08-10",
  },
  {
    id: 4,
    title: "Life Saver",
    description: "Helped save 30+ lives",
    icon: Target,
    unlocked: true,
    date: "2024-11-15",
  },
  {
    id: 5,
    title: "Platinum Donor",
    description: "Make 20 donations",
    icon: Award,
    unlocked: false,
    date: null,
  },
  {
    id: 6,
    title: "Emergency Hero",
    description: "Respond to 5 critical shortage alerts",
    icon: Zap,
    unlocked: false,
    date: null,
  },
]

export default function DonorAchievements() {
  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <DonorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Achievements</h1>
          <p className="text-muted-foreground">
            {unlockedCount} of {achievements.length} unlocked
          </p>
        </div>

        <Card className="border-border bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary mx-auto mb-4">
                <Trophy className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold mb-1">Gold Donor</div>
              <p className="text-muted-foreground">Current Level</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className={cn("border-border", !achievement.unlocked && "opacity-50")}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      achievement.unlocked ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <achievement.icon className="h-6 w-6" />
                  </div>
                  {achievement.unlocked && (
                    <Badge variant="outline" className="bg-accent/20 text-accent border-accent/30">
                      Unlocked
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{achievement.title}</CardTitle>
                <CardDescription>{achievement.description}</CardDescription>
              </CardHeader>
              {achievement.unlocked && achievement.date && (
                <CardContent>
                  <p className="text-xs text-muted-foreground">Unlocked on {achievement.date}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </DonorLayout>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
