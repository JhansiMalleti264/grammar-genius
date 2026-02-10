import { useState } from 'react';
import { Module, Level, levelLabels, GameResult } from '@/types/game';
import { getQuestionsForGame } from '@/data/questions';
import { getListeningQuestions } from '@/data/listeningQuestions';
import { getReadingQuestions } from '@/data/readingQuestions';
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
import ListeningGameEngine from './games/ListeningGameEngine';
import ReadingGameEngine from './games/ReadingGameEngine';
import ResultsPage from './games/ResultsPage';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Question } from '@/types/game';

interface GameContainerProps {
  module: Module;
  level: Level;
  onClose: () => void;
}

const listeningModuleIds = ['basic-listening', 'conversation-listening', 'talks-explanations'];
const readingModuleIds = ['sentence-reading', 'information-reading', 'knowledge-reading'];

const GameContainer = ({ module, level, onClose }: GameContainerProps) => {
  const [isComplete, setIsComplete] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [startTime] = useState(Date.now());

  // ── Listening modules → dedicated engine ──
  if (listeningModuleIds.includes(module.id)) {
    const listeningQs = getListeningQuestions(module.id, level);

    if (isComplete && gameResult) {
      return (
        <ResultsPage
          result={gameResult}
          onRetry={() => { setIsComplete(false); setGameResult(null); }}
          onHome={onClose}
          moduleTitle={module.title}
          levelLabel={levelLabels[level]}
        />
      );
    }

    return (
      <ListeningGameEngine
        questions={listeningQs}
        onClose={onClose}
        onComplete={(results) => {
          const gr: GameResult = {
            totalQuestions: results.length,
            correctAnswers: results.filter(r => r.isCorrect).length,
            answers: results.map(r => ({
              questionId: r.questionId,
              userAnswer: r.userAnswer,
              isCorrect: r.isCorrect,
              correctAnswer: r.correctAnswer,
              explanation: r.explanation,
            })),
            timeTaken: Math.floor((Date.now() - startTime) / 1000),
          };
          setGameResult(gr);
          setIsComplete(true);
        }}
      />
    );
  }

  // ── Reading modules → dedicated engine ──
  if (readingModuleIds.includes(module.id)) {
    const readingQs = getReadingQuestions(module.id, level);

    if (isComplete && gameResult) {
      return (
        <ResultsPage
          result={gameResult}
          onRetry={() => { setIsComplete(false); setGameResult(null); }}
          onHome={onClose}
          moduleTitle={module.title}
          levelLabel={levelLabels[level]}
        />
      );
    }

    return (
      <ReadingGameEngine
        questions={readingQs}
        onClose={onClose}
        onComplete={(results) => {
          const gr: GameResult = {
            totalQuestions: results.length,
            correctAnswers: results.filter(r => r.isCorrect).length,
            answers: results.map(r => ({
              questionId: r.questionId,
              userAnswer: r.userAnswer,
              isCorrect: r.isCorrect,
              correctAnswer: r.correctAnswer,
              explanation: r.explanation,
            })),
            timeTaken: Math.floor((Date.now() - startTime) / 1000),
          };
          setGameResult(gr);
          setIsComplete(true);
        }}
      />
    );
  }

  // ── Speaking / Writing modules → existing game system ──
  return <LegacyGameFlow module={module} level={level} onClose={onClose} />;
};

/** Existing game flow for speaking/writing modules */
const LegacyGameFlow = ({ module, level, onClose }: GameContainerProps) => {
  const [questions, setQuestions] = useState<Question[]>(() => {
    const allQuestions: Question[] = [];
    for (const gameType of module.gameTypes) {
      allQuestions.push(...getQuestionsForGame(gameType));
    }
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const exerciseCount = module.levels.find(l => l.level === level)?.exercises ?? 5;
    return shuffled.slice(0, Math.min(exerciseCount, shuffled.length));
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<GameResult['answers']>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());

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
    const sharedProps = {
      question: currentQuestion,
      onAnswer: handleAnswer,
      showResult,
    };

    switch (currentQuestion.type) {
      case 'fill-blanks': return <FillBlanksGame key={currentQuestion.id} {...sharedProps} />;
      case 'sentence-correction': return <SentenceCorrectionGame key={currentQuestion.id} {...sharedProps} />;
      case 'word-order': return <WordOrderGame key={currentQuestion.id} {...sharedProps} />;
      case 'match-pairs': return <MatchPairsGame key={currentQuestion.id} {...sharedProps} />;
      case 'multiple-choice': return <MultipleChoiceGame key={currentQuestion.id} {...sharedProps} />;
      case 'spot-error': return <SpotErrorGame key={currentQuestion.id} {...sharedProps} />;
      case 'transform-sentence': return <TransformSentenceGame key={currentQuestion.id} {...sharedProps} />;
      case 'context-clues': return <ContextCluesGame key={currentQuestion.id} {...sharedProps} />;
      case 'dictation': return <DictationGame key={currentQuestion.id} {...sharedProps} />;
      case 'pronunciation-match': return <PronunciationMatchGame key={currentQuestion.id} {...sharedProps} />;
      case 'photo-description': return <PhotoDescriptionGame key={currentQuestion.id} {...sharedProps} />;
      case 'true-false': return <TrueFalseGame key={currentQuestion.id} {...sharedProps} />;
      default: return <MultipleChoiceGame key={currentQuestion.id} {...sharedProps} />;
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
