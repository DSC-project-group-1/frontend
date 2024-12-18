import { useState, useRef } from 'react'
import { useToast } from "@/hooks/use-toast"
import axios from 'axios'

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<number>()
  const { toast } = useToast()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stats, setStats] = useState<any>(null);

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
  
    try {
      // Convert audioBlob to WAV format
      const wavBlob = await convertToWav(audioBlob);
  
      const formData = new FormData() 
      formData.append('audio', wavBlob, 'recording.wav') 
  
      const response = await axios.post(`http://localhost:5000/api/audio/upload-audio`, formData)
      setStats(response.data)
      console.log(response.data)
    } catch (error) { 
      console.log(error); 
      toast({ 
        variant: "destructive", 
        title: "Error", 
        description: "Failed to upload audio", 
      }) 
    } 
  }
  
  // Helper function to convert audio blob to WAV format
  const convertToWav = async (blob: Blob): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const audioContext = new (window.AudioContext || window.AudioContext)();
      
      // Create a file reader to read the blob
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          // Decode the audio data
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          
          // Create a new AudioBuffer with WAV format
          const offlineCtx = new OfflineAudioContext(
            audioBuffer.numberOfChannels,
            audioBuffer.length,
            audioBuffer.sampleRate
          );
          
          // Create a source node from the audio buffer
          const source = offlineCtx.createBufferSource();
          source.buffer = audioBuffer;
          
          // Connect to destination
          source.connect(offlineCtx.destination);
          source.start();
          
          // Render the audio to a new buffer
          const renderedBuffer = await offlineCtx.startRendering();
          
          // Convert to WAV
          const wavBlob = bufferToWave(renderedBuffer, renderedBuffer.length);
          
          resolve(wavBlob);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = (error) => reject(error);
      
      // Read the blob as an ArrayBuffer
      reader.readAsArrayBuffer(blob);
    });
  }
  
  // Helper function to convert AudioBuffer to WAV Blob
  const bufferToWave = (abuffer: AudioBuffer, len: number): Blob => {
    const numOfChan = abuffer.numberOfChannels;
    const length = len * numOfChan * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    const channels = [];
    let sample;
    let offset = 0;
    let pos = 0;
  
    // Write WAV header
    // RIFF chunk descriptor
    writeUTFBytes(view, pos, 'RIFF'); pos += 4;
    view.setUint32(pos, length - 8, true); pos += 4;
    writeUTFBytes(view, pos, 'WAVE'); pos += 4;
    
    // FMT sub-chunk
    writeUTFBytes(view, pos, 'fmt '); pos += 4;
    view.setUint32(pos, 16, true); pos += 4;
    view.setUint16(pos, 1, true); pos += 2; // PCM
    view.setUint16(pos, numOfChan, true); pos += 2;
    view.setUint32(pos, abuffer.sampleRate, true); pos += 4;
    view.setUint32(pos, abuffer.sampleRate * 2 * numOfChan, true); pos += 4;
    view.setUint16(pos, numOfChan * 2, true); pos += 2;
    view.setUint16(pos, 16, true); pos += 2;
    
    // data sub-chunk
    writeUTFBytes(view, pos, 'data'); pos += 4;
    view.setUint32(pos, length - pos - 4, true); pos += 4;
  
    // Write interleaved data
    for (let i = 0; i < abuffer.numberOfChannels; i++) {
      channels.push(abuffer.getChannelData(i));
    }
  
    while (pos < length) {
      for (let i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }
  
    // Create blob
    return new Blob([buffer], { type: 'audio/wav' });
  }
  
  // Utility function to write UTF-8 bytes
  const writeUTFBytes = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
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
    stats,
  }
}