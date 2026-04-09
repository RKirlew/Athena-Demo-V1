export type Category = "Noise Complaint" | "Lost Item" | "Suspicious Activity" | "General Inquiry"
export type Priority = "Low" | "Medium" | "High"
export type Status = "New" | "In Progress" | "Resolved"

export interface Incident {
  id: string
  caller: string
  category: Category
  priority: Priority
  status: Status
  assignedOfficer: string | null
  transcript: string
  summary: string
  timestamp: string
}

export interface TranscriptData {
  caller: string
  transcript: string
  aiOutput: {
    category: Category
    priority: Priority
    summary: string
  }
}
