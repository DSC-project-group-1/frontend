import { useAudioRecorder } from "@/hooks/use-audio-recorder"
import { AudioControls } from "./audio-controls"
import { RecordingProgress } from "./recording-progress"
import { PermissionDialog } from "./permission-dialog"

export function AudioRecorder() {
  const {
    isRecording,
    audioBlob,
    recordingTime,
    showPermissionDialog,
    setShowPermissionDialog,
    startRecording,
    stopRecording,
    uploadRecording,
    formatTime,
  } = useAudioRecorder()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="w-full max-w-md bg-card rounded-xl shadow-lg p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Audio Recorder</h1>
          <p className="text-muted-foreground">Record and upload your audio message</p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          {isRecording && (
            <RecordingProgress
              recordingTime={recordingTime}
              formatTime={formatTime}
            />
          )}

          <AudioControls
            isRecording={isRecording}
            hasRecording={!!audioBlob}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
            onUpload={uploadRecording}
          />

          {audioBlob && !isRecording && (
            <audio controls className="w-full mt-4">
              <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      </div>

      <PermissionDialog
        open={showPermissionDialog}
        onOpenChange={setShowPermissionDialog}
      />
    </div>
  )
}