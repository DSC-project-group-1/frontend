import { useState, useRef } from 'react';
import { Mic, Square, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";

export const BACKEND_URL= "https://game-backend-ld5n.onrender.com";

export function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number>();
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.log(err);
      setShowPermissionDialog(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      clearInterval(timerRef.current);
      setIsRecording(false);
      setRecordingTime(0);
    }
  };

  const uploadRecording = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append('audio', audioBlob);

    try {
      const response = await axios.post(`${BACKEND_URL}/upload`, formData);
      console.log(response);

      // if (response.ok) {
      //   toast({
      //     title: "Success!",
      //     description: "Audio uploaded successfully",
      //   });
      //   setAudioBlob(null);
      // } else {
      //   throw new Error('Upload failed');
      // }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload audio",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="w-full max-w-md bg-card rounded-xl shadow-lg p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Audio Recorder</h1>
          <p className="text-muted-foreground">Record and upload your audio message</p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          {isRecording && (
            <div className="w-full space-y-2">
              <Progress value={(recordingTime % 60) * 1.67} />
              <p className="text-center text-sm text-muted-foreground">
                Recording: {formatTime(recordingTime)}
              </p>
            </div>
          )}

          <div className="flex gap-4">
            {!isRecording ? (
              <Button
                size="lg"
                onClick={startRecording}
                className="w-16 h-16 rounded-full"
                variant="outline"
              >
                <Mic className="h-6 w-6" />
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={stopRecording}
                className="w-16 h-16 rounded-full bg-destructive hover:bg-destructive/90"
                variant="destructive"
              >
                <Square className="h-6 w-6" />
              </Button>
            )}

            {audioBlob && !isRecording && (
              <Button
                size="lg"
                onClick={uploadRecording}
                className="w-16 h-16 rounded-full"
                variant="secondary"
              >
                <Upload className="h-6 w-6" />
              </Button>
            )}
          </div>

          {audioBlob && !isRecording && (
            <audio controls className="w-full mt-4">
              <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      </div>

      <AlertDialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Microphone Access Required</AlertDialogTitle>
            <AlertDialogDescription>
              Please allow microphone access to use the audio recorder. You can enable this in your browser settings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setShowPermissionDialog(false)}>
              Okay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}