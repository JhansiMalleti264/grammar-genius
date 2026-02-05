 import { useState, useEffect } from 'react';
 import { Question } from '@/types/game';
 import { cn } from '@/lib/utils';
 import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 interface MatchPairsGameProps {
   question: Question;
   onAnswer: (answer: string, isCorrect: boolean) => void;
   showResult: boolean;
 }
 
 const MatchPairsGame = ({ question, onAnswer, showResult }: MatchPairsGameProps) => {
   const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
   const [matches, setMatches] = useState<Map<number, number>>(new Map());
   const [shuffledRight, setShuffledRight] = useState<string[]>([]);
   
   const pairs = question.pairs || [];
   
   useEffect(() => {
     const rightItems = pairs.map(p => p.right);
     setShuffledRight([...rightItems].sort(() => Math.random() - 0.5));
     setMatches(new Map());
     setSelectedLeft(null);
   }, [question]);
   
   const handleLeftClick = (index: number) => {
     if (showResult) return;
     setSelectedLeft(selectedLeft === index ? null : index);
   };
   
   const handleRightClick = (rightIndex: number) => {
     if (showResult || selectedLeft === null) return;
     
     const newMatches = new Map(matches);
     // Remove any existing match for this left item
     newMatches.set(selectedLeft, rightIndex);
     setMatches(newMatches);
     setSelectedLeft(null);
   };
   
   const handleSubmit = () => {
     let correct = 0;
     matches.forEach((rightIdx, leftIdx) => {
       const leftItem = pairs[leftIdx];
       const rightItem = shuffledRight[rightIdx];
       if (leftItem.right === rightItem) correct++;
     });
     
     const isAllCorrect = correct === pairs.length && matches.size === pairs.length;
     onAnswer(`${correct}/${pairs.length}`, isAllCorrect);
   };
   
   const getMatchColor = (leftIndex: number) => {
     const colors = [
       'bg-primary/20 border-primary',
       'bg-secondary/20 border-secondary',
       'bg-accent/20 border-accent',
       'bg-success/20 border-success',
       'bg-warning/20 border-warning',
     ];
     return colors[leftIndex % colors.length];
   };
   
   const isRightMatched = (rightIndex: number) => {
     return Array.from(matches.values()).includes(rightIndex);
   };
   
   const getMatchedLeftForRight = (rightIndex: number) => {
     for (const [left, right] of matches.entries()) {
       if (right === rightIndex) return left;
     }
     return null;
   };
   
   return (
     <div className="animate-slide-up">
       <div className="text-center mb-8">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
           <Sparkles className="h-4 w-4" />
           <span className="text-sm font-medium">Match the Pairs</span>
         </div>
         <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
           {question.prompt}
         </h2>
         <p className="text-muted-foreground">
           Click a word on the left, then match it with the right
         </p>
       </div>
       
       <div className="grid grid-cols-2 gap-6 mb-8">
         {/* Left column */}
         <div className="space-y-3">
           {pairs.map((pair, index) => {
             const isMatched = matches.has(index);
             const matchColor = isMatched ? getMatchColor(index) : '';
             
             return (
               <button
                 key={`left-${index}`}
                 onClick={() => handleLeftClick(index)}
                 disabled={showResult}
                 className={cn(
                   'w-full p-4 rounded-xl border-2 text-left transition-all duration-300 animate-slide-up',
                   'hover:shadow-lg transform hover:-translate-y-0.5',
                   selectedLeft === index && 'ring-2 ring-primary ring-offset-2 scale-105',
                   isMatched && matchColor,
                   !isMatched && !showResult && 'border-border bg-card hover:border-primary',
                   showResult && 'pointer-events-none'
                 )}
                 style={{ animationDelay: `${index * 100}ms` }}
               >
                 <span className="font-medium">{pair.left}</span>
               </button>
             );
           })}
         </div>
         
         {/* Right column */}
         <div className="space-y-3">
           {shuffledRight.map((item, index) => {
             const isMatched = isRightMatched(index);
             const matchedLeft = getMatchedLeftForRight(index);
             const matchColor = matchedLeft !== null ? getMatchColor(matchedLeft) : '';
             
             // Check if correct in result mode
             let isCorrectMatch = false;
             if (showResult && matchedLeft !== null) {
               isCorrectMatch = pairs[matchedLeft].right === item;
             }
             
             return (
               <button
                 key={`right-${index}`}
                 onClick={() => handleRightClick(index)}
                 disabled={showResult || selectedLeft === null}
                 className={cn(
                   'w-full p-4 rounded-xl border-2 text-left transition-all duration-300 animate-slide-up',
                   'hover:shadow-lg transform hover:-translate-y-0.5',
                   isMatched && matchColor,
                   !isMatched && !showResult && 'border-border bg-card',
                   selectedLeft !== null && !isMatched && 'hover:border-secondary hover:bg-secondary/5',
                   showResult && isCorrectMatch && 'border-success bg-success/10',
                   showResult && !isCorrectMatch && matchedLeft !== null && 'border-destructive bg-destructive/10'
                 )}
                 style={{ animationDelay: `${index * 100 + 50}ms` }}
               >
                 <div className="flex items-center justify-between">
                   <span className="font-medium">{item}</span>
                   {showResult && matchedLeft !== null && (
                     isCorrectMatch ? (
                       <CheckCircle2 className="h-5 w-5 text-success" />
                     ) : (
                       <XCircle className="h-5 w-5 text-destructive" />
                     )
                   )}
                 </div>
               </button>
             );
           })}
         </div>
       </div>
       
       {showResult && (
         <div className="p-4 rounded-xl bg-muted/50 border border-border mb-6 animate-bounce-in">
           <p className="text-sm text-foreground">
             <strong>Explanation:</strong> {question.explanation}
           </p>
         </div>
       )}
       
       {!showResult && (
         <Button
           onClick={handleSubmit}
           disabled={matches.size !== pairs.length}
           className="w-full btn-gradient py-6 text-lg rounded-xl"
         >
           Check Matches
         </Button>
       )}
     </div>
   );
 };
 
 export default MatchPairsGame;