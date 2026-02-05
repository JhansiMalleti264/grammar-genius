 import { useState } from 'react';
 import { Question } from '@/types/game';
 import { cn } from '@/lib/utils';
 import { CheckCircle2, XCircle, Search, AlertTriangle } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 interface SpotErrorGameProps {
   question: Question;
   onAnswer: (answer: string, isCorrect: boolean) => void;
   showResult: boolean;
 }
 
 const SpotErrorGame = ({ question, onAnswer, showResult }: SpotErrorGameProps) => {
   const [selectedWord, setSelectedWord] = useState<number | null>(null);
   
   const words = question.sentence?.split(' ') || [];
   const correctWordIndex = words.findIndex(w => 
     w.toLowerCase().replace(/[.,!?]/g, '') === question.correctAnswer.toLowerCase().replace(/[.,!?]/g, '')
   );
   
   const handleWordClick = (index: number) => {
     if (showResult) return;
     setSelectedWord(selectedWord === index ? null : index);
   };
   
   const handleSubmit = () => {
     if (selectedWord !== null) {
       const selectedWordText = words[selectedWord].replace(/[.,!?]/g, '');
       onAnswer(selectedWordText, selectedWord === correctWordIndex);
     }
   };
   
   return (
     <div className="animate-slide-up">
       <div className="text-center mb-8">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 text-warning mb-4">
           <Search className="h-4 w-4" />
           <span className="text-sm font-medium">Spot the Error</span>
         </div>
         <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
           {question.prompt}
         </h2>
         <p className="text-muted-foreground">
           Click on the word that contains an error
         </p>
       </div>
       
       {/* Sentence with clickable words */}
       <div className="glass-card p-8 mb-8">
         <div className="flex items-center gap-2 mb-4 text-warning">
           <AlertTriangle className="h-5 w-5" />
           <span className="text-sm font-medium">Find the mistake:</span>
         </div>
         <div className="flex flex-wrap gap-2 justify-center">
           {words.map((word, index) => {
             const isSelected = selectedWord === index;
             const isCorrectWord = index === correctWordIndex;
             
             return (
               <button
                 key={index}
                 onClick={() => handleWordClick(index)}
                 disabled={showResult}
                 className={cn(
                   'px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 animate-slide-up',
                   'hover:scale-110 active:scale-95',
                   !showResult && !isSelected && 'bg-muted hover:bg-primary/20 hover:text-primary',
                   !showResult && isSelected && 'bg-primary text-primary-foreground scale-110 shadow-lg ring-2 ring-primary ring-offset-2',
                   showResult && isCorrectWord && 'bg-destructive text-destructive-foreground line-through',
                   showResult && isSelected && !isCorrectWord && 'bg-muted text-muted-foreground'
                 )}
                 style={{ animationDelay: `${index * 50}ms` }}
               >
                 {word}
               </button>
             );
           })}
         </div>
       </div>
       
       {/* Result feedback */}
       {showResult && (
         <div className="space-y-4 mb-6 animate-bounce-in">
           {selectedWord === correctWordIndex ? (
             <div className="flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/30">
               <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
               <p className="text-success font-medium">
                 Correct! You found the error.
               </p>
             </div>
           ) : (
             <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30">
               <XCircle className="h-6 w-6 text-destructive flex-shrink-0" />
               <div>
                 <p className="text-destructive font-medium">Not quite right.</p>
                 <p className="text-sm text-foreground mt-1">
                   The error was: <strong className="text-destructive">"{question.correctAnswer}"</strong>
                 </p>
               </div>
             </div>
           )}
           
           <div className="p-4 rounded-xl bg-muted/50 border border-border">
             <p className="text-sm text-foreground">
               <strong>Explanation:</strong> {question.explanation}
             </p>
           </div>
         </div>
       )}
       
       {!showResult && (
         <Button
           onClick={handleSubmit}
           disabled={selectedWord === null}
           className="w-full btn-gradient py-6 text-lg rounded-xl"
         >
           Submit Answer
         </Button>
       )}
     </div>
   );
 };
 
 export default SpotErrorGame;