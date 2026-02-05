 import { useState } from 'react';
 import { Question } from '@/types/game';
 import { cn } from '@/lib/utils';
 import { CheckCircle2, XCircle, RefreshCw, ArrowRight } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 
 interface TransformSentenceGameProps {
   question: Question;
   onAnswer: (answer: string, isCorrect: boolean) => void;
   showResult: boolean;
 }
 
 const TransformSentenceGame = ({ question, onAnswer, showResult }: TransformSentenceGameProps) => {
   const [userInput, setUserInput] = useState('');
   
   const handleSubmit = () => {
     const normalizedInput = userInput.toLowerCase().trim().replace(/[.,!?]/g, '');
     const normalizedCorrect = question.correctAnswer.toLowerCase().trim().replace(/[.,!?]/g, '');
     onAnswer(userInput, normalizedInput === normalizedCorrect);
   };
   
   const isCorrect = userInput.toLowerCase().trim().replace(/[.,!?]/g, '') === 
                     question.correctAnswer.toLowerCase().trim().replace(/[.,!?]/g, '');
   
   return (
     <div className="animate-slide-up">
       <div className="text-center mb-8">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
           <RefreshCw className="h-4 w-4" />
           <span className="text-sm font-medium">Transform the Sentence</span>
         </div>
         <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
           {question.prompt}
         </h2>
       </div>
       
       {/* Transformation rule */}
       {question.transformRule && (
         <div className="glass-card p-4 mb-6 text-center">
           <span className="text-sm font-medium text-muted-foreground">Rule: </span>
           <span className="text-sm font-bold text-primary">{question.transformRule}</span>
         </div>
       )}
       
       {/* Original sentence */}
       <div className="glass-card p-6 mb-6">
         <div className="text-sm font-medium text-muted-foreground mb-2">Original:</div>
         <p className="text-xl font-medium text-foreground">
           "{question.sentence}"
         </p>
       </div>
       
       {/* Arrow */}
       <div className="flex justify-center my-4">
         <div className="p-3 rounded-full bg-gradient-primary animate-float">
           <ArrowRight className="h-6 w-6 text-primary-foreground rotate-90" />
         </div>
       </div>
       
       {/* User input */}
       <div className="mb-8">
         <div className="text-sm font-medium text-muted-foreground mb-2">Your transformed sentence:</div>
         <Input
           value={userInput}
           onChange={(e) => setUserInput(e.target.value)}
           placeholder="Type your answer here..."
           disabled={showResult}
           className={cn(
             'text-lg py-6 rounded-xl transition-all',
             showResult && isCorrect && 'border-success bg-success/10',
             showResult && !isCorrect && 'border-destructive bg-destructive/10'
           )}
         />
       </div>
       
       {/* Result */}
       {showResult && (
         <div className="space-y-4 mb-6 animate-bounce-in">
           {isCorrect ? (
             <div className="flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/30">
               <CheckCircle2 className="h-6 w-6 text-success" />
               <p className="text-success font-medium">Perfect transformation!</p>
             </div>
           ) : (
             <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30">
               <div className="flex items-center gap-3 mb-2">
                 <XCircle className="h-6 w-6 text-destructive" />
                 <p className="text-destructive font-medium">Not quite right</p>
               </div>
               <p className="text-sm text-foreground">
                 Correct answer: <strong className="text-success">"{question.correctAnswer}"</strong>
               </p>
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
           disabled={!userInput.trim()}
           className="w-full btn-gradient py-6 text-lg rounded-xl"
         >
           Check Transformation
         </Button>
       )}
     </div>
   );
 };
 
 export default TransformSentenceGame;