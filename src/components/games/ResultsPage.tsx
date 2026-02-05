 import { GameResult, AIFeedback } from '@/types/game';
 import { Trophy, Target, Lightbulb, TrendingUp, RotateCcw, Home, Sparkles, CheckCircle, XCircle } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { cn } from '@/lib/utils';
 import { useMemo } from 'react';
 
 interface ResultsPageProps {
   result: GameResult;
   onRetry: () => void;
   onHome: () => void;
   moduleTitle: string;
 }
 
 const generateAIFeedback = (result: GameResult): AIFeedback => {
   const score = (result.correctAnswers / result.totalQuestions) * 100;
   
   const strengths: string[] = [];
   const improvements: string[] = [];
   const tips: string[] = [];
   
   if (score >= 80) {
     strengths.push('Excellent grasp of grammar fundamentals');
     strengths.push('Quick and accurate responses');
     tips.push('Try more advanced modules to challenge yourself');
   } else if (score >= 60) {
     strengths.push('Good understanding of basic grammar rules');
     improvements.push('Review verb tense consistency');
     tips.push('Practice with similar exercises daily for better retention');
   } else {
     improvements.push('Focus on subject-verb agreement');
     improvements.push('Review basic sentence structure');
     tips.push('Start with easier modules and build up gradually');
     tips.push('Read the explanations carefully for each question');
   }
   
   // Analyze specific mistakes
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
 
 const ResultsPage = ({ result, onRetry, onHome, moduleTitle }: ResultsPageProps) => {
   const feedback = useMemo(() => generateAIFeedback(result), [result]);
   const score = Math.round((result.correctAnswers / result.totalQuestions) * 100);
   
   const getScoreColor = () => {
     if (score >= 80) return 'text-success';
     if (score >= 60) return 'text-warning';
     return 'text-destructive';
   };
   
   const getScoreMessage = () => {
     if (score >= 80) return 'Excellent work! 🎉';
     if (score >= 60) return 'Good job! Keep practicing! 💪';
     return 'Keep learning! You got this! 📚';
   };
   
   return (
     <div className="min-h-screen bg-background p-4 md:p-8">
       <div className="max-w-2xl mx-auto">
         {/* Header */}
         <div className="text-center mb-10 animate-slide-up">
           <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6 animate-bounce-in">
             <Trophy className="h-10 w-10 text-primary-foreground" />
           </div>
           
           <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
             {getScoreMessage()}
           </h1>
           <p className="text-muted-foreground">{moduleTitle} Complete</p>
         </div>
         
         {/* Score card */}
         <div className="glass-card p-8 text-center mb-8 animate-slide-up animate-delay-100">
           <div className={cn('text-6xl md:text-7xl font-bold mb-2', getScoreColor())}>
             {score}%
           </div>
           <p className="text-muted-foreground">
             {result.correctAnswers} of {result.totalQuestions} correct
           </p>
           
           {/* Visual score representation */}
           <div className="flex justify-center gap-2 mt-6">
             {result.answers.map((answer, index) => (
               <div
                 key={index}
                 className={cn(
                   'w-10 h-10 rounded-full flex items-center justify-center animate-bounce-in',
                   answer.isCorrect ? 'bg-success/20' : 'bg-destructive/20'
                 )}
                 style={{ animationDelay: `${index * 100 + 200}ms` }}
               >
                 {answer.isCorrect ? (
                   <CheckCircle className="h-5 w-5 text-success" />
                 ) : (
                   <XCircle className="h-5 w-5 text-destructive" />
                 )}
               </div>
             ))}
           </div>
         </div>
         
         {/* AI Feedback */}
         <div className="glass-card p-6 mb-8 animate-slide-up animate-delay-200">
           <div className="flex items-center gap-3 mb-6">
             <div className="p-2 rounded-lg bg-gradient-primary">
               <Sparkles className="h-5 w-5 text-primary-foreground" />
             </div>
             <h2 className="text-xl font-bold text-foreground">AI Feedback</h2>
           </div>
           
           {/* Strengths */}
           {feedback.strengths.length > 0 && (
             <div className="mb-6">
               <div className="flex items-center gap-2 mb-3">
                 <Target className="h-4 w-4 text-success" />
                 <h3 className="font-semibold text-success">Strengths</h3>
               </div>
               <ul className="space-y-2">
                 {feedback.strengths.map((strength, index) => (
                   <li 
                     key={index}
                     className="flex items-start gap-2 text-sm text-foreground bg-success/10 p-3 rounded-lg"
                   >
                     <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                     {strength}
                   </li>
                 ))}
               </ul>
             </div>
           )}
           
           {/* Areas for improvement */}
           {feedback.improvements.length > 0 && (
             <div className="mb-6">
               <div className="flex items-center gap-2 mb-3">
                 <TrendingUp className="h-4 w-4 text-warning" />
                 <h3 className="font-semibold text-warning">Areas to Improve</h3>
               </div>
               <ul className="space-y-2">
                 {feedback.improvements.map((improvement, index) => (
                   <li 
                     key={index}
                     className="flex items-start gap-2 text-sm text-foreground bg-warning/10 p-3 rounded-lg"
                   >
                     <TrendingUp className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                     {improvement}
                   </li>
                 ))}
               </ul>
             </div>
           )}
           
           {/* Tips */}
           {feedback.tips.length > 0 && (
             <div>
               <div className="flex items-center gap-2 mb-3">
                 <Lightbulb className="h-4 w-4 text-primary" />
                 <h3 className="font-semibold text-primary">Tips for Next Time</h3>
               </div>
               <ul className="space-y-2">
                 {feedback.tips.map((tip, index) => (
                   <li 
                     key={index}
                     className="flex items-start gap-2 text-sm text-foreground bg-primary/10 p-3 rounded-lg"
                   >
                     <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                     {tip}
                   </li>
                 ))}
               </ul>
             </div>
           )}
         </div>
         
         {/* Question Review */}
         <div className="glass-card p-6 mb-8 animate-slide-up animate-delay-300">
           <h2 className="text-xl font-bold text-foreground mb-4">Question Review</h2>
           <div className="space-y-4">
             {result.answers.map((answer, index) => (
               <div 
                 key={index}
                 className={cn(
                   'p-4 rounded-xl border',
                   answer.isCorrect ? 'border-success/30 bg-success/5' : 'border-destructive/30 bg-destructive/5'
                 )}
               >
                 <div className="flex items-start justify-between gap-4 mb-2">
                   <span className="text-sm font-medium text-muted-foreground">Question {index + 1}</span>
                   {answer.isCorrect ? (
                     <span className="text-xs font-medium text-success bg-success/20 px-2 py-1 rounded-full">Correct</span>
                   ) : (
                     <span className="text-xs font-medium text-destructive bg-destructive/20 px-2 py-1 rounded-full">Incorrect</span>
                   )}
                 </div>
                 {!answer.isCorrect && (
                   <div className="text-sm space-y-1">
                     <p><span className="text-destructive">Your answer:</span> {answer.userAnswer}</p>
                     <p><span className="text-success">Correct answer:</span> {answer.correctAnswer}</p>
                   </div>
                 )}
                 <p className="text-xs text-muted-foreground mt-2 italic">{answer.explanation}</p>
               </div>
             ))}
           </div>
         </div>
         
         {/* Action buttons */}
         <div className="flex gap-4 animate-slide-up animate-delay-400">
           <Button
             onClick={onRetry}
             variant="outline"
             className="flex-1 py-6 rounded-xl"
           >
             <RotateCcw className="h-5 w-5 mr-2" />
             Try Again
           </Button>
           <Button
             onClick={onHome}
             className="flex-1 btn-gradient py-6 rounded-xl"
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