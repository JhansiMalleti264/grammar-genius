 import { useState, useEffect } from 'react';
 import { Module, Question, GameResult } from '@/types/game';
 import { getQuestionsForGame } from '@/data/questions';
 import GameProgress from './games/GameProgress';
 import FillBlanksGame from './games/FillBlanksGame';
 import SentenceCorrectionGame from './games/SentenceCorrectionGame';
 import WordOrderGame from './games/WordOrderGame';
import MatchPairsGame from './games/MatchPairsGame';
import MultipleChoiceGame from './games/MultipleChoiceGame';
import SpotErrorGame from './games/SpotErrorGame';
import TransformSentenceGame from './games/TransformSentenceGame';
import ContextCluesGame from './games/ContextCluesGame';
import DictationGame from './games/DictationGame';
import PronunciationMatchGame from './games/PronunciationMatchGame';
import PhotoDescriptionGame from './games/PhotoDescriptionGame';
import TrueFalseGame from './games/TrueFalseGame';
 import ResultsPage from './games/ResultsPage';
 import { Button } from '@/components/ui/button';
 import { ArrowRight } from 'lucide-react';
 
 interface GameContainerProps {
   module: Module;
   onClose: () => void;
 }
 
 const GameContainer = ({ module, onClose }: GameContainerProps) => {
   const [questions, setQuestions] = useState<Question[]>([]);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [showResult, setShowResult] = useState(false);
   const [answers, setAnswers] = useState<GameResult['answers']>([]);
   const [isComplete, setIsComplete] = useState(false);
   const [startTime] = useState(Date.now());
   
   useEffect(() => {
     const allQuestions = getQuestionsForGame(module.gameType);
     // Take 3-5 random questions
     const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
     setQuestions(shuffled.slice(0, Math.min(5, shuffled.length)));
   }, [module.gameType]);
   
   const currentQuestion = questions[currentIndex];
   
   const handleAnswer = (userAnswer: string, isCorrect: boolean) => {
     setShowResult(true);
     setAnswers(prev => [...prev, {
       questionId: currentQuestion.id,
       userAnswer,
       isCorrect,
       correctAnswer: currentQuestion.correctAnswer,
       explanation: currentQuestion.explanation,
     }]);
   };
   
   const handleNext = () => {
     if (currentIndex < questions.length - 1) {
       setCurrentIndex(prev => prev + 1);
       setShowResult(false);
     } else {
       setIsComplete(true);
     }
   };
   
   const handleRetry = () => {
     const allQuestions = getQuestionsForGame(module.gameType);
     const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
     setQuestions(shuffled.slice(0, Math.min(5, shuffled.length)));
     setCurrentIndex(0);
     setShowResult(false);
     setAnswers([]);
     setIsComplete(false);
   };
   
   if (questions.length === 0) {
     return (
       <div className="min-h-screen bg-background flex items-center justify-center">
         <div className="animate-pulse text-muted-foreground">Loading...</div>
       </div>
     );
   }
   
   if (isComplete) {
     const result: GameResult = {
       totalQuestions: questions.length,
       correctAnswers: answers.filter(a => a.isCorrect).length,
       answers,
       timeTaken: Math.floor((Date.now() - startTime) / 1000),
     };
     
     return (
       <ResultsPage
         result={result}
         onRetry={handleRetry}
         onHome={onClose}
         moduleTitle={module.title}
       />
     );
   }
   
   const renderGame = () => {
     switch (currentQuestion.type) {
       case 'fill-blanks':
         return (
           <FillBlanksGame
             key={currentQuestion.id}
             question={currentQuestion}
             onAnswer={handleAnswer}
             showResult={showResult}
           />
         );
       case 'sentence-correction':
         return (
           <SentenceCorrectionGame
             key={currentQuestion.id}
             question={currentQuestion}
             onAnswer={handleAnswer}
             showResult={showResult}
           />
         );
       case 'word-order':
         return (
           <WordOrderGame
             key={currentQuestion.id}
             question={currentQuestion}
             onAnswer={handleAnswer}
             showResult={showResult}
           />
         );
      case 'match-pairs':
        return (
          <MatchPairsGame
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswer}
            showResult={showResult}
          />
        );
      case 'multiple-choice':
        return (
          <MultipleChoiceGame
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswer}
            showResult={showResult}
          />
        );
      case 'spot-error':
        return (
          <SpotErrorGame
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswer}
            showResult={showResult}
          />
        );
      case 'transform-sentence':
        return (
          <TransformSentenceGame
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswer}
            showResult={showResult}
          />
        );
      case 'context-clues':
        return (
          <ContextCluesGame
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswer}
            showResult={showResult}
          />
        );
      case 'dictation':
        return (
          <DictationGame
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswer}
            showResult={showResult}
          />
        );
      case 'pronunciation-match':
        return (
          <PronunciationMatchGame
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswer}
            showResult={showResult}
          />
        );
      case 'photo-description':
        return (
          <PhotoDescriptionGame
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswer}
            showResult={showResult}
          />
        );
      case 'true-false':
        return (
          <TrueFalseGame
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswer}
            showResult={showResult}
          />
        );
       default:
         return (
           <FillBlanksGame
             key={currentQuestion.id}
             question={currentQuestion}
             onAnswer={handleAnswer}
             showResult={showResult}
           />
         );
     }
   };
   
   return (
     <div className="min-h-screen bg-background p-4 md:p-8">
       <div className="max-w-2xl mx-auto">
         <GameProgress
           currentQuestion={currentIndex + 1}
           totalQuestions={questions.length}
           onClose={onClose}
         />
         
         {renderGame()}
         
         {showResult && (
           <Button
             onClick={handleNext}
             className="w-full btn-gradient py-6 text-lg rounded-xl mt-6 animate-bounce-in"
           >
             {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
             <ArrowRight className="ml-2 h-5 w-5" />
           </Button>
         )}
       </div>
     </div>
   );
 };
 
 export default GameContainer;