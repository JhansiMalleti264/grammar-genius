 import { useState, useEffect } from 'react';
 import { Question } from '@/types/game';
 import { cn } from '@/lib/utils';
 import { CheckCircle2, XCircle, Volume2, VolumeX, Keyboard } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 
 interface DictationGameProps {
   question: Question;
   onAnswer: (answer: string, isCorrect: boolean) => void;
   showResult: boolean;
 }
 
 const DictationGame = ({ question, onAnswer, showResult }: DictationGameProps) => {
   const [userInput, setUserInput] = useState('');
   const [isPlaying, setIsPlaying] = useState(false);
   const [playCount, setPlayCount] = useState(0);
   
   const audioText = question.audioText || question.correctAnswer;
   
   const playAudio = () => {
     if ('speechSynthesis' in window && !isPlaying) {
       setIsPlaying(true);
       const utterance = new SpeechSynthesisUtterance(audioText);
       utterance.rate = playCount === 0 ? 0.8 : 0.6; // Slower on replay
       utterance.onend = () => {
         setIsPlaying(false);
         setPlayCount(prev => prev + 1);
       };
       speechSynthesis.speak(utterance);
     }
   };
   
   useEffect(() => {
     // Auto-play on mount
     const timer = setTimeout(() => playAudio(), 500);
     return () => {
       clearTimeout(timer);
       speechSynthesis.cancel();
     };
   }, [question]);
   
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
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-listening/10 text-listening mb-4">
           <Keyboard className="h-4 w-4" />
           <span className="text-sm font-medium">Listen & Type</span>
         </div>
         <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
           {question.prompt}
         </h2>
         <p className="text-muted-foreground">
           Listen carefully and type what you hear
         </p>
       </div>
       
       {/* Audio player button */}
       <div className="flex justify-center mb-8">
         <button
           onClick={playAudio}
           disabled={isPlaying || showResult}
           className={cn(
             'relative w-32 h-32 rounded-full transition-all duration-300',
             'flex items-center justify-center',
             isPlaying ? 'bg-listening/20' : 'bg-gradient-primary hover:scale-110',
             'shadow-xl'
           )}
         >
           {/* Ripple animation when playing */}
           {isPlaying && (
             <>
               <span className="absolute inset-0 rounded-full bg-listening/30 animate-ping" />
               <span className="absolute inset-2 rounded-full bg-listening/20 animate-ping animate-delay-200" />
             </>
           )}
           
           {isPlaying ? (
             <Volume2 className="h-12 w-12 text-listening animate-pulse relative z-10" />
           ) : (
             <Volume2 className="h-12 w-12 text-primary-foreground relative z-10" />
           )}
         </button>
       </div>
       
       {/* Play count indicator */}
       <div className="text-center text-sm text-muted-foreground mb-4">
         {playCount === 0 ? (
           'Click to play audio'
         ) : (
           `Played ${playCount} time${playCount > 1 ? 's' : ''} • Click to replay slower`
         )}
       </div>
       
       {/* User input */}
       <div className="mb-8">
         <Input
           value={userInput}
           onChange={(e) => setUserInput(e.target.value)}
           placeholder="Type what you hear..."
           disabled={showResult}
           className={cn(
             'text-lg py-6 rounded-xl text-center transition-all',
             showResult && isCorrect && 'border-success bg-success/10',
             showResult && !isCorrect && 'border-destructive bg-destructive/10'
           )}
           onKeyDown={(e) => e.key === 'Enter' && userInput.trim() && handleSubmit()}
         />
       </div>
       
       {/* Result */}
       {showResult && (
         <div className="space-y-4 mb-6 animate-bounce-in">
           {isCorrect ? (
             <div className="flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/30">
               <CheckCircle2 className="h-6 w-6 text-success" />
               <p className="text-success font-medium">Perfect! You heard it correctly.</p>
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
           Check Answer
         </Button>
       )}
     </div>
   );
 };
 
 export default DictationGame;