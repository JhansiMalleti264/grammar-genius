 import { useState } from 'react';
 import { Question } from '@/types/game';
 import { cn } from '@/lib/utils';
 import { CheckCircle2, XCircle, Volume2, Mic } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 interface PronunciationMatchGameProps {
   question: Question;
   onAnswer: (answer: string, isCorrect: boolean) => void;
   showResult: boolean;
 }
 
 const PronunciationMatchGame = ({ question, onAnswer, showResult }: PronunciationMatchGameProps) => {
   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
   const [playingOption, setPlayingOption] = useState<string | null>(null);
   
   const playWord = (word: string) => {
     if ('speechSynthesis' in window) {
       speechSynthesis.cancel();
       setPlayingOption(word);
       const utterance = new SpeechSynthesisUtterance(word);
       utterance.rate = 0.8;
       utterance.onend = () => setPlayingOption(null);
       speechSynthesis.speak(utterance);
     }
   };
   
   const handleSelect = (option: string) => {
     if (showResult) return;
     setSelectedAnswer(option);
     playWord(option);
   };
   
   const handleSubmit = () => {
     if (selectedAnswer) {
       onAnswer(selectedAnswer, selectedAnswer === question.correctAnswer);
     }
   };
   
   return (
     <div className="animate-slide-up">
       <div className="text-center mb-8">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-speaking/10 text-speaking mb-4">
           <Mic className="h-4 w-4" />
           <span className="text-sm font-medium">Pronunciation Match</span>
         </div>
         <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
           {question.prompt}
         </h2>
         <p className="text-muted-foreground">
           Listen and select the word that matches the pronunciation
         </p>
       </div>
       
       {/* Target word to match */}
       <div className="glass-card p-6 mb-8 text-center">
         <p className="text-sm text-muted-foreground mb-2">Find the word that sounds like:</p>
         <div className="flex items-center justify-center gap-3">
           <span className="text-3xl font-bold text-foreground">{question.sentence}</span>
           <button
             onClick={() => playWord(question.sentence || '')}
             className="p-3 rounded-full bg-speaking/10 hover:bg-speaking/20 transition-all hover:scale-110"
           >
             <Volume2 className={cn(
               'h-6 w-6 text-speaking',
               playingOption === question.sentence && 'animate-pulse'
             )} />
           </button>
         </div>
       </div>
       
       {/* Options */}
       <div className="grid grid-cols-2 gap-4 mb-8">
         {question.options?.map((option, index) => {
           const isSelected = selectedAnswer === option;
           const isCorrect = option === question.correctAnswer;
           const isPlaying = playingOption === option;
           
           return (
             <button
               key={option}
               onClick={() => handleSelect(option)}
               disabled={showResult}
               className={cn(
                 'group relative p-6 rounded-2xl border-2 text-center transition-all duration-300 animate-slide-up',
                 'hover:shadow-xl transform hover:scale-105',
                 !showResult && !isSelected && 'border-border bg-card hover:border-speaking',
                 !showResult && isSelected && 'border-speaking bg-speaking/10 scale-105 shadow-lg',
                 showResult && isCorrect && 'border-success bg-success/10',
                 showResult && isSelected && !isCorrect && 'border-destructive bg-destructive/10'
               )}
               style={{ animationDelay: `${index * 100}ms` }}
             >
               <div className="flex flex-col items-center gap-2">
                 <span className={cn(
                   'text-xl font-bold',
                   isPlaying && 'text-speaking'
                 )}>
                   {option}
                 </span>
                 <Volume2 className={cn(
                   'h-5 w-5 text-muted-foreground group-hover:text-speaking transition-colors',
                   isPlaying && 'text-speaking animate-pulse'
                 )} />
               </div>
               
               {showResult && isCorrect && (
                 <CheckCircle2 className="absolute top-2 right-2 h-6 w-6 text-success" />
               )}
               {showResult && isSelected && !isCorrect && (
                 <XCircle className="absolute top-2 right-2 h-6 w-6 text-destructive" />
               )}
             </button>
           );
         })}
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
 
 export default PronunciationMatchGame;