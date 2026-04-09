import type { Incident, TranscriptData, Category, Priority, Status } from "./types"

export const officers = [
  "Officer Martinez",
  "Officer Chen",
  "Officer Williams",
  "Officer Johnson",
  "Officer Thompson",
]

export const categories: Category[] = ["Noise Complaint", "Lost Item", "Suspicious Activity", "General Inquiry"]
export const priorities: Priority[] = ["Low", "Medium", "High"]
export const statuses: Status[] = ["New", "In Progress", "Resolved"]

export const initialIncidents: Incident[] = [
  {
    id: "INC-001",
    caller: "Sarah Mitchell",
    category: "Noise Complaint",
    priority: "Medium",
    status: "In Progress",
    assignedOfficer: "Officer Martinez",
    transcript: "Hi, I'm calling from Wilson Hall, room 304. There's been really loud music coming from the room above me for the past two hours. I've tried knocking on their door but no one answered. It's 11 PM and I have an exam tomorrow morning.",
    summary: "Student in Wilson Hall 304 reporting persistent loud music from room above (404) at 11 PM. Attempted direct resolution unsuccessful. Academic impact noted.",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "INC-002",
    caller: "James Cooper",
    category: "Lost Item",
    priority: "Low",
    status: "New",
    assignedOfficer: null,
    transcript: "Hello, I lost my student ID card somewhere between the library and the engineering building. I think I might have dropped it on the path. It has my name James Cooper on it. Can someone help me look for it?",
    summary: "Student James Cooper lost ID card on path between library and engineering building. Standard lost item report requiring area patrol.",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "INC-003",
    caller: "Emily Rodriguez",
    category: "Suspicious Activity",
    priority: "High",
    status: "In Progress",
    assignedOfficer: "Officer Chen",
    transcript: "I'm in parking lot C and there's someone I don't recognize trying to open car doors. They're wearing a dark hoodie and have been here for about 10 minutes. They keep looking around nervously. I'm staying in my car.",
    summary: "Witness reports unidentified individual attempting to access vehicles in Parking Lot C. Suspect wearing dark hoodie, exhibiting nervous behavior. Caller safely observing from vehicle. Immediate response required.",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "INC-004",
    caller: "Michael Kim",
    category: "General Inquiry",
    priority: "Low",
    status: "Resolved",
    assignedOfficer: "Officer Williams",
    transcript: "Hi, I'm a new student and I was wondering where I should report if I see something suspicious on campus? Also, are the security offices open 24/7?",
    summary: "New student requesting information about security reporting procedures and office hours. Standard orientation-type inquiry.",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "INC-005",
    caller: "Lisa Thompson",
    category: "Noise Complaint",
    priority: "Medium",
    status: "Resolved",
    assignedOfficer: "Officer Johnson",
    transcript: "There's a group of people playing basketball at the outdoor courts. It's 1 AM and they're being very loud. The courts are supposed to close at 10 PM. Can someone please ask them to leave?",
    summary: "After-hours activity at outdoor basketball courts at 1 AM. Group violation of 10 PM closure policy. Noise disturbance to nearby dormitories.",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
  },
]

export const sampleTranscripts: TranscriptData[] = [
  {
    caller: "David Park",
    transcript: "Hi, this is David Park calling. I'm at the science building and I found an unattended backpack near the main entrance. It's been there for over an hour and no one has claimed it. Given all the security concerns, I thought I should report it.",
    aiOutput: {
      category: "Suspicious Activity",
      priority: "High",
      summary: "Unattended backpack reported at science building main entrance. Item unclaimed for 1+ hour. Potential security concern requiring immediate investigation.",
    },
  },
  {
    caller: "Amanda Foster",
    transcript: "Hello, I'm locked out of my dorm room in Harper Hall, room 212. My roommate is out of town and I left my keys inside. The RA isn't responding to my texts. Can campus security help me get back in?",
    aiOutput: {
      category: "General Inquiry",
      priority: "Low",
      summary: "Student locked out of Harper Hall room 212. Roommate unavailable, RA unresponsive. Standard lockout assistance request.",
    },
  },
  {
    caller: "Robert Chang",
    transcript: "I need to report someone skateboarding inside the student union building. They almost knocked over an elderly professor and they're refusing to stop. They're still in the main atrium area right now.",
    aiOutput: {
      category: "General Inquiry",
      priority: "Medium",
      summary: "Active skateboarding violation in student union atrium. Near-collision with faculty member reported. Subject non-compliant with verbal warnings. Ongoing incident.",
    },
  },
  {
    caller: "Jennifer Walsh",
    transcript: "There's a car with its headlights on in parking lot B that's been running for about 45 minutes. No one seems to be around it. The engine is on but all the doors are closed. It's a blue sedan.",
    aiOutput: {
      category: "Suspicious Activity",
      priority: "Medium",
      summary: "Unattended running vehicle in Parking Lot B for 45+ minutes. Blue sedan with engine on, no occupant visible. Possible vehicle abandonment or emergency situation.",
    },
  },
  {
    caller: "Marcus Johnson",
    transcript: "I just saw someone jump the fence behind the gymnasium. They ran towards the athletic fields. I couldn't see their face but they were carrying something. This happened about 2 minutes ago.",
    aiOutput: {
      category: "Suspicious Activity",
      priority: "High",
      summary: "Unauthorized fence breach behind gymnasium 2 minutes ago. Individual fled toward athletic fields carrying unknown item. Face not visible. Immediate perimeter check advised.",
    },
  },
]
