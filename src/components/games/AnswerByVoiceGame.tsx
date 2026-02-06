import { useState, useEffect, useRef } from 'react';
import { Question } from '@/types/game';
import { MessageCircle, Mic, MicOff, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AnswerByVoiceGameProps {
  question: Question;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showResult: boolean;
}

const AnswerByVoiceGame = ({ question, onAnswer, showResult }: AnswerByVoiceGameProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [hasRecorded, setHasRecorded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setTranscript('');
    setHasRecorded(false);
    setError(null);
    setShowHint(false);
  }, [question.id]);

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
    
    const expectedKeywords = (question.spokenAnswer || question.correctAnswer)
      .toLowerCase()
      .split(' ')
      .filter(word => word.length > 2);
    
    const spokenWords = transcript.toLowerCase().split(' ');
    const matchedKeywords = expectedKeywords.filter(keyword => 
      spokenWords.some(word => word.includes(keyword) || keyword.includes(word))
    );
    
    const accuracy = expectedKeywords.length > 0 
      ? (matchedKeywords.length / expectedKeywords.length) * 100 
      : 0;
    
    const isCorrect = accuracy >= 50;
    onAnswer(transcript, isCorrect);
  };

  return (
    <div className="animate-slide-up">
      {/* Question Card */}
      <div className="glass-card p-8 mb-6 text-center">
        <div className="flex items-center justify-center gap-2 text-primary mb-4">
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-medium uppercase tracking-wide">Answer by Voice</span>
        </div>
        
        <p className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          {question.voicePrompt || question.prompt}
        </p>
        
        <button
          onClick={() => setShowHint(!showHint)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <HelpCircle className="h-4 w-4" />
          {showHint ? 'Hide hint' : 'Show hint'}
        </button>
        
        {showHint && (
          <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border animate-slide-up">
            <p className="text-sm text-muted-foreground">
              Expected answer includes: <span className="text-foreground font-medium">{question.correctAnswer}</span>
            </p>
          </div>
        )}
      </div>

      {/* Recording Area */}
      <div className="glass-card p-8 mb-6 text-center">
        <div className={cn(
          'w-32 h-32 rounded-full flex items-center justify-center mx-auto transition-all duration-300 mb-4 relative',
          isRecording 
            ? 'bg-destructive' 
            : hasRecorded 
              ? 'bg-success/20 border-2 border-success'
              : 'bg-gradient-primary'
        )}>
          {/* Pulse rings when recording */}
          {isRecording && (
            <>
              <div className="absolute inset-0 rounded-full bg-destructive/30 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-destructive/20 animate-ping" style={{ animationDelay: '0.2s' }} />
            </>
          )}
          
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={showResult}
            className="w-full h-full rounded-full flex items-center justify-center relative z-10"
          >
            {isRecording ? (
              <MicOff className="h-12 w-12 text-destructive-foreground" />
            ) : (
              <Mic className={cn(
                'h-12 w-12',
                hasRecorded ? 'text-success' : 'text-primary-foreground'
              )} />
            )}
          </button>
        </div>
        
        <p className="text-lg font-medium text-foreground mb-2">
          {isRecording ? 'Listening...' : hasRecorded ? 'Recorded!' : 'Tap to speak'}
        </p>
        <p className="text-sm text-muted-foreground">
          {isRecording ? 'Tap again to stop' : 'Speak your answer clearly'}
        </p>

        {/* Transcript Display */}
        {transcript && (
          <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border animate-slide-up">
            <p className="text-sm text-muted-foreground mb-1">Your answer:</p>
            <p className="text-lg text-foreground font-medium">"{transcript}"</p>
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
          Submit Answer
        </Button>
      )}

      {/* Result */}
      {showResult && (
        <div className={cn(
          'p-5 rounded-xl animate-slide-up',
          'bg-muted/50 border border-border'
        )}>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MessageCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Expected answer:</p>
                <p className="text-foreground font-medium">{question.correctAnswer}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Mic className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Your answer:</p>
                <p className="text-foreground font-medium">{transcript}</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground pt-3 border-t border-border">
              {question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerByVoiceGame;
