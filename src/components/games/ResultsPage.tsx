import { GameResult } from '@/types/game';
import { 
  Trophy, Target, Lightbulb, TrendingUp, RotateCcw, Home, 
  CheckCircle, XCircle, Zap, Clock, ChevronDown, ChevronUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMemo, useState, useEffect } from 'react';

interface ResultsPageProps {
  result: GameResult;
  onRetry: () => void;
  onHome: () => void;
  moduleTitle: string;
}

const generateAIFeedback = (result: GameResult) => {
  const score = (result.correctAnswers / result.totalQuestions) * 100;
  
  const strengths: string[] = [];
  const improvements: string[] = [];
  const tips: string[] = [];
  
  if (score >= 80) {
    strengths.push('Strong command of grammar fundamentals');
    strengths.push('Accurate and confident responses');
    tips.push('Challenge yourself with advanced modules');
  } else if (score >= 60) {
    strengths.push('Good understanding of basic rules');
    improvements.push('Review verb tense consistency');
    tips.push('Practice daily for better retention');
  } else {
    improvements.push('Focus on subject-verb agreement');
    improvements.push('Review basic sentence structure');
    tips.push('Start with easier modules');
  }
  
  return { overallScore: score, strengths, improvements, tips };
};

const getScoreData = (score: number) => {
  if (score === 100) return { message: 'Perfect!', color: 'text-success', bg: 'bg-success/10', border: 'border-success/30' };
  if (score >= 80) return { message: 'Excellent!', color: 'text-success', bg: 'bg-success/10', border: 'border-success/30' };
  if (score >= 60) return { message: 'Good Job!', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' };
  if (score >= 40) return { message: 'Keep Going!', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' };
  return { message: 'Keep Practicing!', color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30' };
};

const ResultsPage = ({ result, onRetry, onHome, moduleTitle }: ResultsPageProps) => {
  const feedback = useMemo(() => generateAIFeedback(result), [result]);
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
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-5xl mx-auto animate-slide-up">
        {/* Top Section: Score Overview */}
        <div className={cn(
          'rounded-2xl p-6 md:p-8 mb-6 border',
          scoreData.bg,
          scoreData.border
        )}>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {/* Left: Score Circle */}
            <div className="flex flex-col items-center text-center">
              <div className={cn(
                'w-28 h-28 rounded-full flex items-center justify-center mb-3',
                'bg-gradient-primary shadow-lg'
              )}>
                <span className="text-4xl font-bold text-primary-foreground tabular-nums">
                  {animatedScore}%
                </span>
              </div>
              <h1 className={cn('text-2xl font-bold', scoreData.color)}>
                {scoreData.message}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">{moduleTitle}</p>
            </div>
            
            {/* Center: Stats */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <div className="text-center px-4 py-2">
                <div className="flex items-center justify-center gap-1 text-success mb-1">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-2xl font-bold">{result.correctAnswers}</span>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Correct</p>
              </div>
              <div className="text-center px-4 py-2">
                <div className="flex items-center justify-center gap-1 text-destructive mb-1">
                  <XCircle className="h-4 w-4" />
                  <span className="text-2xl font-bold">{result.totalQuestions - result.correctAnswers}</span>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Incorrect</p>
              </div>
              <div className="text-center px-4 py-2">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-2xl font-bold">{Math.floor(result.timeTaken / 60)}:{(result.timeTaken % 60).toString().padStart(2, '0')}</span>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Time</p>
              </div>
            </div>
            
            {/* Right: XP & Answers Visual */}
            <div className="flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-bold text-primary">+{xpEarned} XP</span>
              </div>
              <div className="flex gap-1.5">
                {result.answers.map((answer, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center animate-bounce-in',
                      answer.isCorrect ? 'bg-success/20' : 'bg-destructive/20'
                    )}
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {answer.isCorrect ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle Section: AI Feedback */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* Strengths */}
          {feedback.strengths.length > 0 && (
            <div className="glass-card p-5 border border-success/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <Target className="h-4 w-4 text-success" />
                </div>
                <h3 className="font-semibold text-foreground">Strengths</h3>
              </div>
              <ul className="space-y-2">
                {feedback.strengths.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Improvements */}
          {feedback.improvements.length > 0 && (
            <div className="glass-card p-5 border border-warning/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <TrendingUp className="h-4 w-4 text-warning" />
                </div>
                <h3 className="font-semibold text-foreground">To Improve</h3>
              </div>
              <ul className="space-y-2">
                {feedback.improvements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Tips */}
          <div className="glass-card p-5 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Lightbulb className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Pro Tips</h3>
            </div>
            <ul className="space-y-2">
              {feedback.tips.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Question Review - Collapsible */}
        <div className="glass-card mb-6 overflow-hidden">
          <button
            onClick={() => setShowReview(!showReview)}
            className="w-full flex items-center justify-between p-5 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5 text-primary" />
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
            <div className="border-t border-border p-5 space-y-3 animate-slide-up">
              {result.answers.map((answer, i) => (
                <div 
                  key={i}
                  className={cn(
                    'p-4 rounded-xl border',
                    answer.isCorrect 
                      ? 'border-success/30 bg-success/5' 
                      : 'border-destructive/30 bg-destructive/5'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Question {i + 1}
                    </span>
                    {answer.isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-success">
                        <CheckCircle className="h-3 w-3" /> Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-medium text-destructive">
                        <XCircle className="h-3 w-3" /> Incorrect
                      </span>
                    )}
                  </div>
                  {!answer.isCorrect && (
                    <div className="grid md:grid-cols-2 gap-2 mb-2 text-sm">
                      <div className="flex items-center gap-2 text-destructive">
                        <XCircle className="h-3 w-3" />
                        <span>Your answer: <strong>{answer.userAnswer}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-success">
                        <CheckCircle className="h-3 w-3" />
                        <span>Correct: <strong>{answer.correctAnswer}</strong></span>
                      </div>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded-lg">
                    💡 {answer.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Bottom Section: Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onRetry}
            variant="outline"
            className="flex-1 py-5 rounded-xl text-base font-medium hover:scale-[1.02] transition-transform"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Button
            onClick={onHome}
            className="flex-1 btn-gradient py-5 rounded-xl text-base font-medium hover:scale-[1.02] transition-transform"
          >
            <Home className="h-4 w-4 mr-2" />
            Continue Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
