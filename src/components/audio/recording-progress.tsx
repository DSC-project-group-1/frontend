import { Progress } from "@/components/ui/progress"

interface RecordingProgressProps {
  recordingTime: number
  formatTime: (seconds: number) => string
}

export function RecordingProgress({ recordingTime, formatTime }: RecordingProgressProps) {
  return (
    <div className="w-full space-y-2">
      <Progress value={(recordingTime % 60) * 1.67} />
      <p className="text-center text-sm text-muted-foreground">
        Recording: {formatTime(recordingTime)}
      </p>
    </div>
  )
}