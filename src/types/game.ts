 export type Category = 'all' | 'reading' | 'writing' | 'speaking' | 'listening';
 
 export interface Module {
   id: string;
   title: string;
   category: Exclude<Category, 'all'>;
   description: string;
   duration: number;
   progress: number;
   icon: string;
   gameType: GameType;
 }
 
 export type GameType = 'fill-blanks' | 'sentence-correction' | 'word-order' | 'listening-fill' | 'speaking-practice';
 
 export interface Question {
   id: string;
   type: GameType;
   prompt: string;
   options?: string[];
   correctAnswer: string;
   explanation: string;
   sentence?: string;
   words?: string[];
 }
 
 export interface GameResult {
   totalQuestions: number;
   correctAnswers: number;
   answers: {
     questionId: string;
     userAnswer: string;
     isCorrect: boolean;
     correctAnswer: string;
     explanation: string;
   }[];
   timeTaken: number;
 }
 
 export interface AIFeedback {
   overallScore: number;
   strengths: string[];
   improvements: string[];
   tips: string[];
 }