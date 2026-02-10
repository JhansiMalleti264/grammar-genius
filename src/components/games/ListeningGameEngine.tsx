import { useState, useEffect, useCallback } from 'react';
import { ListeningQuestion } from '@/data/listeningQuestions';
import { Volume2, Play, Pause, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ListeningGameEngineProps {
  questions: ListeningQuestion[];
  onComplete: (results: { questionId: string; isCorrect: boolean; userAnswer: string; correctAnswer: string; explanation: string }[]) => void;
  onClose: () => void;
}

const ListeningGameEngine = ({ questions, onComplete, onClose }: ListeningGameEngineProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; isCorrect: boolean; userAnswer: string; correctAnswer: string; explanation: string }[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Multi-question state (announcement-questions, section-questions)
  const [subAnswers, setSubAnswers] = useState<Record<number, string>>({});

  // Step-sequence / order-of-points state
  const [orderedSteps, setOrderedSteps] = useState<string[]>([]);
  const [availableSteps, setAvailableSteps] = useState<string[]>([]);

  // Key-points (multi-select) state
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // Opinion-matching state
  const [matchedOpinions, setMatchedOpinions] = useState<Record<string, string>>({});

  // Opinion-vs-fact state
  const [factOpinionAnswers, setFactOpinionAnswers] = useState<Record<number, 'fact' | 'opinion'>>({});

  // Agree-disagree state (same as selectedOption)

  const q = questions[currentIndex];

  useEffect(() => {
    setSelectedOption(null);
    setShowResult(false);
    setHasPlayed(false);
    setSubAnswers({});
    setSelectedKeys([]);
    setMatchedOpinions({});
    setFactOpinionAnswers({});
    if (q?.steps) {
      setAvailableSteps([...q.steps].sort(() => Math.random() - 0.5));
      setOrderedSteps([]);
    }
  }, [currentIndex, q?.id]);

  const playAudio = useCallback(() => {
    if ('speechSynthesis' in window && q?.audioText) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(q.audioText);
      utterance.rate = 0.85;
      utterance.pitch = 1;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => { setIsPlaying(false); setHasPlayed(true); };
      window.speechSynthesis.speak(utterance);
    }
  }, [q]);

  const checkAnswer = () => {
    let isCorrect = false;
    let userAnswer = '';

    switch (q.gameType) {
      case 'announcement-questions':
      case 'section-questions': {
        const subs = q.subQuestions ?? [];
        const allCorrect = subs.every((sq, i) => subAnswers[i] === sq.correctAnswer);
        isCorrect = allCorrect;
        userAnswer = Object.values(subAnswers).join(' | ');
        break;
      }
      case 'step-sequence':
      case 'order-of-points': {
        const correct = q.correctOrder ?? [];
        isCorrect = orderedSteps.length === correct.length && orderedSteps.every((s, i) => s === correct[i]);
        userAnswer = orderedSteps.join(' → ');
        break;
      }
      case 'key-points': {
        const correctKeys = q.correctKeys ?? [];
        isCorrect = selectedKeys.length === correctKeys.length && correctKeys.every(k => selectedKeys.includes(k));
        userAnswer = selectedKeys.join(', ');
        break;
      }
      case 'opinion-matching': {
        const speakers = q.speakers ?? [];
        isCorrect = speakers.every(s => matchedOpinions[s.speaker] === s.opinion);
        userAnswer = Object.entries(matchedOpinions).map(([k, v]) => `${k}: ${v}`).join(' | ');
        break;
      }
      case 'opinion-vs-fact': {
        const stmts = q.statements ?? [];
        isCorrect = stmts.every((s, i) => factOpinionAnswers[i] === s.type);
        userAnswer = Object.entries(factOpinionAnswers).map(([k, v]) => `${Number(k) + 1}: ${v}`).join(', ');
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
      correctAnswer: q.correctAnswer === 'all-sub-questions' || q.correctAnswer === 'correct-order' || q.correctAnswer === 'multi-select' || q.correctAnswer === 'matched' || q.correctAnswer === 'all-classified'
        ? 'See explanation'
        : q.correctAnswer,
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

  const toggleKey = (key: string) => {
    setSelectedKeys(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const isSubmitDisabled = () => {
    switch (q.gameType) {
      case 'announcement-questions':
      case 'section-questions':
        return Object.keys(subAnswers).length < (q.subQuestions?.length ?? 0);
      case 'step-sequence':
      case 'order-of-points':
        return orderedSteps.length < (q.steps?.length ?? 0);
      case 'key-points':
        return selectedKeys.length === 0;
      case 'opinion-matching':
        return Object.keys(matchedOpinions).length < (q.speakers?.length ?? 0);
      case 'opinion-vs-fact':
        return Object.keys(factOpinionAnswers).length < (q.statements?.length ?? 0);
      default:
        return !selectedOption;
    }
  };

  const renderGameContent = () => {
    // MCQ-based games
    if (['action-instruction', 'short-question-answer', 'keyword-identification', 'dialogue-comprehension',
      'intent-recognition', 'missing-information', 'summary-selection', 'topic-identification',
      'speaker-decision', 'role-identification', 'problem-solution', 'detail-extraction',
      'meeting-outcome', 'agree-disagree', 'main-idea-selection', 'fact-identification',
      'topic-matching', 'cause-effect', 'presentation-summary', 'data-extraction'].includes(q.gameType)) {
      return (
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
              <span className="flex-1 text-left font-medium">{option}</span>
              {showResult && option === q.correctAnswer && <CheckCircle className="h-5 w-5 text-success shrink-0" />}
              {showResult && selectedOption === option && option !== q.correctAnswer && <XCircle className="h-5 w-5 text-destructive shrink-0" />}
            </button>
          ))}
        </div>
      );
    }

    // Sub-questions (announcement, section)
    if (q.gameType === 'announcement-questions' || q.gameType === 'section-questions') {
      return (
        <div className="space-y-6">
          {q.subQuestions?.map((sq, qi) => (
            <div key={qi} className="bg-muted/30 rounded-xl p-4 border border-border/50">
              <p className="font-semibold text-foreground mb-3">{qi + 1}. {sq.question}</p>
              <div className="space-y-2">
                {sq.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => !showResult && setSubAnswers(prev => ({ ...prev, [qi]: opt }))}
                    disabled={showResult}
                    className={cn(
                      'w-full p-3 rounded-lg border text-left text-sm font-medium transition-all',
                      !showResult && subAnswers[qi] === opt && 'border-primary bg-primary/5',
                      !showResult && subAnswers[qi] !== opt && 'border-border bg-card hover:border-primary/30',
                      showResult && opt === sq.correctAnswer && 'border-success bg-success/10 text-success',
                      showResult && subAnswers[qi] === opt && opt !== sq.correctAnswer && 'border-destructive bg-destructive/10 text-destructive',
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Step sequence / order
    if (q.gameType === 'step-sequence' || q.gameType === 'order-of-points') {
      return (
        <div className="space-y-4">
          <div className="bg-muted/30 rounded-xl p-4 border border-border/50 min-h-[120px]">
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
                    !showResult && 'border-primary bg-primary/5 hover:bg-primary/10',
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
      );
    }

    // Key points (multi-select)
    if (q.gameType === 'key-points') {
      return (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Select all key points (multiple answers)</p>
          {q.options?.map((opt, i) => {
            const isSelected = selectedKeys.includes(opt);
            const isCorrectKey = q.correctKeys?.includes(opt);
            return (
              <button
                key={i}
                onClick={() => !showResult && toggleKey(opt)}
                disabled={showResult}
                className={cn(
                  'game-option flex items-center gap-4',
                  !showResult && isSelected && 'game-option-selected',
                  showResult && isCorrectKey && 'game-option-correct',
                  showResult && isSelected && !isCorrectKey && 'game-option-incorrect',
                  showResult && !isCorrectKey && !isSelected && 'opacity-50',
                )}
              >
                <span className={cn(
                  'w-8 h-8 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all',
                  isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/30',
                )}>
                  {isSelected && <CheckCircle className="h-4 w-4 text-primary-foreground" />}
                </span>
                <span className="flex-1 text-left font-medium">{opt}</span>
              </button>
            );
          })}
        </div>
      );
    }

    // Opinion matching
    if (q.gameType === 'opinion-matching') {
      const speakers = q.speakers ?? [];
      const opinions = speakers.map(s => s.opinion);
      return (
        <div className="space-y-4">
          {speakers.map((s, i) => (
            <div key={i} className="bg-muted/30 rounded-xl p-4 border border-border/50">
              <p className="font-semibold text-foreground mb-2">{s.speaker}</p>
              <div className="space-y-2">
                {opinions.map((op, oi) => (
                  <button
                    key={oi}
                    onClick={() => !showResult && setMatchedOpinions(prev => ({ ...prev, [s.speaker]: op }))}
                    disabled={showResult}
                    className={cn(
                      'w-full p-3 rounded-lg border text-left text-sm font-medium transition-all',
                      matchedOpinions[s.speaker] === op && 'border-primary bg-primary/5',
                      matchedOpinions[s.speaker] !== op && 'border-border bg-card hover:border-primary/30',
                      showResult && s.opinion === op && 'border-success bg-success/10',
                      showResult && matchedOpinions[s.speaker] === op && s.opinion !== op && 'border-destructive bg-destructive/10',
                    )}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Opinion vs Fact
    if (q.gameType === 'opinion-vs-fact') {
      const stmts = q.statements ?? [];
      return (
        <div className="space-y-3">
          {stmts.map((s, i) => (
            <div key={i} className="bg-muted/30 rounded-xl p-4 border border-border/50">
              <p className="text-sm font-medium text-foreground mb-3">"{s.text}"</p>
              <div className="flex gap-2">
                {(['fact', 'opinion'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => !showResult && setFactOpinionAnswers(prev => ({ ...prev, [i]: type }))}
                    disabled={showResult}
                    className={cn(
                      'flex-1 py-2 px-4 rounded-lg border text-sm font-semibold uppercase tracking-wider transition-all',
                      factOpinionAnswers[i] === type && !showResult && 'border-primary bg-primary/10 text-primary',
                      factOpinionAnswers[i] !== type && !showResult && 'border-border text-muted-foreground hover:border-primary/30',
                      showResult && s.type === type && 'border-success bg-success/10 text-success',
                      showResult && factOpinionAnswers[i] === type && s.type !== type && 'border-destructive bg-destructive/10 text-destructive',
                    )}
                  >
                    {type}
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

        {/* Audio Card */}
        <div className="glass-card p-6 mb-6 text-center animate-slide-up">
          <div className="flex items-center justify-center gap-2 text-primary mb-2">
            <Volume2 className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">{q.label}</span>
          </div>
          <p className="text-base font-medium text-foreground mb-5">{q.prompt}</p>
          <button
            onClick={playAudio}
            disabled={isPlaying}
            className={cn(
              'w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all duration-300',
              'bg-gradient-primary shadow-lg',
              isPlaying ? 'animate-pulse scale-110' : 'hover:scale-105 hover:shadow-glow',
            )}
          >
            {isPlaying ? <Pause className="h-8 w-8 text-primary-foreground" /> : <Play className="h-8 w-8 text-primary-foreground ml-1" />}
          </button>
          <p className="text-xs text-muted-foreground mt-3">{hasPlayed ? 'Click to replay' : 'Click to listen'}</p>
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

export default ListeningGameEngine;
