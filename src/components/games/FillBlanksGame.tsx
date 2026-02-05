 import { useState } from 'react';
 import { Question } from '@/types/game';
 import { cn } from '@/lib/utils';
 import { CheckCircle2, XCircle } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 interface FillBlanksGameProps {
   question: Question;
   onAnswer: (answer: string, isCorrect: boolean) => void;
   showResult: boolean;
 }
 
 const FillBlanksGame = ({ question, onAnswer, showResult }: FillBlanksGameProps) => {
   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
   
   const handleSelect = (option: string) => {
     if (showResult) return;
     setSelectedAnswer(option);
   };
   
   const handleSubmit = () => {
     if (selectedAnswer) {
       onAnswer(selectedAnswer, selectedAnswer === question.correctAnswer);
     }
   };
   
   // Parse the prompt to show blank
   const parts = question.prompt.split('___');
   
   return (
     <div className="animate-slide-up">
       {/* Question */}
       <div className="text-center mb-10">
         <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
           Fill in the blank
         </h2>
         <p className="text-xl md:text-2xl text-foreground leading-relaxed">
           {parts[0]}
           <span className={cn(
             'inline-block min-w-[120px] mx-2 px-4 py-1 rounded-lg border-2 border-dashed transition-all',
             selectedAnswer 
               ? showResult
                 ? selectedAnswer === question.correctAnswer
                   ? 'border-success bg-success/10 text-success'
                   : 'border-destructive bg-destructive/10 text-destructive'
                 : 'border-primary bg-primary/10 text-primary'
               : 'border-muted-foreground/30'
           )}>
             {selectedAnswer || '______'}
           </span>
           {parts[1]}
         </p>
       </div>
       
       {/* Options */}
       <div className="grid grid-cols-2 gap-4 mb-8">
         {question.options?.map((option, index) => (
           <button
             key={option}
             onClick={() => handleSelect(option)}
             disabled={showResult}
             className={cn(
               'game-option relative animate-slide-up',
               selectedAnswer === option && !showResult && 'game-option-selected',
               showResult && option === question.correctAnswer && 'game-option-correct',
               showResult && selectedAnswer === option && option !== question.correctAnswer && 'game-option-incorrect'
             )}
             style={{ animationDelay: `${index * 100}ms` }}
           >
             <span className="text-lg font-medium">{option}</span>
             {showResult && option === question.correctAnswer && (
               <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-success" />
             )}
             {showResult && selectedAnswer === option && option !== question.correctAnswer && (
               <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-destructive" />
             )}
           </button>
         ))}
       </div>
       
       {/* Explanation */}
       {showResult && (
         <div className={cn(
           'p-4 rounded-xl mb-6 animate-bounce-in',
           selectedAnswer === question.correctAnswer
             ? 'bg-success/10 border border-success/20'
             : 'bg-destructive/10 border border-destructive/20'
         )}>
           <p className="text-sm text-foreground">
             <strong>Explanation:</strong> {question.explanation}
           </p>
         </div>
       )}
       
       {/* Submit button */}
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
 
 export default FillBlanksGame;