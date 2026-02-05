 import { useState, useEffect } from 'react';
 import { Question } from '@/types/game';
 import { cn } from '@/lib/utils';
 import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 interface WordOrderGameProps {
   question: Question;
   onAnswer: (answer: string, isCorrect: boolean) => void;
   showResult: boolean;
 }
 
 const WordOrderGame = ({ question, onAnswer, showResult }: WordOrderGameProps) => {
   const [selectedWords, setSelectedWords] = useState<string[]>([]);
   const [availableWords, setAvailableWords] = useState<string[]>([]);
   
   useEffect(() => {
     // Shuffle words
     const shuffled = [...(question.words || [])].sort(() => Math.random() - 0.5);
     setAvailableWords(shuffled);
     setSelectedWords([]);
   }, [question]);
   
   const handleWordClick = (word: string, fromSelected: boolean) => {
     if (showResult) return;
     
     if (fromSelected) {
       setSelectedWords(prev => prev.filter((_, i) => i !== prev.indexOf(word)));
       setAvailableWords(prev => [...prev, word]);
     } else {
       const index = availableWords.indexOf(word);
       setAvailableWords(prev => prev.filter((_, i) => i !== index));
       setSelectedWords(prev => [...prev, word]);
     }
   };
   
   const handleReset = () => {
     const shuffled = [...(question.words || [])].sort(() => Math.random() - 0.5);
     setAvailableWords(shuffled);
     setSelectedWords([]);
   };
   
   const handleSubmit = () => {
     const answer = selectedWords.join(' ');
     // Check if the answer matches (case insensitive, ignoring punctuation differences)
     const normalizedAnswer = answer.toLowerCase().replace(/[.,!?]/g, '').trim();
     const normalizedCorrect = question.correctAnswer.toLowerCase().replace(/[.,!?]/g, '').trim();
     onAnswer(answer, normalizedAnswer === normalizedCorrect);
   };
   
   const userAnswer = selectedWords.join(' ');
   const isCorrect = userAnswer.toLowerCase().replace(/[.,!?]/g, '').trim() === 
                     question.correctAnswer.toLowerCase().replace(/[.,!?]/g, '').trim();
   
   return (
     <div className="animate-slide-up">
       {/* Question */}
       <div className="text-center mb-8">
         <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
           {question.prompt}
         </h2>
         <p className="text-muted-foreground">
           Tap words to arrange them in the correct order
         </p>
       </div>
       
       {/* Answer area */}
       <div className={cn(
         'min-h-[100px] p-4 rounded-xl border-2 border-dashed mb-6 flex flex-wrap gap-2 items-start content-start transition-all',
         selectedWords.length === 0 && 'border-muted-foreground/30',
         selectedWords.length > 0 && !showResult && 'border-primary bg-primary/5',
         showResult && isCorrect && 'border-success bg-success/10',
         showResult && !isCorrect && 'border-destructive bg-destructive/10'
       )}>
         {selectedWords.length === 0 ? (
           <span className="text-muted-foreground text-sm m-auto">
             Your sentence will appear here...
           </span>
         ) : (
           selectedWords.map((word, index) => (
             <button
               key={`selected-${index}`}
               onClick={() => handleWordClick(word, true)}
               disabled={showResult}
               className={cn(
                 'px-4 py-2 rounded-lg font-medium transition-all animate-scale-bounce',
                 !showResult && 'bg-primary text-primary-foreground hover:bg-primary/90',
                 showResult && isCorrect && 'bg-success text-success-foreground',
                 showResult && !isCorrect && 'bg-destructive text-destructive-foreground'
               )}
             >
               {word}
             </button>
           ))
         )}
         
         {showResult && (
           <div className="ml-auto">
             {isCorrect ? (
               <CheckCircle2 className="h-6 w-6 text-success" />
             ) : (
               <XCircle className="h-6 w-6 text-destructive" />
             )}
           </div>
         )}
       </div>
       
       {/* Available words */}
       <div className="flex flex-wrap gap-2 justify-center mb-8">
         {availableWords.map((word, index) => (
           <button
             key={`available-${index}`}
             onClick={() => handleWordClick(word, false)}
             disabled={showResult}
             className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 font-medium transition-all hover:scale-105 active:scale-95"
           >
             {word}
           </button>
         ))}
       </div>
       
       {/* Correct answer (show on wrong) */}
       {showResult && !isCorrect && (
         <div className="p-4 rounded-xl bg-success/10 border border-success/20 mb-6 animate-bounce-in">
           <p className="text-sm text-foreground mb-2">
             <strong>Correct answer:</strong>
           </p>
           <p className="text-lg font-medium text-success">
             {question.correctAnswer}
           </p>
         </div>
       )}
       
       {/* Explanation */}
       {showResult && (
         <div className={cn(
           'p-4 rounded-xl mb-6 animate-bounce-in animate-delay-100',
           isCorrect
             ? 'bg-success/10 border border-success/20'
             : 'bg-muted border border-border'
         )}>
           <p className="text-sm text-foreground">
             <strong>Explanation:</strong> {question.explanation}
           </p>
         </div>
       )}
       
       {/* Buttons */}
       {!showResult && (
         <div className="flex gap-3">
           <Button
             onClick={handleReset}
             variant="outline"
             className="px-6 py-6 rounded-xl"
           >
             <RotateCcw className="h-5 w-5 mr-2" />
             Reset
           </Button>
           <Button
             onClick={handleSubmit}
             disabled={selectedWords.length !== question.words?.length}
             className="flex-1 btn-gradient py-6 text-lg rounded-xl"
           >
             Check Answer
           </Button>
         </div>
       )}
     </div>
   );
 };
 
 export default WordOrderGame;