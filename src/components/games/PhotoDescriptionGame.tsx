 import { useState } from 'react';
 import { Question } from '@/types/game';
 import { cn } from '@/lib/utils';
 import { CheckCircle2, XCircle, Image, Eye } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 interface PhotoDescriptionGameProps {
   question: Question;
   onAnswer: (answer: string, isCorrect: boolean) => void;
   showResult: boolean;
 }
 
 // Using emoji-based scenes for visual representation
 const sceneEmojis: Record<string, string> = {
   beach: '🏖️ 🌊 ☀️ 🐚 🏄',
   city: '🏙️ 🚗 🚶 🏢 🌆',
   forest: '🌲 🦌 🌿 🍂 🐿️',
   kitchen: '👨‍🍳 🍳 🥘 🍽️ 🧑‍🍳',
   office: '💼 💻 📊 ☕ 📝',
   park: '🌳 🧒 🐕 🌸 🎈',
   classroom: '📚 ✏️ 🎒 👩‍🏫 📖',
   restaurant: '🍽️ 🍷 👨‍🍳 🥗 🍝',
 };
 
 const PhotoDescriptionGame = ({ question, onAnswer, showResult }: PhotoDescriptionGameProps) => {
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
   
   const sceneKey = question.imageUrl || 'park';
   const sceneDisplay = sceneEmojis[sceneKey] || sceneEmojis.park;
   
   return (
     <div className="animate-slide-up">
       <div className="text-center mb-8">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-writing/10 text-writing mb-4">
           <Image className="h-4 w-4" />
           <span className="text-sm font-medium">Describe the Scene</span>
         </div>
         <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
           {question.prompt}
         </h2>
       </div>
       
       {/* Scene display */}
       <div className="glass-card p-8 mb-8 text-center">
         <div className="flex items-center justify-center gap-2 mb-3">
           <Eye className="h-5 w-5 text-muted-foreground" />
           <span className="text-sm font-medium text-muted-foreground">Look at the scene:</span>
         </div>
         <div className="text-6xl tracking-widest py-6 animate-float">
           {sceneDisplay}
         </div>
         <p className="text-sm text-muted-foreground mt-2 capitalize">
           Scene: {sceneKey}
         </p>
       </div>
       
       {/* Options */}
       <div className="space-y-3 mb-8">
         {question.options?.map((option, index) => {
           const isSelected = selectedAnswer === option;
           const isCorrect = option === question.correctAnswer;
           
           return (
             <button
               key={option}
               onClick={() => handleSelect(option)}
               disabled={showResult}
               className={cn(
                 'w-full p-4 rounded-xl border-2 text-left transition-all duration-300 animate-slide-up',
                 'hover:shadow-lg transform hover:-translate-y-0.5',
                 !showResult && !isSelected && 'border-border bg-card hover:border-writing',
                 !showResult && isSelected && 'border-writing bg-writing/10 shadow-lg',
                 showResult && isCorrect && 'border-success bg-success/10',
                 showResult && isSelected && !isCorrect && 'border-destructive bg-destructive/10'
               )}
               style={{ animationDelay: `${index * 100}ms` }}
             >
               <div className="flex items-center justify-between">
                 <span className="font-medium">{option}</span>
                 {showResult && isCorrect && (
                   <CheckCircle2 className="h-5 w-5 text-success" />
                 )}
                 {showResult && isSelected && !isCorrect && (
                   <XCircle className="h-5 w-5 text-destructive" />
                 )}
               </div>
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
 
 export default PhotoDescriptionGame;