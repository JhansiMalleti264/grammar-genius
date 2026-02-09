import { useState, useEffect } from 'react';
import { Module, Level, Question, GameResult, levelLabels } from '@/types/game';
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
import ListenChooseGame from './games/ListenChooseGame';
import AudioWordMatchGame from './games/AudioWordMatchGame';
import RepeatSentenceGame from './games/RepeatSentenceGame';
import AnswerByVoiceGame from './games/AnswerByVoiceGame';
import ResultsPage from './games/ResultsPage';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface GameContainerProps {
  module: Module;
  level: Level;
  onClose: () => void;
}

const GameContainer = ({ module, level, onClose }: GameContainerProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<GameResult['answers']>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    // Gather questions from all game types for this module
    const allQuestions: Question[] = [];
    for (const gameType of module.gameTypes) {
      allQuestions.push(...getQuestionsForGame(gameType));
    }
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const exerciseCount = module.levels.find(l => l.level === level)?.exercises ?? 5;
    setQuestions(shuffled.slice(0, Math.min(exerciseCount, shuffled.length)));
  }, [module, level]);

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
    const allQuestions: Question[] = [];
    for (const gameType of module.gameTypes) {
      allQuestions.push(...getQuestionsForGame(gameType));
    }
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const exerciseCount = module.levels.find(l => l.level === level)?.exercises ?? 5;
    setQuestions(shuffled.slice(0, Math.min(exerciseCount, shuffled.length)));
    setCurrentIndex(0);
    setShowResult(false);
    setAnswers([]);
    setIsComplete(false);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading exercises...</div>
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
        levelLabel={levelLabels[level]}
      />
    );
  }

  const renderGame = () => {
    const gameProps = {
      key: currentQuestion.id,
      question: currentQuestion,
      onAnswer: handleAnswer,
      showResult,
    };

    switch (currentQuestion.type) {
      case 'fill-blanks': return <FillBlanksGame {...gameProps} />;
      case 'sentence-correction': return <SentenceCorrectionGame {...gameProps} />;
      case 'word-order': return <WordOrderGame {...gameProps} />;
      case 'match-pairs': return <MatchPairsGame {...gameProps} />;
      case 'multiple-choice': return <MultipleChoiceGame {...gameProps} />;
      case 'spot-error': return <SpotErrorGame {...gameProps} />;
      case 'transform-sentence': return <TransformSentenceGame {...gameProps} />;
      case 'context-clues': return <ContextCluesGame {...gameProps} />;
      case 'dictation': return <DictationGame {...gameProps} />;
      case 'pronunciation-match': return <PronunciationMatchGame {...gameProps} />;
      case 'photo-description': return <PhotoDescriptionGame {...gameProps} />;
      case 'true-false': return <TrueFalseGame {...gameProps} />;
      case 'listen-choose': return <ListenChooseGame {...gameProps} />;
      case 'audio-word-match': return <AudioWordMatchGame {...gameProps} />;
      case 'repeat-sentence': return <RepeatSentenceGame {...gameProps} />;
      case 'answer-by-voice': return <AnswerByVoiceGame {...gameProps} />;
      default: return <FillBlanksGame {...gameProps} />;
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
