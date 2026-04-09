"use client"

import { useState, useCallback, useEffect } from "react" 
import { Header } from "@/components/header"
import { DemoGuidance } from "@/components/demo-guidance"
import { StatsCards } from "@/components/stats-cards"
import { IncidentTable } from "@/components/incident-table"
import { IncomingCallModal } from "@/components/incoming-call-modal"
import type { Incident } from "@/lib/types"
import { initialIncidents, sampleTranscripts, officers, categories, priorities, statuses } from "@/lib/mock-data"

export default function AthenaPage() {
  const [hasMounted, setHasMounted] = useState(false) // Hydration fix
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents)
  const [isCallModalOpen, setIsCallModalOpen] = useState(false)
  const [currentTranscript, setCurrentTranscript] = useState<typeof sampleTranscripts[0] | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [expandedIncidentId, setExpandedIncidentId] = useState<string | null>(null)
  const [recentlyUpdatedId, setRecentlyUpdatedId] = useState<string | null>(null)

  // Wait until after the first render to display client-specific logic
  useEffect(() => {
    setHasMounted(true)
  }, [])

  const handleSimulateCall = useCallback(() => {
    // Math.random() is unstable during hydration
    const randomTranscript = sampleTranscripts[Math.floor(Math.random() * sampleTranscripts.length)]
    setCurrentTranscript(randomTranscript)
    setIsCallModalOpen(true)
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
    }, 2000)
  }, [])

  const handleAddIncident = useCallback(() => {
    if (!currentTranscript) return

    const newIncident: Incident = {
      id: `INC-${String(incidents.length + 1).padStart(3, "0")}`,
      caller: currentTranscript.caller,
      category: currentTranscript.aiOutput.category,
      priority: currentTranscript.aiOutput.priority,
      status: "New",
      assignedOfficer: null,
      transcript: currentTranscript.transcript,
      summary: currentTranscript.aiOutput.summary,
      timestamp: new Date().toISOString(), 
    }

    setIncidents((prev) => [newIncident, ...prev])
    setRecentlyUpdatedId(newIncident.id)
    setIsCallModalOpen(false)

    setTimeout(() => setRecentlyUpdatedId(null), 2000)
  }, [currentTranscript, incidents.length])

  const handleAssignOfficer = useCallback((incidentId: string, officer: string | null) => {
    setIncidents((prev) =>
      prev.map((incident) =>
        incident.id === incidentId ? { ...incident, assignedOfficer: officer } : incident
      )
    )
    setRecentlyUpdatedId(incidentId)
    setTimeout(() => setRecentlyUpdatedId(null), 2000)
  }, [])

  const handleUpdateStatus = useCallback((incidentId: string, status: Incident["status"]) => {
    setIncidents((prev) =>
      prev.map((incident) =>
        incident.id === incidentId ? { ...incident, status } : incident
      )
    )
    setRecentlyUpdatedId(incidentId)
    setTimeout(() => setRecentlyUpdatedId(null), 2000)
  }, [])

  const handleToggleExpand = useCallback((incidentId: string) => {
    setExpandedIncidentId((prev) => (prev === incidentId ? null : incidentId))
  }, [])

  // Prevent hydration mismatch by returning null (or a skeleton) until mounted
  if (!hasMounted) {
    return null 
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSimulateCall={handleSimulateCall} />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <DemoGuidance />
        <StatsCards incidents={incidents} />
        <IncidentTable
          incidents={incidents}
          officers={officers}
          categories={categories}
          priorities={priorities}
          statuses={statuses}
          expandedIncidentId={expandedIncidentId}
          recentlyUpdatedId={recentlyUpdatedId}
          onAssignOfficer={handleAssignOfficer}
          onUpdateStatus={handleUpdateStatus}
          onToggleExpand={handleToggleExpand}
        />
      </main>

      <IncomingCallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        transcript={currentTranscript}
        isProcessing={isProcessing}
        onAddIncident={handleAddIncident}
      />
    </div>
  )
}