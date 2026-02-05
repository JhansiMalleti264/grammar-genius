 import { useState } from 'react';
 import { Question } from '@/types/game';
 import { cn } from '@/lib/utils';
 import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 interface SentenceCorrectionGameProps {
   question: Question;
   onAnswer: (answer: string, isCorrect: boolean) => void;
   showResult: boolean;
 }
 
 const SentenceCorrectionGame = ({ question, onAnswer, showResult }: SentenceCorrectionGameProps) => {
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
   
   return (
     <div className="animate-slide-up">
       {/* Question */}
       <div className="text-center mb-8">
         <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
           {question.prompt}
         </h2>
         
         {/* Original sentence with error */}
         <div className="glass-card p-6 mb-8">
           <div className="flex items-center justify-center gap-2 mb-3">
             <AlertTriangle className="h-5 w-5 text-warning" />
             <span className="text-sm font-medium text-warning">Original Sentence</span>
           </div>
           <p className="text-xl text-foreground italic">
             "{question.sentence}"
           </p>
         </div>
       </div>
       
       {/* Options */}
       <div className="space-y-3 mb-8">
         {question.options?.map((option, index) => (
           <button
             key={option}
             onClick={() => handleSelect(option)}
             disabled={showResult}
             className={cn(
               'game-option text-left animate-slide-in-left',
               selectedAnswer === option && !showResult && 'game-option-selected',
               showResult && option === question.correctAnswer && 'game-option-correct',
               showResult && selectedAnswer === option && option !== question.correctAnswer && 'game-option-incorrect'
             )}
             style={{ animationDelay: `${index * 100}ms` }}
           >
             <div className="flex items-center justify-between gap-4">
               <span className="flex items-center gap-3">
                 <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                   {String.fromCharCode(65 + index)}
                 </span>
                 <span className="text-base">{option}</span>
               </span>
               {showResult && option === question.correctAnswer && (
                 <CheckCircle2 className="flex-shrink-0 h-6 w-6 text-success" />
               )}
               {showResult && selectedAnswer === option && option !== question.correctAnswer && (
                 <XCircle className="flex-shrink-0 h-6 w-6 text-destructive" />
               )}
             </div>
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
 
 export default SentenceCorrectionGame;