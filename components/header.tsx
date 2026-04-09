"use client"

import { Phone, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onSimulateCall: () => void
}

export function Header({ onSimulateCall }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Athena</h1>
              <p className="text-sm text-muted-foreground">AI Campus Security</p>
            </div>
          </div>
          
          <Button onClick={onSimulateCall} className="gap-2">
            <Phone className="h-4 w-4" />
            Simulate Incoming Call
          </Button>
        </div>
      </div>
    </header>
  )
}
