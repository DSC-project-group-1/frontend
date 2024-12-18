import { Button } from "@/components/ui/button"
import { Mic, Square, Upload } from "lucide-react"

interface AudioControlsProps {
  isRecording: boolean
  hasRecording: boolean
  onStartRecording: () => void
  onStopRecording: () => void
  onUpload: () => void
}

export function AudioControls({
  isRecording,
  hasRecording,
  onStartRecording,
  onStopRecording,
  onUpload,
}: AudioControlsProps) {
  return (
    <div className="flex gap-4">
      {!isRecording ? (
        <Button
          size="lg"
          onClick={onStartRecording}
          className="w-16 h-16 rounded-full"
          variant="outline"
        >
          <Mic className="h-6 w-6" />
        </Button>
      ) : (
        <Button
          size="lg"
          onClick={onStopRecording}
          className="w-16 h-16 rounded-full bg-destructive hover:bg-destructive/90"
          variant="destructive"
        >
          <Square className="h-6 w-6" />
        </Button>
      )}

      {hasRecording && !isRecording && (
        <Button
          size="lg"
          onClick={onUpload}
          className="w-16 h-16 rounded-full"
          variant="secondary"
        >
          <Upload className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}