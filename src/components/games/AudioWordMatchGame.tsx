import { useState, useEffect } from 'react';
import { Question } from '@/types/game';
import { Volume2, CheckCircle, XCircle, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AudioWordMatchGameProps {
  question: Question;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showResult: boolean;
}

const AudioWordMatchGame = ({ question, onAnswer, showResult }: AudioWordMatchGameProps) => {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  useEffect(() => {
    setMatches({});
    setSelectedLeft(null);
  }, [question.id]);

  const pairs = question.pairs || [];
  const leftItems = pairs.map(p => p.left);
  const rightItems = [...pairs.map(p => p.right)].sort(() => Math.random() - 0.5);

  const playWord = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.85;
      utterance.onstart = () => setPlayingWord(word);
      utterance.onend = () => setPlayingWord(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLeftSelect = (word: string) => {
    if (showResult || matches[word]) return;
    playWord(word);
    setSelectedLeft(word);
  };

  const handleRightSelect = (word: string) => {
    if (showResult || !selectedLeft || Object.values(matches).includes(word)) return;
    setMatches(prev => ({ ...prev, [selectedLeft]: word }));
    setSelectedLeft(null);
  };

  const handleSubmit = () => {
    const allMatched = leftItems.every(item => matches[item]);
    if (!allMatched) return;
    
    const correctCount = pairs.filter(p => matches[p.left] === p.right).length;
    const isAllCorrect = correctCount === pairs.length;
    onAnswer(`${correctCount}/${pairs.length} correct`, isAllCorrect);
  };

  const isRightUsed = (word: string) => Object.values(matches).includes(word);
  const allMatched = leftItems.every(item => matches[item]);

  const getMatchStatus = (left: string) => {
    if (!showResult || !matches[left]) return null;
    const pair = pairs.find(p => p.left === left);
    return pair && matches[left] === pair.right ? 'correct' : 'incorrect';
  };

  return (
    <div className="animate-slide-up">
      {/* Header */}
      <div className="glass-card p-6 mb-6 text-center">
        <div className="flex items-center justify-center gap-2 text-primary mb-3">
          <Volume2 className="h-5 w-5" />
          <span className="text-sm font-medium uppercase tracking-wide">Audio Match</span>
        </div>
        <p className="text-lg text-foreground">{question.prompt}</p>
        <p className="text-sm text-muted-foreground mt-2">
          Click a word on the left to hear it, then match with the right
        </p>
      </div>

      {/* Matching Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Left Column - Audio Words */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 text-center">
            Listen
          </p>
          {leftItems.map((word, index) => {
            const status = getMatchStatus(word);
            return (
              <button
                key={index}
                onClick={() => handleLeftSelect(word)}
                disabled={showResult || !!matches[word]}
                className={cn(
                  'w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-2',
                  selectedLeft === word && 'border-primary bg-primary/10 scale-105',
                  matches[word] && !showResult && 'border-muted bg-muted/30 opacity-60',
                  status === 'correct' && 'border-success bg-success/10',
                  status === 'incorrect' && 'border-destructive bg-destructive/10',
                  !matches[word] && !selectedLeft && 'border-border bg-card hover:border-primary hover:bg-primary/5',
                  playingWord === word && 'animate-pulse'
                )}
              >
                <Play className={cn(
                  'h-4 w-4',
                  playingWord === word ? 'text-primary' : 'text-muted-foreground'
                )} />
                <span className="font-medium">{word}</span>
                {status === 'correct' && <CheckCircle className="h-4 w-4 text-success" />}
                {status === 'incorrect' && <XCircle className="h-4 w-4 text-destructive" />}
              </button>
            );
          })}
        </div>

        {/* Right Column - Text Options */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 text-center">
            Match
          </p>
          {rightItems.map((word, index) => {
            const isUsed = isRightUsed(word);
            const matchedLeft = Object.entries(matches).find(([_, v]) => v === word)?.[0];
            const status = showResult && matchedLeft ? getMatchStatus(matchedLeft) : null;
            
            return (
              <button
                key={index}
                onClick={() => handleRightSelect(word)}
                disabled={showResult || isUsed || !selectedLeft}
                className={cn(
                  'w-full p-4 rounded-xl border-2 transition-all duration-200 font-medium',
                  isUsed && !showResult && 'border-muted bg-muted/30 opacity-60',
                  status === 'correct' && 'border-success bg-success/10',
                  status === 'incorrect' && 'border-destructive bg-destructive/10',
                  !isUsed && selectedLeft && 'border-border bg-card hover:border-secondary hover:bg-secondary/5',
                  !isUsed && !selectedLeft && 'border-border bg-card opacity-60'
                )}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      {!showResult && (
        <Button
          onClick={handleSubmit}
          disabled={!allMatched}
          className="w-full btn-gradient py-6 text-lg rounded-xl"
        >
          Check Matches
        </Button>
      )}

      {/* Explanation */}
      {showResult && (
        <div className={cn(
          'p-5 rounded-xl animate-slide-up',
          pairs.every(p => matches[p.left] === p.right)
            ? 'bg-success/10 border border-success/20' 
            : 'bg-warning/10 border border-warning/20'
        )}>
          <p className="text-sm text-muted-foreground">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default AudioWordMatchGame;
