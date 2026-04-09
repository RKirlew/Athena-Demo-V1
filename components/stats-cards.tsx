import { AlertTriangle, CheckCircle2, Clock, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Incident } from "@/lib/types"

interface StatsCardsProps {
  incidents: Incident[]
}

export function StatsCards({ incidents }: StatsCardsProps) {
  const totalIncidents = incidents.length
  const newIncidents = incidents.filter((i) => i.status === "New").length
  const inProgressIncidents = incidents.filter((i) => i.status === "In Progress").length
  const highPriorityIncidents = incidents.filter((i) => i.priority === "High" && i.status !== "Resolved").length

  const stats = [
    {
      label: "Total Incidents",
      value: totalIncidents,
      icon: FileText,
      color: "text-foreground",
      bgColor: "bg-secondary",
    },
    {
      label: "New",
      value: newIncidents,
      icon: Clock,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      label: "In Progress",
      value: inProgressIncidents,
      icon: CheckCircle2,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "High Priority",
      value: highPriorityIncidents,
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ]

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
