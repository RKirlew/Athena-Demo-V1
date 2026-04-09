"use client"

import { Fragment } from "react"
import { ChevronDown, ChevronRight, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Incident, Category, Priority, Status } from "@/lib/types"
import { cn } from "@/lib/utils"

interface IncidentTableProps {
  incidents: Incident[]
  officers: string[]
  categories: Category[]
  priorities: Priority[]
  statuses: Status[]
  expandedIncidentId: string | null
  recentlyUpdatedId: string | null
  onAssignOfficer: (incidentId: string, officer: string | null) => void
  onUpdateStatus: (incidentId: string, status: Status) => void
  onToggleExpand: (incidentId: string) => void
}

function getPriorityColor(priority: Priority) {
  switch (priority) {
    case "High":
      return "bg-destructive/20 text-destructive border-destructive/30"
    case "Medium":
      return "bg-warning/20 text-warning border-warning/30"
    case "Low":
      return "bg-muted text-muted-foreground border-border"
    default:
      return "bg-muted text-muted-foreground border-border"
  }
}

function getStatusColor(status: Status) {
  switch (status) {
    case "New":
      return "bg-chart-2/20 text-chart-2 border-chart-2/30"
    case "In Progress":
      return "bg-primary/20 text-primary border-primary/30"
    case "Resolved":
      return "bg-muted text-muted-foreground border-border"
    default:
      return "bg-muted text-muted-foreground border-border"
  }
}

function getCategoryColor(category: Category) {
  switch (category) {
    case "Suspicious Activity":
      return "bg-destructive/10 text-destructive border-destructive/20"
    case "Noise Complaint":
      return "bg-warning/10 text-warning border-warning/20"
    case "Lost Item":
      return "bg-chart-2/10 text-chart-2 border-chart-2/20"
    case "General Inquiry":
      return "bg-muted text-muted-foreground border-border"
    default:
      return "bg-muted text-muted-foreground border-border"
  }
}

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return `${diffDays}d ago`
}

export function IncidentTable({
  incidents,
  officers,
  statuses,
  expandedIncidentId,
  recentlyUpdatedId,
  onAssignOfficer,
  onUpdateStatus,
  onToggleExpand,
}: IncidentTableProps) {
  return (
    <Card className="border-border bg-card">
  <CardHeader className="border-b border-border pb-4">
    <CardTitle className="text-lg font-semibold text-foreground">Incident Dashboard</CardTitle>
  </CardHeader>
  <CardContent className="p-0">
    {/* DESKTOP TABLE: Hidden on mobile, flex/table on medium+ screens */}
    <div className="hidden md:block overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-8 text-muted-foreground"></TableHead>
            <TableHead className="text-muted-foreground">ID</TableHead>
            <TableHead className="text-muted-foreground">Caller</TableHead>
            <TableHead className="text-muted-foreground">Category</TableHead>
            <TableHead className="text-muted-foreground">Priority</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Assigned Officer</TableHead>
            <TableHead className="text-muted-foreground">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.map((incident) => (
            <Fragment key={incident.id}>
              <TableRow
                className={cn(
                  "border-border cursor-pointer transition-colors",
                  recentlyUpdatedId === incident.id && "animate-pulse bg-primary/10",
                  expandedIncidentId === incident.id && "bg-secondary"
                )}
                onClick={() => onToggleExpand(incident.id)}
              >
                <TableCell className="text-muted-foreground">
                  {expandedIncidentId === incident.id ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </TableCell>
                <TableCell className="font-mono text-sm text-foreground">{incident.id}</TableCell>
                <TableCell className="text-foreground">{incident.caller}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("text-xs", getCategoryColor(incident.category))}>
                    {incident.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("text-xs", getPriorityColor(incident.priority))}>
                    {incident.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select
                    value={incident.status}
                    onValueChange={(value) => onUpdateStatus(incident.id, value as Status)}
                  >
                    <SelectTrigger
                      className={cn("h-7 w-[120px] text-xs", getStatusColor(incident.status))}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={incident.assignedOfficer || "unassigned"}
                    onValueChange={(value) => onAssignOfficer(incident.id, value === "unassigned" ? null : value)}
                  >
                    <SelectTrigger className="h-7 w-[160px] text-xs" onClick={(e) => e.stopPropagation()}>
                      <SelectValue>
                        {incident.assignedOfficer ? (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {incident.assignedOfficer}
                          </span>
                        ) : <span className="text-muted-foreground">Unassigned</span>}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {officers.map((officer) => (
                        <SelectItem key={officer} value={officer}>{officer}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {formatTimestamp(incident.timestamp)}
                </TableCell>
              </TableRow>
              {expandedIncidentId === incident.id && (
                <TableRow className="border-border bg-secondary/50">
                  <TableCell colSpan={8} className="p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border border-border bg-card p-4">
                        <h4 className="mb-2 text-sm font-medium text-primary">Call Transcript</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed break-words whitespace-pre-wrap">{incident.transcript}</p>
                      </div>
                      <div className="rounded-lg border border-border bg-card p-4">
                        <h4 className="mb-2 text-sm font-medium text-primary">AI Summary</h4>
                        <p className="text-sm text-foreground leading-relaxed break-words whitespace-pre-wrap">{incident.summary}</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* MOBILE STACK: Shown on small screens, hidden on medium+ */}
    <div className="md:hidden divide-y divide-border">
      {incidents.map((incident) => (
        <div 
          key={incident.id} 
          className={cn(
            "p-4 flex flex-col gap-3 transition-colors",
            recentlyUpdatedId === incident.id && "animate-pulse bg-primary/10",
            expandedIncidentId === incident.id && "bg-secondary/30"
          )}
          onClick={() => onToggleExpand(incident.id)}
        >
          {/* Header row: ID and Time */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="font-mono text-xs text-muted-foreground">{incident.id}</span>
              <span className="font-semibold text-foreground">{incident.caller}</span>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase">
              {formatTimestamp(incident.timestamp)}
            </span>
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={cn("text-[10px] px-2 py-0", getCategoryColor(incident.category))}>
              {incident.category}
            </Badge>
            <Badge variant="outline" className={cn("text-[10px] px-2 py-0", getPriorityColor(incident.priority))}>
              {incident.priority}
            </Badge>
          </div>

          {/* Controls row */}
          <div className="grid grid-cols-2 gap-2">
            <Select
              value={incident.status}
              onValueChange={(value) => onUpdateStatus(incident.id, value as Status)}
            >
              <SelectTrigger 
                className={cn("h-8 text-[11px]", getStatusColor(incident.status))}
                onClick={(e) => e.stopPropagation()}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={incident.assignedOfficer || "unassigned"}
              onValueChange={(value) => onAssignOfficer(incident.id, value === "unassigned" ? null : value)}
            >
              <SelectTrigger className="h-8 text-[11px]" onClick={(e) => e.stopPropagation()}>
                <SelectValue placeholder="Officer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {officers.map((officer) => (
                  <SelectItem key={officer} value={officer}>{officer}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Expanded Detail View */}
          {expandedIncidentId === incident.id && (
            <div className="mt-2 space-y-3 pt-3 border-t border-border/50 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-primary">AI Summary</span>
                <p className="text-xs text-foreground leading-snug">{incident.summary}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Full Transcript</span>
                <p className="text-xs text-muted-foreground leading-snug line-clamp-4 italic">"{incident.transcript}"</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </CardContent>
</Card>
  )     
}
