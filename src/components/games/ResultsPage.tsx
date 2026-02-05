import { GameResult } from '@/types/game';
import { Trophy, Target, Lightbulb, TrendingUp, RotateCcw, Home, Sparkles, CheckCircle, XCircle, Star, Zap, Award, Crown } from 'lucide-react';
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
     strengths.push('Excellent grasp of grammar fundamentals');
     strengths.push('Quick and accurate responses');
    strengths.push('Strong attention to detail');
     tips.push('Try more advanced modules to challenge yourself');
    tips.push('Consider teaching others what you\'ve learned');
   } else if (score >= 60) {
     strengths.push('Good understanding of basic grammar rules');
    strengths.push('Solid foundation to build upon');
     improvements.push('Review verb tense consistency');
    improvements.push('Practice with more complex sentences');
     tips.push('Practice with similar exercises daily for better retention');
    tips.push('Focus on one grammar concept at a time');
   } else {
     improvements.push('Focus on subject-verb agreement');
     improvements.push('Review basic sentence structure');
    improvements.push('Study common grammar patterns');
     tips.push('Start with easier modules and build up gradually');
     tips.push('Read the explanations carefully for each question');
    tips.push('Try practicing for 10 minutes daily');
   }
   
   const wrongAnswers = result.answers.filter(a => !a.isCorrect);
   if (wrongAnswers.length > 0) {
     improvements.push('Pay attention to context clues in sentences');
     tips.push('Take your time to read each option carefully');
   }
   
   return {
     overallScore: score,
     strengths,
     improvements,
     tips,
   };
 };
 
const getScoreEmoji = (score: number) => {
  if (score === 100) return '🏆';
  if (score >= 80) return '🌟';
  if (score >= 60) return '👍';
  if (score >= 40) return '💪';
  return '📚';
};

const getScoreMessage = (score: number) => {
  if (score === 100) return 'Perfect Score!';
  if (score >= 80) return 'Excellent Work!';
  if (score >= 60) return 'Good Progress!';
  if (score >= 40) return 'Keep Practicing!';
  return 'Never Give Up!';
};

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-success';
  if (score >= 60) return 'text-warning';
  return 'text-destructive';
};

