"use client"

import { Phone, Sparkles, AlertTriangle, Tag, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import type { TranscriptData } from "@/lib/types"
import { cn } from "@/lib/utils"

interface IncomingCallModalProps {
  isOpen: boolean
  onClose: () => void
  transcript: TranscriptData | null
  isProcessing: boolean
  onAddIncident: () => void
}

function getPriorityColor(priority: string) {
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

function getCategoryColor(category: string) {
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

export function IncomingCallModal({
  isOpen,
  onClose,
  transcript,
  isProcessing,
  onAddIncident,
}: IncomingCallModalProps) {
  if (!transcript) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            Incoming Call
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Caller Info */}
          <div className="rounded-lg border border-border bg-secondary/50 p-3">
            <p className="text-xs text-muted-foreground">Caller</p>
            <p className="font-medium text-foreground">{transcript.caller}</p>
          </div>

          {/* Transcript */}
          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileText className="h-4 w-4" />
              Call Transcript
            </div>
            <p className="text-sm text-foreground leading-relaxed">{transcript.transcript}</p>
          </div>

          {/* AI Processing */}
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI Analysis</span>
            </div>

            {isProcessing ? (
              <div className="flex items-center justify-center gap-2 py-4">
                <Spinner className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Processing call...</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <Badge variant="outline" className={cn("text-xs", getCategoryColor(transcript.aiOutput.category))}>
                    {transcript.aiOutput.category}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Priority:</span>
                  <Badge variant="outline" className={cn("text-xs", getPriorityColor(transcript.aiOutput.priority))}>
                    {transcript.aiOutput.priority}
                  </Badge>
                </div>

                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Summary:</p>
                  <p className="text-sm text-foreground leading-relaxed">{transcript.aiOutput.summary}</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Dismiss
            </Button>
            <Button onClick={onAddIncident} disabled={isProcessing} className="flex-1">
              Add to Dashboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
