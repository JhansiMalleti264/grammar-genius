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

export type GameType = 
  | 'fill-blanks' 
  | 'sentence-correction' 
  | 'word-order' 
  | 'match-pairs'
  | 'multiple-choice'
  | 'spot-error'
  | 'transform-sentence'
  | 'context-clues'
  | 'dictation'
  | 'pronunciation-match'
  | 'photo-description'
  | 'true-false'
  | 'listen-choose'
  | 'audio-word-match'
  | 'repeat-sentence'
  | 'answer-by-voice';

export interface Question {
  id: string;
  type: GameType;
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  sentence?: string;
  words?: string[];
  pairs?: { left: string; right: string }[];
  imageUrl?: string;
  audioText?: string;
  statement?: string;
  isTrue?: boolean;
  transformRule?: string;
  spokenAnswer?: string;
  voicePrompt?: string;
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