const getGradientClass = (score: number) => {
  if (score >= 80) return 'from-success/20 to-success/5';
  if (score >= 60) return 'from-warning/20 to-warning/5';
  return 'from-destructive/20 to-destructive/5';
};

 const ResultsPage = ({ result, onRetry, onHome, moduleTitle }: ResultsPageProps) => {
   const feedback = useMemo(() => generateAIFeedback(result), [result]);
   const score = Math.round((result.correctAnswers / result.totalQuestions) * 100);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
   
  // Animate score counting
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
        if (score >= 80) setShowConfetti(true);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [score]);
  
  // XP calculation
  const xpEarned = result.correctAnswers * 10 + (score === 100 ? 50 : 0);
   
   return (
    <div className="min-h-screen bg-background p-4 md:p-8 overflow-hidden">
      {/* Confetti effect for high scores */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <span className="text-2xl">
                {['⭐', '🎉', '✨', '🌟', '💫'][Math.floor(Math.random() * 5)]}
              </span>
            </div>
          ))}
        </div>
      )}
      
       <div className="max-w-2xl mx-auto">
         {/* Header */}
         <div className="text-center mb-10 animate-slide-up">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-primary animate-pulse opacity-30" />
            <div className={cn(
              'absolute inset-1 rounded-full bg-gradient-to-br',
              getGradientClass(score)
            )} />
            <div className="relative w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center animate-bounce-in shadow-xl">
              {score === 100 ? (
                <Crown className="h-10 w-10 text-primary-foreground" />
              ) : score >= 80 ? (
                <Trophy className="h-10 w-10 text-primary-foreground" />
              ) : score >= 60 ? (
                <Award className="h-10 w-10 text-primary-foreground" />
              ) : (
                <Star className="h-10 w-10 text-primary-foreground" />
              )}
            </div>
           </div>
           
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-3">
            {getScoreMessage(score)}
            <span className="text-4xl">{getScoreEmoji(score)}</span>
           </h1>
          <p className="text-muted-foreground text-lg">{moduleTitle} Complete</p>
         </div>
         
        {/* Score card - Enhanced design */}
        <div className={cn(
          'relative glass-card p-8 text-center mb-8 animate-slide-up animate-delay-100 overflow-hidden',
          'border-2',
          score >= 80 ? 'border-success/30' : score >= 60 ? 'border-warning/30' : 'border-destructive/30'
        )}>
          {/* Background gradient */}
          <div className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-50',
            getGradientClass(score)
          )} />
          
          <div className="relative">
            {/* Score display */}
            <div className="mb-4">
              <div className={cn('text-7xl md:text-8xl font-black mb-1 tabular-nums', getScoreColor(score))}>
                {animatedScore}%
              </div>
              <p className="text-muted-foreground text-lg">
                {result.correctAnswers} of {result.totalQuestions} correct
              </p>
            </div>
            
            {/* XP earned badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-bounce-in animate-delay-200">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-bold text-primary">+{xpEarned} XP</span>
            </div>
            
            {/* Visual score representation - Enhanced */}
            <div className="flex justify-center gap-3 mt-6">
              {result.answers.map((answer, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center animate-bounce-in shadow-lg transition-transform hover:scale-110',
                    answer.isCorrect 
                      ? 'bg-gradient-to-br from-success to-success/70' 
                      : 'bg-gradient-to-br from-destructive to-destructive/70'
                  )}
                  style={{ animationDelay: `${index * 100 + 300}ms` }}
                >
                  {answer.isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-success-foreground" />
                  ) : (
                    <XCircle className="h-6 w-6 text-destructive-foreground" />
                  )}
                </div>
              ))}
            </div>
            
            {/* Time taken */}
            <p className="text-sm text-muted-foreground mt-4">
              Completed in {Math.floor(result.timeTaken / 60)}:{(result.timeTaken % 60).toString().padStart(2, '0')}
            </p>
           </div>
        </div>
         
        {/* AI Feedback - Enhanced */}
        <div className="glass-card p-6 mb-8 animate-slide-up animate-delay-200 border border-primary/20">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <div className="p-3 rounded-xl bg-gradient-primary shadow-lg">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
             </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">AI Performance Analysis</h2>
              <p className="text-sm text-muted-foreground">Personalized feedback based on your answers</p>
            </div>
           </div>
           
           {/* Strengths */}
           {feedback.strengths.length > 0 && (
             <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-success/10">
                  <Target className="h-4 w-4 text-success" />
                </div>
                <h3 className="font-bold text-success">Your Strengths</h3>
               </div>
              <ul className="space-y-3">
                 {feedback.strengths.map((strength, index) => (
                   <li 
                     key={index}
                    className="flex items-start gap-3 text-sm text-foreground bg-success/10 p-4 rounded-xl border border-success/20 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                   >
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{strength}</span>
                   </li>
                 ))}
               </ul>
             </div>
           )}
           
           {/* Areas for improvement */}
           {feedback.improvements.length > 0 && (
             <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-warning/10">
                  <TrendingUp className="h-4 w-4 text-warning" />
                </div>
                <h3 className="font-bold text-warning">Areas to Improve</h3>
               </div>
              <ul className="space-y-3">
                 {feedback.improvements.map((improvement, index) => (
                   <li 
                     key={index}
                    className="flex items-start gap-3 text-sm text-foreground bg-warning/10 p-4 rounded-xl border border-warning/20 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                   >
                    <TrendingUp className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{improvement}</span>
                   </li>
                 ))}
               </ul>
             </div>
           )}
           
           {/* Tips */}
           {feedback.tips.length > 0 && (
             <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Lightbulb className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-bold text-primary">Pro Tips</h3>
               </div>
              <ul className="space-y-3">
                 {feedback.tips.map((tip, index) => (
                   <li 
                     key={index}
                    className="flex items-start gap-3 text-sm text-foreground bg-primary/10 p-4 rounded-xl border border-primary/20 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                   >
                    <Lightbulb className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{tip}</span>
                   </li>
                 ))}
               </ul>
             </div>
           )}
         </div>
         
        {/* Question Review - Enhanced */}
         <div className="glass-card p-6 mb-8 animate-slide-up animate-delay-300">
          <h2 className="text-xl font-bold text-foreground mb-6">Question Review</h2>
           <div className="space-y-4">
             {result.answers.map((answer, index) => (
               <div 
                 key={index}
                 className={cn(
                  'p-5 rounded-2xl border-2 transition-all hover:shadow-lg',
                  answer.isCorrect 
                    ? 'border-success/40 bg-gradient-to-br from-success/10 to-success/5' 
                    : 'border-destructive/40 bg-gradient-to-br from-destructive/10 to-destructive/5'
                 )}
               >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                      answer.isCorrect ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                    )}>
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">Question {index + 1}</span>
                  </div>
                   {answer.isCorrect ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-success bg-success/20 px-3 py-1.5 rounded-full">
                      <CheckCircle className="h-3.5 w-3.5" />
                      Correct
                    </span>
                   ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-destructive bg-destructive/20 px-3 py-1.5 rounded-full">
                      <XCircle className="h-3.5 w-3.5" />
                      Incorrect
                    </span>
                   )}
                 </div>
                 {!answer.isCorrect && (
                  <div className="text-sm space-y-2 mb-3 p-3 rounded-xl bg-background/50">
                    <p className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-destructive" />
                      <span className="text-muted-foreground">Your answer:</span>
                      <span className="font-medium text-destructive">{answer.userAnswer}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-muted-foreground">Correct:</span>
                      <span className="font-medium text-success">{answer.correctAnswer}</span>
                    </p>
                   </div>
                 )}
                <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg italic">
                  💡 {answer.explanation}
                </p>
               </div>
             ))}
           </div>
         </div>
         
        {/* Action buttons - Enhanced */}
        <div className="flex gap-4 animate-slide-up animate-delay-400 pb-8">
           <Button
             onClick={onRetry}
             variant="outline"
            className="flex-1 py-6 rounded-xl text-lg font-semibold hover:scale-105 transition-transform"
           >
             <RotateCcw className="h-5 w-5 mr-2" />
             Try Again
           </Button>
           <Button
             onClick={onHome}
            className="flex-1 btn-gradient py-6 rounded-xl text-lg font-semibold hover:scale-105 transition-transform"
           >
             <Home className="h-5 w-5 mr-2" />
             Back Home
           </Button>
         </div>
       </div>
     </div>
   );
 };
 
 export default ResultsPage;