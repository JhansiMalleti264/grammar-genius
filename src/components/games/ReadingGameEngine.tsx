import { useState, useEffect } from 'react';
import { ReadingQuestion } from '@/data/readingQuestions';
import { BookOpen, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ReadingGameEngineProps {
  questions: ReadingQuestion[];
  onComplete: (results: { questionId: string; isCorrect: boolean; userAnswer: string; correctAnswer: string; explanation: string }[]) => void;
  onClose: () => void;
}

const ReadingGameEngine = ({ questions, onComplete, onClose }: ReadingGameEngineProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; isCorrect: boolean; userAnswer: string; correctAnswer: string; explanation: string }[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Step arrangement state
  const [orderedSteps, setOrderedSteps] = useState<string[]>([]);
  const [availableSteps, setAvailableSteps] = useState<string[]>([]);

  // Match state
  const [matchAnswers, setMatchAnswers] = useState<Record<number, string>>({});

  const q = questions[currentIndex];

  useEffect(() => {
    setSelectedOption(null);
    setShowResult(false);
    setMatchAnswers({});
    if (q?.steps) {
      setAvailableSteps([...q.steps].sort(() => Math.random() - 0.5));
      setOrderedSteps([]);
    }
  }, [currentIndex, q?.id]);

  const checkAnswer = () => {
    let isCorrect = false;
    let userAnswer = '';

    switch (q.gameType) {
      case 'step-arrangement': {
        const correct = q.correctOrder ?? [];
        isCorrect = orderedSteps.length === correct.length && orderedSteps.every((s, i) => s === correct[i]);
        userAnswer = orderedSteps.join(' → ');
        break;
      }
      case 'situation-instruction-match': {
        const items = q.matchItems ?? [];
        isCorrect = items.every((item, i) => matchAnswers[i] === item.instruction);
        userAnswer = Object.values(matchAnswers).join(' | ');
        break;
      }
      default: {
        isCorrect = selectedOption === q.correctAnswer;
        userAnswer = selectedOption ?? '';
      }
    }

    setShowResult(true);
    setAnswers(prev => [...prev, {
      questionId: q.id,
      isCorrect,
      userAnswer,
      correctAnswer: q.correctAnswer === 'correct-order' || q.correctAnswer === 'all-matched' ? 'See explanation' : q.correctAnswer,
      explanation: q.explanation,
    }]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete([...answers]);
    }
  };

  const addStep = (step: string) => {
    setOrderedSteps(prev => [...prev, step]);
    setAvailableSteps(prev => prev.filter(s => s !== step));
  };
  const removeStep = (step: string) => {
    setOrderedSteps(prev => prev.filter(s => s !== step));
    setAvailableSteps(prev => [...prev, step]);
  };

  const isSubmitDisabled = () => {
    switch (q.gameType) {
      case 'step-arrangement':
        return orderedSteps.length < (q.steps?.length ?? 0);
      case 'situation-instruction-match':
        return Object.keys(matchAnswers).length < (q.matchItems?.length ?? 0);
      default:
        return !selectedOption;
    }
  };

  const renderPassage = () => {
    if (!q.passage) return null;
    return (
      <div className="bg-muted/30 rounded-xl p-5 border border-border/50 mb-6">
        <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">{q.passage}</p>
      </div>
    );
  };

  const renderTFStatement = () => {
    if (!q.tfStatement) return null;
    return (
      <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 mb-4">
        <p className="text-sm font-medium text-foreground italic">"{q.tfStatement}"</p>
      </div>
    );
  };

  const renderFactStatement = () => {
    if (!q.statement) return null;
    return (
      <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 mb-4">
        <p className="text-sm font-medium text-foreground italic">"{q.statement}"</p>
      </div>
    );
  };

  const renderGameContent = () => {
    // MCQ-based
    if (['meaning-selection', 'context-word-choice', 'sentence-purpose', 'main-idea-detection',
      'supporting-detail', 'best-title', 'tone-identification', 'inference-question', 'best-summary',
      'correct-action', 'first-step', 'true-false-not-mentioned', 'missing-step',
      'email-intent', 'policy-application', 'decision-reading',
      'topic-identification', 'fact-vs-opinion', 'keyword-identification',
      'cause-and-effect', 'supporting-evidence', 'paragraph-role',
      'argument-strength', 'author-intention', 'complex-summary'].includes(q.gameType)) {
      return (
        <>
          {renderPassage()}
          {renderTFStatement()}
          {renderFactStatement()}
          <div className="space-y-3">
            {q.options?.map((option, i) => (
              <button
                key={i}
                onClick={() => !showResult && setSelectedOption(option)}
                disabled={showResult}
                className={cn(
                  'game-option flex items-center gap-4',
                  !showResult && selectedOption === option && 'game-option-selected',
                  showResult && option === q.correctAnswer && 'game-option-correct',
                  showResult && selectedOption === option && option !== q.correctAnswer && 'game-option-incorrect',
                  showResult && option !== q.correctAnswer && selectedOption !== option && 'opacity-50',
                )}
              >
                <span className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0',
                  !showResult && selectedOption === option ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                  showResult && option === q.correctAnswer && 'bg-success text-success-foreground',
                  showResult && selectedOption === option && option !== q.correctAnswer && 'bg-destructive text-destructive-foreground',
                )}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1 text-left font-medium text-sm">{option}</span>
                {showResult && option === q.correctAnswer && <CheckCircle className="h-5 w-5 text-success shrink-0" />}
                {showResult && selectedOption === option && option !== q.correctAnswer && <XCircle className="h-5 w-5 text-destructive shrink-0" />}
              </button>
            ))}
          </div>
        </>
      );
    }

    // Step arrangement
    if (q.gameType === 'step-arrangement') {
      return (
        <>
          {renderPassage()}
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-xl p-4 border border-border/50 min-h-[100px]">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Your Order</p>
              {orderedSteps.length === 0 && <p className="text-sm text-muted-foreground">Tap items below to add them in order</p>}
              <div className="space-y-2">
                {orderedSteps.map((step, i) => (
                  <button
                    key={step}
                    onClick={() => !showResult && removeStep(step)}
                    disabled={showResult}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-lg border text-left text-sm font-medium transition-all',
                      showResult && q.correctOrder?.[i] === step && 'border-success bg-success/10',
                      showResult && q.correctOrder?.[i] !== step && 'border-destructive bg-destructive/10',
                      !showResult && 'border-primary bg-primary/5',
                    )}
                  >
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    {step}
                  </button>
                ))}
              </div>
            </div>
            {availableSteps.length > 0 && !showResult && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Available Steps</p>
                {availableSteps.map(step => (
                  <button
                    key={step}
                    onClick={() => addStep(step)}
                    className="w-full p-3 rounded-lg border border-border bg-card text-left text-sm font-medium hover:border-primary/30 transition-all"
                  >
                    {step}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      );
    }

    // Situation-instruction match
    if (q.gameType === 'situation-instruction-match') {
      const items = q.matchItems ?? [];
      const instructions = items.map(it => it.instruction);
      return (
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="bg-muted/30 rounded-xl p-4 border border-border/50">
              <p className="font-semibold text-foreground text-sm mb-2">Situation: {item.situation}</p>
              <div className="space-y-2">
                {instructions.map((inst, ii) => (
                  <button
                    key={ii}
                    onClick={() => !showResult && setMatchAnswers(prev => ({ ...prev, [i]: inst }))}
                    disabled={showResult}
                    className={cn(
                      'w-full p-3 rounded-lg border text-left text-sm font-medium transition-all',
                      matchAnswers[i] === inst && !showResult && 'border-primary bg-primary/5',
                      matchAnswers[i] !== inst && !showResult && 'border-border bg-card hover:border-primary/30',
                      showResult && item.instruction === inst && 'border-success bg-success/10',
                      showResult && matchAnswers[i] === inst && item.instruction !== inst && 'border-destructive bg-destructive/10',
                    )}
                  >
                    {inst}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  if (!q) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            ✕ Close
          </button>
          <div className="flex-1 progress-bar h-2">
            <div className="progress-fill" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
          </div>
          <span className="text-sm font-semibold text-muted-foreground tabular-nums">
            {currentIndex + 1}/{questions.length}
          </span>
        </div>

        {/* Header */}
        <div className="glass-card p-5 mb-6 animate-slide-up">
          <div className="flex items-center gap-2 text-primary mb-2">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">{q.label}</span>
          </div>
          <p className="text-base font-medium text-foreground">{q.prompt}</p>
        </div>

        {/* Game Content */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {renderGameContent()}
        </div>

        {/* Submit / Next */}
        {!showResult ? (
          <Button
            onClick={checkAnswer}
            disabled={isSubmitDisabled()}
            className="w-full btn-gradient py-6 text-lg rounded-xl"
          >
            Check Answer
          </Button>
        ) : (
          <>
            <div className={cn(
              'p-5 rounded-xl mb-4 animate-slide-up',
              answers[answers.length - 1]?.isCorrect ? 'bg-success/10 border border-success/20' : 'bg-destructive/10 border border-destructive/20',
            )}>
              <div className="flex items-center gap-2 mb-2">
                {answers[answers.length - 1]?.isCorrect ? (
                  <><CheckCircle className="h-5 w-5 text-success" /><span className="font-bold text-success">Correct!</span></>
                ) : (
                  <><XCircle className="h-5 w-5 text-destructive" /><span className="font-bold text-destructive">Not quite!</span></>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{q.explanation}</p>
            </div>
            <Button onClick={handleNext} className="w-full btn-gradient py-6 text-lg rounded-xl animate-bounce-in">
              {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReadingGameEngine;
