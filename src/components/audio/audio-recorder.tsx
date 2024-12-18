import { useAudioRecorder } from "@/hooks/use-audio-recorder"
import { AudioControls } from "./audio-controls"
import { RecordingProgress } from "./recording-progress"
import { PermissionDialog } from "./permission-dialog"
import { PieChart, Pie, Tooltip, Cell } from 'recharts'
import { useState } from "react"

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
    stats,
  } = useAudioRecorder()
  const [activeIndex, setActiveIndex] = useState(-1);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const data = stats?.probabilities && Object.entries(stats.probabilities).map(([emotion, probability]) => ({
    name: emotion,
    students: Math.round(probability as number * 1000)
  }));

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

      {stats?.probabilities && (
        <>
          <h2>All Emotion Probabilities:</h2>
          <ul>
            {Object.entries(stats.probabilities).map(([emotion, probability]) => (
              <li key={emotion}>
                {emotion}: {Math.round(probability as number * 100)}%
              </li>
            ))}
          </ul>
        </>)}

      {stats?.probabilities &&
        <PieChart width={700} height={700}>
          <Pie
            activeIndex={activeIndex}
            data={data}
            dataKey="students"
            outerRadius={250}
            fill="green"
            onMouseEnter={onPieEnter}
            style={{ cursor: 'pointer', outline: 'none' }} // Ensure no outline on focus
          >
            {data.map((_: unknown, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      }
    </div>
  )
}