import { GameResult } from '@/types/game';
import { TrendingUp, Lightbulb, RotateCcw, Play, CheckCircle, XCircle, Zap, Clock, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMemo, useState, useEffect } from 'react';

interface ResultsPageProps {
  result: GameResult;
  onRetry: () => void;
  onHome: () => void;
  moduleTitle: string;
  levelLabel?: string;
}

const generateFeedback = (result: GameResult) => {
  const score = (result.correctAnswers / result.totalQuestions) * 100;
  const improvements: string[] = [];
  const tips: string[] = [];

  if (score >= 80) {
    tips.push('Challenge yourself with the next level to keep improving.');
    tips.push('Say the sentences out loud to hear the rhythm.');
  } else if (score >= 60) {
    improvements.push('Focus on subject-verb agreement in complex sentences.');
    improvements.push('Review basic sentence structure for negative forms.');
    tips.push('Start with easier modules to build your confidence.');
    tips.push('Say the sentences out loud to hear the rhythm.');
  } else {
    improvements.push('Focus on subject-verb agreement in complex sentences.');
    improvements.push('Review basic sentence structure for negative forms.');
    tips.push('Start with easier modules to build your confidence.');
    tips.push('Practice daily for 10 minutes for better retention.');
  }

  return { overallScore: score, improvements, tips };
};

const getScoreData = (score: number) => {
  if (score === 100) return { message: 'Perfect!', ring: 'stroke-success' };
  if (score >= 80) return { message: 'Excellent!', ring: 'stroke-success' };
  if (score >= 60) return { message: 'Good Job!', ring: 'stroke-primary' };
  if (score >= 40) return { message: 'Keep Going!', ring: 'stroke-warning' };
  return { message: 'Keep Practicing!', ring: 'stroke-destructive' };
};

const ResultsPage = ({ result, onRetry, onHome, moduleTitle, levelLabel }: ResultsPageProps) => {
  const feedback = useMemo(() => generateFeedback(result), [result]);
  const score = Math.round((result.correctAnswers / result.totalQuestions) * 100);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const scoreData = getScoreData(score);
  const xpEarned = result.correctAnswers * 10 + (score === 100 ? 50 : 0);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = score / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [score]);

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (circumference * animatedScore) / 100;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-3xl mx-auto animate-slide-up">

        {/* ── Score Overview Card ── */}
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-5 shadow-card">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Circular Score */}
            <div className="relative w-32 h-32 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" strokeWidth="8" className="stroke-muted" />
                <circle
                  cx="60" cy="60" r="54" fill="none" strokeWidth="8"
                  strokeLinecap="round"
                  className={cn(scoreData.ring, 'transition-all duration-1000 ease-out')}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-foreground tabular-nums">{animatedScore}%</span>
              </div>
            </div>

            {/* Score Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {scoreData.message}
              </h1>
              <p className="text-sm text-muted-foreground mb-4">
                {moduleTitle}{levelLabel ? ` • ${levelLabel}` : ''}
              </p>

              {/* Stats Row */}
              <div className="flex items-center justify-center sm:justify-start gap-6">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Correct</span>
                  <span className="text-xl font-bold text-foreground ml-1">{result.correctAnswers}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Incorrect</span>
                  <span className="text-xl font-bold text-foreground ml-1">{result.totalQuestions - result.correctAnswers}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Time</span>
                  <span className="text-xl font-bold text-foreground ml-1">
                    {Math.floor(result.timeTaken / 60)}:{(result.timeTaken % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* XP Badge + Dots */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold shadow-md">
                <Zap className="h-4 w-4" />
                +{xpEarned} XP
              </div>
              <div className="flex gap-1">
                {result.answers.map((answer, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-3 h-3 rounded-full animate-bounce-in',
                      answer.isCorrect ? 'bg-success' : 'bg-destructive'
                    )}
                    style={{ animationDelay: `${i * 60}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── AI Feedback Cards ── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          {feedback.improvements.length > 0 && (
            <div className="bg-card rounded-2xl border border-border p-5 shadow-card">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <TrendingUp className="h-4 w-4 text-warning" />
                </div>
                <h3 className="font-semibold text-foreground">Areas to Improve</h3>
              </div>
              <ul className="space-y-2.5">
                {feedback.improvements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-card rounded-2xl border border-border p-5 shadow-card">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Lightbulb className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Pro Tips</h3>
            </div>
            <ul className="space-y-2.5">
              {feedback.tips.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Collapsible Review Answers ── */}
        <div className="bg-card rounded-2xl border border-border mb-5 overflow-hidden shadow-card">
          <button
            onClick={() => setShowReview(!showReview)}
            className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold text-foreground">Review Answers</span>
              <span className="text-sm text-muted-foreground">
                ({result.correctAnswers}/{result.totalQuestions} correct)
              </span>
            </div>
            {showReview ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {showReview && (
            <div className="border-t border-border p-5 space-y-4 animate-slide-up">
              {result.answers.map((answer, i) => (
                <div
                  key={i}
                  className={cn(
                    'p-4 rounded-xl border',
                    answer.isCorrect
                      ? 'border-success/20 bg-success/5'
                      : 'border-destructive/20 bg-destructive/5'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Question {i + 1}
                    </span>
                    {answer.isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-success">
                        <CheckCircle className="h-3.5 w-3.5" /> CORRECT
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-destructive">
                        <XCircle className="h-3.5 w-3.5" /> INCORRECT
                      </span>
                    )}
                  </div>

                  {!answer.isCorrect && (
                    <div className="grid sm:grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-muted-foreground uppercase text-xs tracking-wide">Your Answer</span>
                        <span className="font-semibold text-destructive">{answer.userAnswer}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-muted-foreground uppercase text-xs tracking-wide">Correct Answer</span>
                        <span className="font-semibold text-success">{answer.correctAnswer}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/40 p-3 rounded-lg border border-border/50">
                    <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Linguistic Tip:</strong> {answer.explanation}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onRetry}
            variant="outline"
            className="flex-1 py-5 rounded-xl text-base font-medium border-border hover:border-primary/30 transition-all"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Button
            onClick={onHome}
            className="flex-1 btn-gradient py-5 rounded-xl text-base font-medium"
          >
            <Play className="h-4 w-4 mr-2 fill-current" />
            Continue Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
