import { useState, useEffect } from 'react';
import { Question } from '@/types/game';
import { Volume2, CheckCircle, XCircle, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ListenChooseGameProps {
  question: Question;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showResult: boolean;
}

const ListenChooseGame = ({ question, onAnswer, showResult }: ListenChooseGameProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setHasPlayed(false);
  }, [question.id]);

  const playAudio = () => {
    if ('speechSynthesis' in window && question.audioText) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(question.audioText);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        setHasPlayed(true);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === question.correctAnswer;
    onAnswer(selectedOption, isCorrect);
  };

  const getOptionClass = (option: string) => {
    if (!showResult) {
      return selectedOption === option ? 'game-option-selected' : 'game-option';
    }
    if (option === question.correctAnswer) {
      return 'game-option game-option-correct';
    }
    if (selectedOption === option && option !== question.correctAnswer) {
      return 'game-option game-option-incorrect';
    }
    return 'game-option opacity-50';
  };

  return (
    <div className="animate-slide-up">
      {/* Audio Player Card */}
      <div className="glass-card p-8 mb-6 text-center">
        <div className="flex items-center justify-center gap-2 text-primary mb-4">
          <Volume2 className="h-5 w-5" />
          <span className="text-sm font-medium uppercase tracking-wide">Listen & Choose</span>
        </div>
        
        <p className="text-lg text-foreground mb-6">{question.prompt}</p>
        
        <button
          onClick={playAudio}
          disabled={isPlaying}
          className={cn(
            'w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all duration-300',
            'bg-gradient-primary shadow-lg',
            isPlaying ? 'animate-pulse scale-110' : 'hover:scale-105 hover:shadow-glow'
          )}
        >
          {isPlaying ? (
            <Pause className="h-10 w-10 text-primary-foreground" />
          ) : (
            <Play className="h-10 w-10 text-primary-foreground ml-1" />
          )}
        </button>
        
        <p className="text-sm text-muted-foreground mt-4">
          {hasPlayed ? 'Click to replay' : 'Click to listen'}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={showResult}
            className={cn(
              getOptionClass(option),
              'flex items-center gap-4'
            )}
          >
            <span className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0',
              selectedOption === option 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            )}>
              {String.fromCharCode(65 + index)}
            </span>
            <span className="flex-1 text-left font-medium">{option}</span>
            {showResult && option === question.correctAnswer && (
              <CheckCircle className="h-5 w-5 text-success shrink-0" />
            )}
            {showResult && selectedOption === option && option !== question.correctAnswer && (
              <XCircle className="h-5 w-5 text-destructive shrink-0" />
            )}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      {!showResult && (
        <Button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="w-full btn-gradient py-6 text-lg rounded-xl"
        >
          Check Answer
        </Button>
      )}

      {/* Explanation */}
      {showResult && (
        <div className={cn(
          'p-5 rounded-xl animate-slide-up',
          selectedOption === question.correctAnswer 
            ? 'bg-success/10 border border-success/20' 
            : 'bg-destructive/10 border border-destructive/20'
        )}>
          <div className="flex items-center gap-2 mb-2">
            {selectedOption === question.correctAnswer ? (
              <>
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="font-bold text-success">Excellent!</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-destructive" />
                <span className="font-bold text-destructive">Not quite!</span>
              </>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default ListenChooseGame;
