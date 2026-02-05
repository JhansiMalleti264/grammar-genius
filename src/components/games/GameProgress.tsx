 import { X } from 'lucide-react';
 
 interface GameProgressProps {
   currentQuestion: number;
   totalQuestions: number;
   onClose: () => void;
 }
 
 const GameProgress = ({ currentQuestion, totalQuestions, onClose }: GameProgressProps) => {
   const progress = ((currentQuestion) / totalQuestions) * 100;
   
   return (
     <div className="flex items-center gap-4 mb-8">
       <button 
         onClick={onClose}
         className="p-2 rounded-full hover:bg-muted transition-colors"
       >
         <X className="h-6 w-6 text-muted-foreground" />
       </button>
       
       <div className="flex-1 progress-bar h-3 rounded-full">
         <div 
           className="progress-fill h-full transition-all duration-500 ease-out"
           style={{ width: `${progress}%` }}
         />
       </div>
       
       <span className="text-sm font-medium text-muted-foreground min-w-[4rem] text-right">
         {currentQuestion} / {totalQuestions}
       </span>
     </div>
   );
 };
 
 export default GameProgress;