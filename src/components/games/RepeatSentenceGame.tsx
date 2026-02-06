import { useState, useEffect, useRef } from 'react';
import { Question } from '@/types/game';
import { Volume2, Mic, MicOff, Play, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface RepeatSentenceGameProps {
  question: Question;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showResult: boolean;
}

const RepeatSentenceGame = ({ question, onAnswer, showResult }: RepeatSentenceGameProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [hasRecorded, setHasRecorded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setTranscript('');
    setHasRecorded(false);
    setError(null);
  }, [question.id]);

  const playAudio = () => {
    if ('speechSynthesis' in window && question.audioText) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(question.audioText);
      utterance.rate = 0.85;
      utterance.pitch = 1;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startRecording = () => {
    setError(null);
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition not supported. Please use Chrome or Edge browser.');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsRecording(true);
      setTranscript('');
    };

    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setTranscript(finalTranscript);
        setHasRecorded(true);
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      setIsRecording(false);
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone access.');
      } else {
        setError('Could not recognize speech. Please try again.');
      }
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleSubmit = () => {
    if (!transcript) return;
    
    const target = question.audioText?.toLowerCase().replace(/[^\w\s]/g, '') || '';
    const spoken = transcript.toLowerCase().replace(/[^\w\s]/g, '');
    
    // Calculate similarity (simple word match percentage)
    const targetWords = target.split(' ');
    const spokenWords = spoken.split(' ');
    const matchedWords = targetWords.filter(word => spokenWords.includes(word));
    const accuracy = (matchedWords.length / targetWords.length) * 100;
    
    const isCorrect = accuracy >= 70; // 70% threshold
    onAnswer(transcript, isCorrect);
  };

  return (
    <div className="animate-slide-up">
      {/* Header Card */}
      <div className="glass-card p-6 mb-6 text-center">
        <div className="flex items-center justify-center gap-2 text-primary mb-3">
          <Volume2 className="h-5 w-5" />
          <span className="text-sm font-medium uppercase tracking-wide">Repeat After Me</span>
        </div>
        <p className="text-lg text-foreground">{question.prompt}</p>
      </div>

      {/* Audio Player */}
      <div className="glass-card p-8 mb-6 text-center">
        <button
          onClick={playAudio}
          disabled={isPlaying}
          className={cn(
            'w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all duration-300',
            'bg-gradient-primary shadow-lg mb-4',
            isPlaying ? 'animate-pulse scale-110' : 'hover:scale-105 hover:shadow-glow'
          )}
        >
          <Play className="h-8 w-8 text-primary-foreground ml-1" />
        </button>
        <p className="text-sm text-muted-foreground">
          {isPlaying ? 'Listening...' : 'Tap to hear the sentence'}
        </p>
      </div>

      {/* Recording Area */}
      <div className="glass-card p-8 mb-6 text-center">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={showResult}
          className={cn(
            'w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all duration-300 mb-4',
            isRecording 
              ? 'bg-destructive animate-pulse shadow-lg' 
              : 'bg-secondary/20 border-2 border-secondary hover:bg-secondary/30'
          )}
        >
          {isRecording ? (
            <MicOff className="h-8 w-8 text-destructive-foreground" />
          ) : (
            <Mic className={cn('h-8 w-8', hasRecorded ? 'text-success' : 'text-secondary')} />
          )}
        </button>
        
        <p className="text-sm text-muted-foreground mb-4">
          {isRecording ? 'Recording... Tap to stop' : hasRecorded ? 'Tap to record again' : 'Tap to start recording'}
        </p>

        {/* Transcript Display */}
        {transcript && (
          <div className="p-4 rounded-xl bg-muted/50 border border-border animate-slide-up">
            <p className="text-sm text-muted-foreground mb-1">You said:</p>
            <p className="text-foreground font-medium">"{transcript}"</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Submit Button */}
      {!showResult && (
        <Button
          onClick={handleSubmit}
          disabled={!hasRecorded || !transcript}
          className="w-full btn-gradient py-6 text-lg rounded-xl"
        >
          Check Pronunciation
        </Button>
      )}

      {/* Result */}
      {showResult && (
        <div className={cn(
          'p-5 rounded-xl animate-slide-up',
          transcript.toLowerCase().includes(question.audioText?.toLowerCase().split(' ')[0] || '')
            ? 'bg-success/10 border border-success/20' 
            : 'bg-warning/10 border border-warning/20'
        )}>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Target sentence:</p>
              <p className="text-foreground font-medium">"{question.audioText}"</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Your pronunciation:</p>
              <p className="text-foreground font-medium">"{transcript}"</p>
            </div>
            <p className="text-sm text-muted-foreground pt-2 border-t border-border">
              {question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepeatSentenceGame;
