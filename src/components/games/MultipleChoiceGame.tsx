 import { useState } from 'react';
 import { Question } from '@/types/game';
 import { cn } from '@/lib/utils';
 import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 interface MultipleChoiceGameProps {
   question: Question;
   onAnswer: (answer: string, isCorrect: boolean) => void;
   showResult: boolean;
 }
 
 const MultipleChoiceGame = ({ question, onAnswer, showResult }: MultipleChoiceGameProps) => {
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
   
   const optionLabels = ['A', 'B', 'C', 'D'];
   
   return (
     <div className="animate-slide-up">
       <div className="text-center mb-8">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
           <HelpCircle className="h-4 w-4" />
           <span className="text-sm font-medium">Multiple Choice</span>
         </div>
         <h2 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed">
           {question.prompt}
         </h2>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
         {question.options?.map((option, index) => {
           const isSelected = selectedAnswer === option;
           const isCorrect = option === question.correctAnswer;
           const showCorrect = showResult && isCorrect;
           const showIncorrect = showResult && isSelected && !isCorrect;
           
           return (
             <button
               key={option}
               onClick={() => handleSelect(option)}
               disabled={showResult}
               className={cn(
                 'group relative p-5 rounded-2xl border-2 text-left transition-all duration-300 animate-slide-up',
                 'hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02]',
                 !showResult && !isSelected && 'border-border bg-card hover:border-primary/50',
                 !showResult && isSelected && 'border-primary bg-primary/10 shadow-lg scale-[1.02]',
                 showCorrect && 'border-success bg-success/10',
                 showIncorrect && 'border-destructive bg-destructive/10 animate-shake'
               )}
               style={{ animationDelay: `${index * 100}ms` }}
             >
               <div className="flex items-start gap-4">
                 <span className={cn(
                   'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold transition-all',
                   !showResult && !isSelected && 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary',
                   !showResult && isSelected && 'bg-primary text-primary-foreground',
                   showCorrect && 'bg-success text-success-foreground',
                   showIncorrect && 'bg-destructive text-destructive-foreground'
                 )}>
                   {optionLabels[index]}
                 </span>
                 <span className="flex-1 text-base font-medium pt-2">{option}</span>
                 {showCorrect && (
                   <CheckCircle2 className="flex-shrink-0 h-6 w-6 text-success animate-bounce-in" />
                 )}
                 {showIncorrect && (
                   <XCircle className="flex-shrink-0 h-6 w-6 text-destructive animate-bounce-in" />
                 )}
               </div>
             </button>
           );
         })}
       </div>
       
       {showResult && (
         <div className={cn(
           'p-5 rounded-2xl mb-6 animate-bounce-in',
           selectedAnswer === question.correctAnswer
             ? 'bg-success/10 border border-success/30'
             : 'bg-destructive/10 border border-destructive/30'
         )}>
           <p className="text-sm text-foreground leading-relaxed">
             <strong className="text-base">💡 Explanation:</strong><br />
             {question.explanation}
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
 
 export default MultipleChoiceGame;