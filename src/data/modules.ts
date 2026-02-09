import { Module } from '@/types/game';

export const modules: Module[] = [
  // ─── SPEAKING MODULES (3) ─────────────────────────────
  {
    id: 'real-life-conversations',
    title: 'Real-Life Conversations',
    category: 'speaking',
    description: 'Practice daily communication, small talk, and real-world situations',
    levels: [
      { level: 1, title: 'Simple Daily Sentences', exercises: 5, completed: 0 },
      { level: 2, title: 'Situational Conversations', exercises: 7, completed: 0 },
      { level: 3, title: 'Natural Fluent Dialogues', exercises: 10, completed: 0 },
    ],
    gameTypes: ['repeat-sentence', 'answer-by-voice', 'fill-blanks'],
  },
  {
    id: 'opinion-discussion',
    title: 'Opinion & Discussion Skills',
    category: 'speaking',
    description: 'Express opinions, agree/disagree, and build structured arguments',
    levels: [
      { level: 1, title: 'Basic Opinions', exercises: 5, completed: 0 },
      { level: 2, title: 'Opinions with Reasons', exercises: 7, completed: 0 },
      { level: 3, title: 'Structured Arguments', exercises: 10, completed: 0 },
    ],
    gameTypes: ['answer-by-voice', 'multiple-choice', 'transform-sentence'],
  },
  {
    id: 'professional-speaking',
    title: 'Professional Speaking',
    category: 'speaking',
    description: 'Master interviews, presentations, and workplace communication',
    levels: [
      { level: 1, title: 'Self-Introduction', exercises: 5, completed: 0 },
      { level: 2, title: 'Interview Answers', exercises: 7, completed: 0 },
      { level: 3, title: 'Presentations & Problem-Solving', exercises: 10, completed: 0 },
    ],
    gameTypes: ['repeat-sentence', 'answer-by-voice', 'pronunciation-match'],
  },

  // ─── WRITING MODULES (3) ─────────────────────────────
  {
    id: 'sentence-building',
    title: 'Sentence Building Mastery',
    category: 'writing',
    description: 'Build grammar accuracy, correct sentence structure, and clear expression',
    levels: [
      { level: 1, title: 'Basic Sentences', exercises: 5, completed: 0 },
      { level: 2, title: 'Complex Sentences', exercises: 7, completed: 0 },
      { level: 3, title: 'Advanced Natural Writing', exercises: 10, completed: 0 },
    ],
    gameTypes: ['word-order', 'fill-blanks', 'sentence-correction'],
  },
  {
    id: 'practical-writing',
    title: 'Practical Writing',
    category: 'writing',
    description: 'Write messages, notes, short responses, and everyday text',
    levels: [
      { level: 1, title: 'Simple Messages', exercises: 5, completed: 0 },
      { level: 2, title: 'Structured Responses', exercises: 7, completed: 0 },
      { level: 3, title: 'Detailed Explanations', exercises: 10, completed: 0 },
    ],
    gameTypes: ['fill-blanks', 'transform-sentence', 'context-clues'],
  },
  {
    id: 'professional-writing',
    title: 'Professional Writing',
    category: 'writing',
    description: 'Emails, applications, reports, and formal communication',
    levels: [
      { level: 1, title: 'Simple Formal Emails', exercises: 5, completed: 0 },
      { level: 2, title: 'Structured Professional Writing', exercises: 7, completed: 0 },
      { level: 3, title: 'Advanced Business Communication', exercises: 10, completed: 0 },
    ],
    gameTypes: ['sentence-correction', 'transform-sentence', 'multiple-choice'],
  },

  // ─── READING MODULES (3) ─────────────────────────────
  {
    id: 'sentence-reading',
    title: 'Sentence & Short Text Reading',
    category: 'reading',
    description: 'Understand short sentences and improve basic comprehension',
    levels: [
      { level: 1, title: 'Simple Sentences', exercises: 5, completed: 0 },
      { level: 2, title: 'Short Paragraphs', exercises: 7, completed: 0 },
      { level: 3, title: 'Complex Passages', exercises: 10, completed: 0 },
    ],
    gameTypes: ['true-false', 'fill-blanks', 'context-clues'],
  },
  {
    id: 'information-reading',
    title: 'Information & Instruction Reading',
    category: 'reading',
    description: 'Read notices, instructions, emails, and task descriptions',
    levels: [
      { level: 1, title: 'Simple Instructions', exercises: 5, completed: 0 },
      { level: 2, title: 'Multi-Step Instructions', exercises: 7, completed: 0 },
      { level: 3, title: 'Complex Workplace Texts', exercises: 10, completed: 0 },
    ],
    gameTypes: ['multiple-choice', 'spot-error', 'match-pairs'],
  },
  {
    id: 'knowledge-reading',
    title: 'Knowledge & Idea Reading',
    category: 'reading',
    description: 'Analyze articles, informational texts, and opinion-based content',
    levels: [
      { level: 1, title: 'Basic Idea Understanding', exercises: 5, completed: 0 },
      { level: 2, title: 'Main Idea + Details', exercises: 7, completed: 0 },
      { level: 3, title: 'Analysis & Inference', exercises: 10, completed: 0 },
    ],
    gameTypes: ['context-clues', 'true-false', 'photo-description'],
  },

  // ─── LISTENING MODULES (3) ────────────────────────────
  {
    id: 'basic-listening',
    title: 'Basic Listening & Responses',
    category: 'listening',
    description: 'Practice with short audio, simple instructions, and basic questions',
    levels: [
      { level: 1, title: 'Single Sentences', exercises: 5, completed: 0 },
      { level: 2, title: 'Short Conversations', exercises: 7, completed: 0 },
      { level: 3, title: 'Multi-Sentence Audio', exercises: 10, completed: 0 },
    ],
    gameTypes: ['listen-choose', 'dictation', 'audio-word-match'],
  },
  {
    id: 'conversation-listening',
    title: 'Conversation Listening',
    category: 'listening',
    description: 'Understand dialogues, discussions, and everyday conversations',
    levels: [
      { level: 1, title: 'Slow Clear Conversations', exercises: 5, completed: 0 },
      { level: 2, title: 'Natural-Speed Conversations', exercises: 7, completed: 0 },
      { level: 3, title: 'Complex Discussions', exercises: 10, completed: 0 },
    ],
    gameTypes: ['listen-choose', 'audio-word-match', 'multiple-choice'],
  },
  {
    id: 'talks-explanations',
    title: 'Talks & Explanations',
    category: 'listening',
    description: 'Follow presentations, explanations, and informational audio',
    levels: [
      { level: 1, title: 'Short Explanations', exercises: 5, completed: 0 },
      { level: 2, title: 'Structured Talks', exercises: 7, completed: 0 },
      { level: 3, title: 'Detailed Presentations', exercises: 10, completed: 0 },
    ],
    gameTypes: ['dictation', 'listen-choose', 'true-false'],
  },
];
