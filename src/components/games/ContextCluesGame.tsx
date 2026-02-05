 import { useState } from 'react';
 import { Question } from '@/types/game';
 import { cn } from '@/lib/utils';
 import { CheckCircle2, XCircle, BookOpen, Lightbulb } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 interface ContextCluesGameProps {
   question: Question;
   onAnswer: (answer: string, isCorrect: boolean) => void;
   showResult: boolean;
 }
 
 const ContextCluesGame = ({ question, onAnswer, showResult }: ContextCluesGameProps) => {
   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
   const [showHint, setShowHint] = useState(false);
   
   const handleSelect = (option: string) => {
     if (showResult) return;
     setSelectedAnswer(option);
   };
   
   const handleSubmit = () => {
     if (selectedAnswer) {
       onAnswer(selectedAnswer, selectedAnswer === question.correctAnswer);
     }
   };
   
   // Parse the sentence with the blank
   const parts = question.sentence?.split('___') || ['', ''];
   
   return (
     <div className="animate-slide-up">
       <div className="text-center mb-8">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-listening/10 text-listening mb-4">
           <BookOpen className="h-4 w-4" />
           <span className="text-sm font-medium">Context Clues</span>
         </div>
         <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
           {question.prompt}
         </h2>
       </div>
       
       {/* Reading passage */}
       <div className="glass-card p-6 mb-6">
         <p className="text-lg leading-relaxed text-foreground">
           {parts[0]}
           <span className={cn(
             'inline-block min-w-[100px] mx-1 px-3 py-0.5 rounded-lg border-2 border-dashed transition-all font-medium',
             !selectedAnswer && 'border-muted-foreground/30 bg-muted/50',
             selectedAnswer && !showResult && 'border-primary bg-primary/10 text-primary',
             showResult && selectedAnswer === question.correctAnswer && 'border-success bg-success/10 text-success',
             showResult && selectedAnswer !== question.correctAnswer && 'border-destructive bg-destructive/10 text-destructive'
           )}>
             {selectedAnswer || '______'}
           </span>
           {parts[1]}
         </p>
       </div>
       
       {/* Hint toggle */}
       {!showResult && (
         <button
           onClick={() => setShowHint(!showHint)}
           className="flex items-center gap-2 mx-auto mb-4 text-sm text-muted-foreground hover:text-primary transition-colors"
         >
           <Lightbulb className="h-4 w-4" />
           {showHint ? 'Hide Hint' : 'Show Hint'}
         </button>
       )}
       
       {showHint && !showResult && (
         <div className="p-3 rounded-lg bg-warning/10 border border-warning/20 mb-6 text-center animate-bounce-in">
           <p className="text-sm text-warning">
             💡 Look for context clues in the surrounding words!
           </p>
         </div>
       )}
       
       {/* Options */}
       <div className="grid grid-cols-2 gap-3 mb-8">
         {question.options?.map((option, index) => (
           <button
             key={option}
             onClick={() => handleSelect(option)}
             disabled={showResult}
             className={cn(
               'p-4 rounded-xl border-2 text-center font-medium transition-all duration-300 animate-slide-up',
               'hover:shadow-lg transform hover:scale-105',
               !showResult && selectedAnswer !== option && 'border-border bg-card hover:border-listening',
               !showResult && selectedAnswer === option && 'border-listening bg-listening/10 scale-105 shadow-lg',
               showResult && option === question.correctAnswer && 'border-success bg-success/10',
               showResult && selectedAnswer === option && option !== question.correctAnswer && 'border-destructive bg-destructive/10'
             )}
             style={{ animationDelay: `${index * 100}ms` }}
           >
             <span className="flex items-center justify-center gap-2">
               {option}
               {showResult && option === question.correctAnswer && (
                 <CheckCircle2 className="h-5 w-5 text-success" />
               )}
               {showResult && selectedAnswer === option && option !== question.correctAnswer && (
                 <XCircle className="h-5 w-5 text-destructive" />
               )}
             </span>
           </button>
         ))}
       </div>
       
       {showResult && (
         <div className={cn(
           'p-4 rounded-xl mb-6 animate-bounce-in',
           selectedAnswer === question.correctAnswer
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
 
 export default ContextCluesGame;