import { useState, useRef } from 'react'
import { useToast } from "@/hooks/use-toast"
import { BACKEND_URL } from '@/components/AudioRecorder'

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<number>()
  const { toast } = useToast()

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        chunksRef.current = []
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (err) {
      console.log(err);
      setShowPermissionDialog(true)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      clearInterval(timerRef.current)
      setIsRecording(false)
      setRecordingTime(0)
    }
  }

  const uploadRecording = async () => {
    if (!audioBlob) return

    const formData = new FormData()
    formData.append('audio', audioBlob)

    try {
      const response = await fetch(`${BACKEND_URL}/api/audio/upload-audio`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Audio uploaded successfully",
        })
        setAudioBlob(null)
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload audio",
      })
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return {
    isRecording,
    audioBlob,
    recordingTime,
    showPermissionDialog,
    setShowPermissionDialog,
    startRecording,
    stopRecording,
    uploadRecording,
    formatTime,
  }
}