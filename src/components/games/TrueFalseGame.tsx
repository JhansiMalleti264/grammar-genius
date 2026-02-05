 import { useState } from 'react';
 import { Question } from '@/types/game';
 import { cn } from '@/lib/utils';
 import { CheckCircle2, XCircle, ThumbsUp, ThumbsDown, HelpCircle } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 interface TrueFalseGameProps {
   question: Question;
   onAnswer: (answer: string, isCorrect: boolean) => void;
   showResult: boolean;
 }
 
 const TrueFalseGame = ({ question, onAnswer, showResult }: TrueFalseGameProps) => {
   const [selectedAnswer, setSelectedAnswer] = useState<'true' | 'false' | null>(null);
   
   const handleSelect = (answer: 'true' | 'false') => {
     if (showResult) return;
     setSelectedAnswer(answer);
   };
   
   const handleSubmit = () => {
     if (selectedAnswer) {
       const correctAnswer = question.isTrue ? 'true' : 'false';
       onAnswer(selectedAnswer, selectedAnswer === correctAnswer);
     }
   };
   
   const correctAnswer = question.isTrue ? 'true' : 'false';
   
   return (
     <div className="animate-slide-up">
       <div className="text-center mb-8">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-reading/10 text-reading mb-4">
           <HelpCircle className="h-4 w-4" />
           <span className="text-sm font-medium">True or False</span>
         </div>
         <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
           {question.prompt}
         </h2>
       </div>
       
       {/* Statement */}
       <div className="glass-card p-6 mb-8">
         <p className="text-xl font-medium text-center text-foreground leading-relaxed">
           "{question.statement || question.sentence}"
         </p>
       </div>
       
       {/* True/False buttons */}
       <div className="grid grid-cols-2 gap-6 mb-8">
         {/* True button */}
         <button
           onClick={() => handleSelect('true')}
           disabled={showResult}
           className={cn(
             'group relative p-8 rounded-2xl border-3 transition-all duration-300 animate-slide-up',
             'hover:shadow-2xl transform hover:scale-105',
             !showResult && selectedAnswer !== 'true' && 'border-border bg-card hover:border-success hover:bg-success/5',
             !showResult && selectedAnswer === 'true' && 'border-success bg-success/10 scale-105 shadow-xl',
             showResult && correctAnswer === 'true' && 'border-success bg-success/20',
             showResult && selectedAnswer === 'true' && correctAnswer !== 'true' && 'border-destructive bg-destructive/10'
           )}
         >
           <div className="flex flex-col items-center gap-3">
             <div className={cn(
               'p-4 rounded-full transition-all',
               !showResult && 'bg-success/10 group-hover:bg-success/20',
               selectedAnswer === 'true' && 'bg-success/20',
               showResult && correctAnswer === 'true' && 'bg-success/30'
             )}>
               <ThumbsUp className={cn(
                 'h-10 w-10 transition-colors',
                 selectedAnswer === 'true' || (showResult && correctAnswer === 'true') 
                   ? 'text-success' 
                   : 'text-success/60 group-hover:text-success'
               )} />
             </div>
             <span className="text-xl font-bold">TRUE</span>
           </div>
           
           {showResult && correctAnswer === 'true' && (
             <CheckCircle2 className="absolute top-3 right-3 h-6 w-6 text-success animate-bounce-in" />
           )}
           {showResult && selectedAnswer === 'true' && correctAnswer !== 'true' && (
             <XCircle className="absolute top-3 right-3 h-6 w-6 text-destructive animate-bounce-in" />
           )}
         </button>
         
         {/* False button */}
         <button
           onClick={() => handleSelect('false')}
           disabled={showResult}
           className={cn(
             'group relative p-8 rounded-2xl border-3 transition-all duration-300 animate-slide-up animate-delay-100',
             'hover:shadow-2xl transform hover:scale-105',
             !showResult && selectedAnswer !== 'false' && 'border-border bg-card hover:border-destructive hover:bg-destructive/5',
             !showResult && selectedAnswer === 'false' && 'border-destructive bg-destructive/10 scale-105 shadow-xl',
             showResult && correctAnswer === 'false' && 'border-success bg-success/20',
             showResult && selectedAnswer === 'false' && correctAnswer !== 'false' && 'border-destructive bg-destructive/10'
           )}
         >
           <div className="flex flex-col items-center gap-3">
             <div className={cn(
               'p-4 rounded-full transition-all',
               !showResult && 'bg-destructive/10 group-hover:bg-destructive/20',
               selectedAnswer === 'false' && 'bg-destructive/20',
               showResult && correctAnswer === 'false' && 'bg-success/30'
             )}>
               <ThumbsDown className={cn(
                 'h-10 w-10 transition-colors',
                 selectedAnswer === 'false' 
                   ? 'text-destructive' 
                   : showResult && correctAnswer === 'false'
                     ? 'text-success'
                     : 'text-destructive/60 group-hover:text-destructive'
               )} />
             </div>
             <span className="text-xl font-bold">FALSE</span>
           </div>
           
           {showResult && correctAnswer === 'false' && (
             <CheckCircle2 className="absolute top-3 right-3 h-6 w-6 text-success animate-bounce-in" />
           )}
           {showResult && selectedAnswer === 'false' && correctAnswer !== 'false' && (
             <XCircle className="absolute top-3 right-3 h-6 w-6 text-destructive animate-bounce-in" />
           )}
         </button>
       </div>
       
       {showResult && (
         <div className={cn(
           'p-4 rounded-xl mb-6 animate-bounce-in',
           selectedAnswer === correctAnswer
             ? 'bg-success/10 border border-success/30'
             : 'bg-destructive/10 border border-destructive/30'
         )}>
           <p className="text-sm text-foreground">
             <strong>Explanation:</strong> {question.explanation}
           </p>
         </div>
       )}
       
       {!showResult && (
         <Button
           onClick={handleSubmit}
           disabled={!selectedAnswer}
           className="w-full btn-gradient py-6 text-lg rounded-xl"
         >
           Check Answer
         </Button>
       )}
     </div>
   );
 };
 
 export default TrueFalseGame;