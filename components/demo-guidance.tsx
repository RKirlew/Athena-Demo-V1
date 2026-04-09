import { Info } from "lucide-react"

export function DemoGuidance() {
  return (
    <div className="mb-6 flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3">
      <Info className="h-5 w-5 shrink-0 text-primary" />
      <p className="text-sm text-foreground">
        Click <span className="font-medium text-primary">&apos;Simulate Incoming Call&apos;</span> to see how Athena automatically triages and logs incidents.
      </p>
    </div>
  )
}
