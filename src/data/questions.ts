import { Question } from '@/types/game';

// ─── FILL IN THE BLANKS ──────────────────────────────
export const fillBlanksQuestions: Question[] = [
  {
    id: 'fb-1',
    type: 'fill-blanks',
    prompt: 'The manager ___ the new policy during the meeting.',
    options: ['announce', 'announced', 'announcing', 'announces'],
    correctAnswer: 'announced',
    explanation: 'Past tense "announced" is needed since the meeting already happened.',
  },
  {
    id: 'fb-2',
    type: 'fill-blanks',
    prompt: 'If I ___ earlier, I would have caught the train.',
    options: ['leave', 'left', 'had left', 'would leave'],
    correctAnswer: 'had left',
    explanation: 'Third conditional uses "had + past participle" for unreal past situations.',
  },
  {
    id: 'fb-3',
    type: 'fill-blanks',
    prompt: 'Neither the manager nor the employees ___ satisfied with the outcome.',
    options: ['is', 'are', 'was', 'were'],
    correctAnswer: 'were',
    explanation: 'With "neither...nor," the verb agrees with the nearest subject (employees → plural).',
  },
  {
    id: 'fb-4',
    type: 'fill-blanks',
    prompt: 'By next quarter, we ___ the entire system.',
    options: ['upgrade', 'upgraded', 'will have upgraded', 'upgrading'],
    correctAnswer: 'will have upgraded',
    explanation: 'Future perfect tense for actions completed before a specific future time.',
  },
  {
    id: 'fb-5',
    type: 'fill-blanks',
    prompt: 'The company\'s revenue ___ increased by 20% this year.',
    options: ['have', 'has', 'is', 'are'],
    correctAnswer: 'has',
    explanation: '"Revenue" is singular and takes "has" in present perfect tense.',
  },
  {
    id: 'fb-6',
    type: 'fill-blanks',
    prompt: 'She ___ working on this project since January.',
    options: ['is', 'was', 'has been', 'had been'],
    correctAnswer: 'has been',
    explanation: 'Present perfect continuous "has been" for actions starting in the past and continuing.',
  },
  {
    id: 'fb-7',
    type: 'fill-blanks',
    prompt: 'The deadline was moved, so we ___ submit the report by Friday.',
    options: ['must', 'should', 'might', 'could'],
    correctAnswer: 'must',
    explanation: '"Must" expresses obligation — the deadline requires action.',
  },
  {
    id: 'fb-8',
    type: 'fill-blanks',
    prompt: 'I would appreciate it if you ___ me the details.',
    options: ['send', 'sent', 'could send', 'will send'],
    correctAnswer: 'could send',
    explanation: 'Polite requests in professional settings use "could" + base verb.',
  },
];

// ─── SENTENCE CORRECTION ──────────────────────────────
export const sentenceCorrectionQuestions: Question[] = [
  {
    id: 'sc-1',
    type: 'sentence-correction',
    prompt: 'Find and fix the error:',
    sentence: 'The team have completed the project ahead of schedule.',
    options: [
      'The team has completed the project ahead of schedule.',
      'The team had completed the project ahead of schedule.',
      'The teams have completed the project ahead of schedule.',
      'No error',
    ],
    correctAnswer: 'The team has completed the project ahead of schedule.',
    explanation: 'Collective nouns like "team" take singular verbs in American English.',
  },
  {
    id: 'sc-2',
    type: 'sentence-correction',
    prompt: 'Find and fix the error:',
    sentence: 'Me and my colleague prepared the presentation.',
    options: [
      'My colleague and I prepared the presentation.',
      'I and my colleague prepared the presentation.',
      'My colleague and me prepared the presentation.',
      'No error',
    ],
    correctAnswer: 'My colleague and I prepared the presentation.',
    explanation: 'Use "I" as a subject. It\'s also polite to mention yourself last.',
  },
  {
    id: 'sc-3',
    type: 'sentence-correction',
    prompt: 'Find and fix the error:',
    sentence: 'The report was wrote by the senior analyst.',
    options: [
      'The report was written by the senior analyst.',
      'The report was writing by the senior analyst.',
      'The report was writen by the senior analyst.',
      'No error',
    ],
    correctAnswer: 'The report was written by the senior analyst.',
    explanation: 'Past participle of "write" is "written," used in passive voice constructions.',
  },
  {
    id: 'sc-4',
    type: 'sentence-correction',
    prompt: 'Find and fix the error:',
    sentence: 'She speaks more better English than her peers.',
    options: [
      'She speaks better English than her peers.',
      'She speaks most better English than her peers.',
      'She speaks more good English than her peers.',
      'No error',
    ],
    correctAnswer: 'She speaks better English than her peers.',
    explanation: '"Better" is already comparative. Don\'t use "more" with it (double comparative).',
  },
  {
    id: 'sc-5',
    type: 'sentence-correction',
    prompt: 'Find and fix the error:',
    sentence: 'Each of the employees need to submit their ID.',
    options: [
      'Each of the employees needs to submit their ID.',
      'Each of the employee needs to submit their ID.',
      'Each of the employees need to submit his ID.',
      'No error',
    ],
    correctAnswer: 'Each of the employees needs to submit their ID.',
    explanation: '"Each" is singular and requires the singular verb "needs."',
  },
];

// ─── WORD ORDER ──────────────────────────────
export const wordOrderQuestions: Question[] = [
  {
    id: 'wo-1',
    type: 'word-order',
    prompt: 'Arrange the words to form a professional sentence:',
    words: ['the', 'submit', 'please', 'by', 'report', 'Friday'],
    correctAnswer: 'Please submit the report by Friday.',
    explanation: 'Polite imperative: "Please" + verb + object + time expression.',
  },
  {
    id: 'wo-2',
    type: 'word-order',
    prompt: 'Arrange the words to form a correct sentence:',
    words: ['have', 'I', 'meeting', 'a', 'scheduled', 'tomorrow'],
    correctAnswer: 'I have scheduled a meeting tomorrow.',
    explanation: 'Subject + auxiliary verb + past participle + object + time.',
  },
  {
    id: 'wo-3',
    type: 'word-order',
    prompt: 'Arrange the words to form a correct question:',
    words: ['could', 'the', 'you', 'forward', 'email', 'please'],
    correctAnswer: 'Could you please forward the email?',
    explanation: 'Polite question: Modal + subject + "please" + verb + object.',
  },
  {
    id: 'wo-4',
    type: 'word-order',
    prompt: 'Arrange the words to form a correct sentence:',
    words: ['always', 'she', 'on', 'arrives', 'time'],
    correctAnswer: 'She always arrives on time.',
    explanation: 'Frequency adverbs go between subject and main verb.',
  },
  {
    id: 'wo-5',
    type: 'word-order',
    prompt: 'Arrange the words to form a correct sentence:',
    words: ['the', 'approved', 'has', 'budget', 'been'],
    correctAnswer: 'The budget has been approved.',
    explanation: 'Passive voice: Subject + has/have + been + past participle.',
  },
];

// ─── MATCH PAIRS ──────────────────────────────
export const matchPairsQuestions: Question[] = [
  {
    id: 'mp-1',
    type: 'match-pairs',
    prompt: 'Match the professional terms with their meanings:',
    pairs: [
      { left: 'Deadline', right: 'Due date' },
      { left: 'Agenda', right: 'Meeting plan' },
      { left: 'Feedback', right: 'Review comments' },
      { left: 'Benchmark', right: 'Standard measure' },
    ],
    correctAnswer: 'all matched',
    explanation: 'Understanding workplace vocabulary is essential for professional communication.',
  },
  {
    id: 'mp-2',
    type: 'match-pairs',
    prompt: 'Match the formal expressions with informal ones:',
    pairs: [
      { left: 'I would appreciate', right: 'I\'d like' },
      { left: 'Please be advised', right: 'Just so you know' },
      { left: 'At your earliest convenience', right: 'As soon as you can' },
      { left: 'I regret to inform', right: 'Unfortunately' },
    ],
    correctAnswer: 'all matched',
    explanation: 'Knowing formal vs. informal register improves professional writing.',
  },
  {
    id: 'mp-3',
    type: 'match-pairs',
    prompt: 'Match the phrasal verbs with their meanings:',
    pairs: [
      { left: 'Look into', right: 'Investigate' },
      { left: 'Carry out', right: 'Execute' },
      { left: 'Come up with', right: 'Create / Invent' },
      { left: 'Put off', right: 'Postpone' },
    ],
    correctAnswer: 'all matched',
    explanation: 'Phrasal verbs are commonly used in workplace English.',
  },
  {
    id: 'mp-4',
    type: 'match-pairs',
    prompt: 'Match the irregular verbs with past tense:',
    pairs: [
      { left: 'Write', right: 'Wrote' },
      { left: 'Lead', right: 'Led' },
      { left: 'Choose', right: 'Chose' },
      { left: 'Build', right: 'Built' },
    ],
    correctAnswer: 'all matched',
    explanation: 'Irregular verbs must be memorized as they don\'t follow the standard -ed pattern.',
  },
  {
    id: 'mp-5',
    type: 'match-pairs',
    prompt: 'Match the email sign-offs with their usage:',
    pairs: [
      { left: 'Best regards', right: 'Professional emails' },
      { left: 'Sincerely', right: 'Formal letters' },
      { left: 'Thanks', right: 'Casual work emails' },
      { left: 'Yours faithfully', right: 'Unknown recipient' },
    ],
    correctAnswer: 'all matched',
    explanation: 'Choosing the right sign-off reflects your understanding of tone and formality.',
  },
];

// ─── MULTIPLE CHOICE ──────────────────────────────
export const multipleChoiceQuestions: Question[] = [
  {
    id: 'mc-1',
    type: 'multiple-choice',
    prompt: 'Which response is most appropriate for a job interview?',
    options: [
      '"Yeah, I\'m pretty good at stuff."',
      '"I have three years of experience in project management and I\'m skilled in team coordination."',
      '"I don\'t really know, but I can try."',
      '"My friend told me to apply here."',
    ],
    correctAnswer: '"I have three years of experience in project management and I\'m skilled in team coordination."',
    explanation: 'Professional interviews require specific, confident answers highlighting relevant experience.',
  },
  {
    id: 'mc-2',
    type: 'multiple-choice',
    prompt: 'Which sentence uses the correct form?',
    options: [
      'The data shows that sales increased.',
      'The data show that sales increased.',
      'The datas shows that sales increased.',
      'The data showing that sales increased.',
    ],
    correctAnswer: 'The data shows that sales increased.',
    explanation: '"Data" can be treated as singular or plural. In modern English, singular is widely accepted.',
  },
  {
    id: 'mc-3',
    type: 'multiple-choice',
    prompt: 'Choose the most professional email opening:',
    options: [
      'Hey, what\'s up?',
      'Dear Mr. Johnson, I hope this email finds you well.',
      'Yo, I need something from you.',
      'Hi there, just checking in real quick.',
    ],
    correctAnswer: 'Dear Mr. Johnson, I hope this email finds you well.',
    explanation: 'Formal emails should use proper salutations and courteous opening phrases.',
  },
  {
    id: 'mc-4',
    type: 'multiple-choice',
    prompt: 'Which word correctly completes: "The project is ___ schedule."',
    options: ['in', 'on', 'at', 'by'],
    correctAnswer: 'on',
    explanation: 'The correct collocation is "on schedule," meaning proceeding as planned.',
  },
  {
    id: 'mc-5',
    type: 'multiple-choice',
    prompt: 'Identify the sentence with correct subject-verb agreement:',
    options: [
      'The list of candidates are ready.',
      'The list of candidates is ready.',
      'The lists of candidates is ready.',
      'The list of candidate are ready.',
    ],
    correctAnswer: 'The list of candidates is ready.',
    explanation: 'The subject is "list" (singular), so the verb must be "is."',
  },
  {
    id: 'mc-6',
    type: 'multiple-choice',
    prompt: 'Which phrase expresses disagreement politely?',
    options: [
      '"That\'s completely wrong."',
      '"I see your point, but I have a different perspective."',
      '"No way, that makes no sense."',
      '"You obviously don\'t understand."',
    ],
    correctAnswer: '"I see your point, but I have a different perspective."',
    explanation: 'Professional disagreement acknowledges the other viewpoint before presenting your own.',
  },
  {
    id: 'mc-7',
    type: 'multiple-choice',
    prompt: 'Choose the correct word: "The committee will ___ a decision tomorrow."',
    options: ['make', 'do', 'take', 'give'],
    correctAnswer: 'make',
    explanation: 'The correct collocation is "make a decision," not "do" or "take."',
  },
  {
    id: 'mc-8',
    type: 'multiple-choice',
    prompt: 'Which is the best way to ask for clarification in a meeting?',
    options: [
      '"What? I don\'t get it."',
      '"Could you please elaborate on that point?"',
      '"Say that again."',
      '"Huh?"',
    ],
    correctAnswer: '"Could you please elaborate on that point?"',
    explanation: 'Polite, formal questions maintain professionalism in workplace discussions.',
  },
];

// ─── SPOT ERROR ──────────────────────────────
export const spotErrorQuestions: Question[] = [
  {
    id: 'se-1',
    type: 'spot-error',
    prompt: 'Find the word with the error:',
    sentence: 'The CEO dont approve the proposal submitted last week.',
    correctAnswer: 'dont',
    explanation: '"Dont" should be "didn\'t" for past tense, or "doesn\'t" for present tense third person.',
  },
  {
    id: 'se-2',
    type: 'spot-error',
    prompt: 'Find the word with the error:',
    sentence: 'All the informations have been verified by the quality team.',
    correctAnswer: 'informations',
    explanation: '"Information" is uncountable — it never takes a plural form.',
  },
  {
    id: 'se-3',
    type: 'spot-error',
    prompt: 'Find the word with the error:',
    sentence: 'He has went to the client meeting this morning.',
    correctAnswer: 'went',
    explanation: 'With "has," use past participle "gone," not simple past "went."',
  },
  {
    id: 'se-4',
    type: 'spot-error',
    prompt: 'Find the word with the error:',
    sentence: 'Their is a new policy regarding remote work.',
    correctAnswer: 'Their',
    explanation: '"Their" (possessive) should be "There" (indicating existence).',
  },
  {
    id: 'se-5',
    type: 'spot-error',
    prompt: 'Find the word with the error:',
    sentence: 'The team are working on the project since last month.',
    correctAnswer: 'are',
    explanation: '"Since" requires present perfect continuous: "has been working" instead of "are working."',
  },
];

// ─── TRANSFORM SENTENCE ──────────────────────────────
export const transformSentenceQuestions: Question[] = [
  {
    id: 'ts-1',
    type: 'transform-sentence',
    prompt: 'Transform to passive voice:',
    sentence: 'The manager approved the budget.',
    transformRule: 'Active → Passive',
    correctAnswer: 'The budget was approved by the manager.',
    explanation: 'In passive voice, the object becomes subject: "was/were + past participle."',
  },
  {
    id: 'ts-2',
    type: 'transform-sentence',
    prompt: 'Make this more formal:',
    sentence: 'Can you send me the file?',
    transformRule: 'Informal → Formal',
    correctAnswer: 'Could you please send me the file?',
    explanation: '"Could you please" is more formal and polite than "Can you."',
  },
  {
    id: 'ts-3',
    type: 'transform-sentence',
    prompt: 'Transform to reported speech:',
    sentence: '"I will finish the report today," she said.',
    transformRule: 'Direct → Reported',
    correctAnswer: 'She said she would finish the report that day.',
    explanation: 'Reported speech changes tense (will → would) and time reference (today → that day).',
  },
  {
    id: 'ts-4',
    type: 'transform-sentence',
    prompt: 'Transform to a question:',
    sentence: 'The deadline has been extended.',
    transformRule: 'Statement → Question',
    correctAnswer: 'Has the deadline been extended?',
    explanation: 'For questions with auxiliary verbs, move the auxiliary before the subject.',
  },
  {
    id: 'ts-5',
    type: 'transform-sentence',
    prompt: 'Transform to negative:',
    sentence: 'The client accepted the proposal.',
    transformRule: 'Positive → Negative',
    correctAnswer: 'The client did not accept the proposal.',
    explanation: 'For past simple negative, use "did not" + base form of the verb.',
  },
];

// ─── CONTEXT CLUES ──────────────────────────────
export const contextCluesQuestions: Question[] = [
  {
    id: 'cc-1',
    type: 'context-clues',
    prompt: 'Choose the word that fits the context:',
    sentence: 'The quarterly results were ___, exceeding all expectations.',
    options: ['disappointing', 'outstanding', 'average', 'questionable'],
    correctAnswer: 'outstanding',
    explanation: '"Exceeding expectations" is positive, so "outstanding" fits best.',
  },
  {
    id: 'cc-2',
    type: 'context-clues',
    prompt: 'Choose the word that fits the context:',
    sentence: 'After the merger, several employees were made ___.',
    options: ['promoted', 'redundant', 'eligible', 'available'],
    correctAnswer: 'redundant',
    explanation: 'Mergers often result in job losses; "made redundant" means losing one\'s position.',
  },
  {
    id: 'cc-3',
    type: 'context-clues',
    prompt: 'Choose the word that fits the context:',
    sentence: 'The negotiation reached an ___ that satisfied both parties.',
    options: ['obstacle', 'agreement', 'argument', 'deadline'],
    correctAnswer: 'agreement',
    explanation: '"Satisfied both parties" indicates a successful conclusion — an "agreement."',
  },
  {
    id: 'cc-4',
    type: 'context-clues',
    prompt: 'Choose the word that fits the context:',
    sentence: 'The intern showed great ___ by completing tasks without being asked.',
    options: ['laziness', 'initiative', 'confusion', 'reluctance'],
    correctAnswer: 'initiative',
    explanation: 'Doing tasks proactively shows "initiative" — self-motivated action.',
  },
  {
    id: 'cc-5',
    type: 'context-clues',
    prompt: 'Choose the word that fits the context:',
    sentence: 'Due to the ___ in supply, the prices have increased significantly.',
    options: ['surplus', 'shortage', 'variety', 'improvement'],
    correctAnswer: 'shortage',
    explanation: 'Rising prices are typically caused by a "shortage" (insufficient supply).',
  },
];

// ─── DICTATION ──────────────────────────────
export const dictationQuestions: Question[] = [
  {
    id: 'dt-1',
    type: 'dictation',
    prompt: 'Listen and type the sentence:',
    audioText: 'Please find attached the revised proposal for your review.',
    correctAnswer: 'Please find attached the revised proposal for your review.',
    explanation: 'This is a standard professional email phrase used when sending documents.',
  },
  {
    id: 'dt-2',
    type: 'dictation',
    prompt: 'Listen and type the sentence:',
    audioText: 'The meeting has been rescheduled to next Monday.',
    correctAnswer: 'The meeting has been rescheduled to next Monday.',
    explanation: '"Rescheduled" means moved to a different time.',
  },
  {
    id: 'dt-3',
    type: 'dictation',
    prompt: 'Listen and type the sentence:',
    audioText: 'We appreciate your prompt response to this matter.',
    correctAnswer: 'We appreciate your prompt response to this matter.',
    explanation: 'A polite phrase acknowledging someone\'s quick reply.',
  },
  {
    id: 'dt-4',
    type: 'dictation',
    prompt: 'Listen and type the sentence:',
    audioText: 'Could you please confirm your availability for the conference call?',
    correctAnswer: 'Could you please confirm your availability for the conference call?',
    explanation: 'A polite request commonly used in workplace email communication.',
  },
  {
    id: 'dt-5',
    type: 'dictation',
    prompt: 'Listen and type the sentence:',
    audioText: 'The annual budget has been approved by the board of directors.',
    correctAnswer: 'The annual budget has been approved by the board of directors.',
    explanation: 'Passive voice is commonly used in formal business announcements.',
  },
];

// ─── TRUE OR FALSE ──────────────────────────────
export const trueFalseQuestions: Question[] = [
  {
    id: 'tf-1',
    type: 'true-false',
    prompt: 'Is this statement grammatically correct?',
    statement: 'The committee have decided to postpone the event.',
    isTrue: false,
    correctAnswer: 'false',
    explanation: '"Committee" is a collective noun requiring singular "has" in American English.',
  },
  {
    id: 'tf-2',
    type: 'true-false',
    prompt: 'Is this statement grammatically correct?',
    statement: 'She has been working at the firm for over a decade.',
    isTrue: true,
    correctAnswer: 'true',
    explanation: 'Correct use of present perfect continuous with "for" indicating duration.',
  },
  {
    id: 'tf-3',
    type: 'true-false',
    prompt: 'Is this statement grammatically correct?',
    statement: 'I would have went to the conference if I had known about it.',
    isTrue: false,
    correctAnswer: 'false',
    explanation: '"Went" should be "gone" — past participle is required after "would have."',
  },
  {
    id: 'tf-4',
    type: 'true-false',
    prompt: 'Is this statement grammatically correct?',
    statement: 'Neither the manager nor the assistants were informed.',
    isTrue: true,
    correctAnswer: 'true',
    explanation: 'With "neither...nor," the verb agrees with the nearest subject ("assistants" → plural "were").',
  },
  {
    id: 'tf-5',
    type: 'true-false',
    prompt: 'Is this statement grammatically correct?',
    statement: 'Everyone in the office have completed their training.',
    isTrue: false,
    correctAnswer: 'false',
    explanation: '"Everyone" is singular and requires "has," not "have."',
  },
];

// ─── LISTEN & CHOOSE ──────────────────────────────
export const listenChooseQuestions: Question[] = [
  {
    id: 'lc-1',
    type: 'listen-choose',
    prompt: 'Listen to the sentence and choose the correct option:',
    audioText: 'The quarterly review meeting has been moved to Thursday.',
    options: [
      'The meeting was cancelled.',
      'The quarterly review meeting has been moved to Thursday.',
      'The meeting will start immediately.',
      'The review happened last Thursday.',
    ],
    correctAnswer: 'The quarterly review meeting has been moved to Thursday.',
    explanation: 'The audio states the meeting was "moved to Thursday" — rescheduled, not cancelled.',
  },
  {
    id: 'lc-2',
    type: 'listen-choose',
    prompt: 'Listen and select what you heard:',
    audioText: 'Please submit your expense reports by the end of the month.',
    options: [
      'Expense reports are optional this month.',
      'Please submit your expense reports by the end of the month.',
      'Expense reports were due last week.',
      'The deadline for expenses has been extended.',
    ],
    correctAnswer: 'Please submit your expense reports by the end of the month.',
    explanation: 'The instruction clearly sets a deadline: end of the month for expense reports.',
  },
  {
    id: 'lc-3',
    type: 'listen-choose',
    prompt: 'What did you hear?',
    audioText: 'The new office policy requires all visitors to sign in at reception.',
    options: [
      'Visitors don\'t need to register anymore.',
      'The new office policy requires all visitors to sign in at reception.',
      'The reception has been closed permanently.',
      'Only employees need to sign in.',
    ],
    correctAnswer: 'The new office policy requires all visitors to sign in at reception.',
    explanation: 'The policy applies to all visitors and requires them to sign in at reception.',
  },
  {
    id: 'lc-4',
    type: 'listen-choose',
    prompt: 'Listen carefully and choose:',
    audioText: 'If the client approves the design, we can proceed with development.',
    options: [
      'Development has already started.',
      'The client rejected the design.',
      'If the client approves the design, we can proceed with development.',
      'The design phase is complete.',
    ],
    correctAnswer: 'If the client approves the design, we can proceed with development.',
    explanation: 'The conditional "if...can" indicates development depends on client approval.',
  },
  {
    id: 'lc-5',
    type: 'listen-choose',
    prompt: 'Select the correct interpretation:',
    audioText: 'I wish we had allocated more resources to the marketing campaign.',
    options: [
      'The marketing campaign had too many resources.',
      'I regret not allocating more resources to the marketing campaign.',
      'We will allocate more resources next time.',
      'The campaign doesn\'t need resources.',
    ],
    correctAnswer: 'I regret not allocating more resources to the marketing campaign.',
    explanation: '"I wish I had" expresses regret about a past action that didn\'t happen.',
  },
];

// ─── PRONUNCIATION MATCH (kept but simplified) ──────────────────────
export const pronunciationMatchQuestions: Question[] = [
  {
    id: 'pm-1',
    type: 'pronunciation-match',
    prompt: 'Which word rhymes with the target word?',
    sentence: 'report',
    options: ['repeat', 'support', 'result', 'respect'],
    correctAnswer: 'support',
    explanation: '"Report" and "support" share the "-ort" ending sound.',
  },
  {
    id: 'pm-2',
    type: 'pronunciation-match',
    prompt: 'Which word has the same vowel sound?',
    sentence: 'lead (verb)',
    options: ['led', 'feed', 'dead', 'head'],
    correctAnswer: 'feed',
    explanation: '"Lead" (present tense) and "feed" share the long "ee" vowel sound.',
  },
  {
    id: 'pm-3',
    type: 'pronunciation-match',
    prompt: 'Which word sounds the same (homophone)?',
    sentence: 'their',
    options: ['here', 'there', 'where', 'three'],
    correctAnswer: 'there',
    explanation: '"Their" and "there" are homophones — same sound, different meanings.',
  },
  {
    id: 'pm-4',
    type: 'pronunciation-match',
    prompt: 'Which word has the same ending sound?',
    sentence: 'managed',
    options: ['walked', 'charged', 'asked', 'fixed'],
    correctAnswer: 'charged',
    explanation: 'Both "managed" and "charged" end with the "-d" sound (voiced).',
  },
  {
    id: 'pm-5',
    type: 'pronunciation-match',
    prompt: 'Which word has the same stress pattern?',
    sentence: 'preSENT (verb)',
    options: ['PREsent (noun)', 'rePORT', 'OFfer', 'PROject (noun)'],
    correctAnswer: 'rePORT',
    explanation: 'Both "preSENT" (verb) and "rePORT" have stress on the second syllable.',
  },
];

// ─── PHOTO DESCRIPTION (workplace scenes) ──────────────────────
export const photoDescriptionQuestions: Question[] = [
  {
    id: 'pd-1',
    type: 'photo-description',
    prompt: 'Which sentence best describes this workplace scene?',
    imageUrl: 'office-meeting',
    options: [
      'Employees are having lunch in the cafeteria.',
      'The team is discussing a project in the conference room.',
      'Workers are exercising at the gym.',
      'Students are taking an exam.',
    ],
    correctAnswer: 'The team is discussing a project in the conference room.',
    explanation: 'An office meeting scene involves team discussion in a professional setting.',
  },
  {
    id: 'pd-2',
    type: 'photo-description',
    prompt: 'Which sentence best describes this scene?',
    imageUrl: 'presentation',
    options: [
      'A manager is delivering a quarterly presentation.',
      'Athletes are competing in a tournament.',
      'A chef is preparing a gourmet dish.',
      'Children are playing in the garden.',
    ],
    correctAnswer: 'A manager is delivering a quarterly presentation.',
    explanation: 'The scene describes a professional presentation in a business context.',
  },
  {
    id: 'pd-3',
    type: 'photo-description',
    prompt: 'Which sentence best describes this scene?',
    imageUrl: 'workspace',
    options: [
      'The employee is focused on completing a report at the desk.',
      'Musicians are rehearsing for a concert.',
      'Tourists are exploring a city.',
      'A pilot is landing the aircraft.',
    ],
    correctAnswer: 'The employee is focused on completing a report at the desk.',
    explanation: 'A workspace scene involves individual work activities.',
  },
  {
    id: 'pd-4',
    type: 'photo-description',
    prompt: 'Which sentence best describes this scene?',
    imageUrl: 'interview',
    options: [
      'Two colleagues are having a casual chat over coffee.',
      'A candidate is being interviewed by the hiring manager.',
      'Friends are watching a movie together.',
      'A teacher is lecturing students.',
    ],
    correctAnswer: 'A candidate is being interviewed by the hiring manager.',
    explanation: 'An interview scene features a formal discussion between candidate and interviewer.',
  },
  {
    id: 'pd-5',
    type: 'photo-description',
    prompt: 'Which sentence best describes this scene?',
    imageUrl: 'team-collaboration',
    options: [
      'Team members are brainstorming ideas on a whiteboard.',
      'Farmers are harvesting crops in the field.',
      'Scientists are conducting lab experiments.',
      'Athletes are stretching before a game.',
    ],
    correctAnswer: 'Team members are brainstorming ideas on a whiteboard.',
    explanation: 'Brainstorming sessions involve collaborative idea generation.',
  },
];

// ─── AUDIO WORD MATCH ──────────────────────────────
export const audioWordMatchQuestions: Question[] = [
  {
    id: 'awm-1',
    type: 'audio-word-match',
    prompt: 'Match each spoken word to its written form:',
    pairs: [
      { left: 'collaborate', right: 'collaborate' },
      { left: 'schedule', right: 'schedule' },
      { left: 'negotiate', right: 'negotiate' },
      { left: 'implement', right: 'implement' },
    ],
    correctAnswer: 'all matched',
    explanation: 'These business words are commonly used in professional settings.',
  },
  {
    id: 'awm-2',
    type: 'audio-word-match',
    prompt: 'Match the spoken terms to correct spelling:',
    pairs: [
      { left: 'receipt', right: 'receipt' },
      { left: 'guarantee', right: 'guarantee' },
      { left: 'occurrence', right: 'occurrence' },
      { left: 'accommodate', right: 'accommodate' },
    ],
    correctAnswer: 'all matched',
    explanation: 'Commonly misspelled words in professional communication.',
  },
  {
    id: 'awm-3',
    type: 'audio-word-match',
    prompt: 'Listen and match business terms:',
    pairs: [
      { left: 'quarterly', right: 'quarterly' },
      { left: 'stakeholder', right: 'stakeholder' },
      { left: 'deliverable', right: 'deliverable' },
      { left: 'benchmark', right: 'benchmark' },
    ],
    correctAnswer: 'all matched',
    explanation: 'Understanding business jargon is key for workplace communication.',
  },
  {
    id: 'awm-4',
    type: 'audio-word-match',
    prompt: 'Match spoken abbreviations to their meanings:',
    pairs: [
      { left: 'ASAP', right: 'ASAP' },
      { left: 'FYI', right: 'FYI' },
      { left: 'ETA', right: 'ETA' },
      { left: 'KPI', right: 'KPI' },
    ],
    correctAnswer: 'all matched',
    explanation: 'Business abbreviations are essential for quick, professional communication.',
  },
  {
    id: 'awm-5',
    type: 'audio-word-match',
    prompt: 'Match these frequently used professional words:',
    pairs: [
      { left: 'feasibility', right: 'feasibility' },
      { left: 'comprehensive', right: 'comprehensive' },
      { left: 'preliminary', right: 'preliminary' },
      { left: 'subsequent', right: 'subsequent' },
    ],
    correctAnswer: 'all matched',
    explanation: 'These are formal words often used in reports and presentations.',
  },
];

// ─── REPEAT SENTENCE ──────────────────────────────
export const repeatSentenceQuestions: Question[] = [
  {
    id: 'rs-1',
    type: 'repeat-sentence',
    prompt: 'Listen and repeat the sentence aloud:',
    audioText: 'I would like to schedule a follow-up meeting.',
    correctAnswer: 'I would like to schedule a follow-up meeting.',
    explanation: 'Practice clear pronunciation of professional phrases.',
  },
  {
    id: 'rs-2',
    type: 'repeat-sentence',
    prompt: 'Listen and repeat:',
    audioText: 'Could you please share the updated project timeline?',
    correctAnswer: 'Could you please share the updated project timeline?',
    explanation: 'This is a polite professional request. Notice the rising intonation.',
  },
  {
    id: 'rs-3',
    type: 'repeat-sentence',
    prompt: 'Repeat after listening:',
    audioText: 'The quarterly results exceeded our initial projections.',
    correctAnswer: 'The quarterly results exceeded our initial projections.',
    explanation: 'Business reporting language requires clear, confident delivery.',
  },
  {
    id: 'rs-4',
    type: 'repeat-sentence',
    prompt: 'Listen carefully and repeat:',
    audioText: 'We need to prioritize the client deliverables this week.',
    correctAnswer: 'We need to prioritize the client deliverables this week.',
    explanation: 'Practice workplace vocabulary with proper stress and rhythm.',
  },
  {
    id: 'rs-5',
    type: 'repeat-sentence',
    prompt: 'Repeat this sentence:',
    audioText: 'Thank you for your valuable feedback on the proposal.',
    correctAnswer: 'Thank you for your valuable feedback on the proposal.',
    explanation: 'Gratitude expressions are essential in professional communication.',
  },
];

// ─── ANSWER BY VOICE ──────────────────────────────
export const answerByVoiceQuestions: Question[] = [
  {
    id: 'abv-1',
    type: 'answer-by-voice',
    prompt: 'Answer the question by speaking:',
    voicePrompt: 'How would you greet a client in a formal meeting?',
    correctAnswer: 'Good morning, it is a pleasure to meet you.',
    spokenAnswer: 'Good morning',
    explanation: 'Professional greetings set the tone for formal interactions.',
  },
  {
    id: 'abv-2',
    type: 'answer-by-voice',
    prompt: 'Speak your answer:',
    voicePrompt: 'How do you politely ask for more time on a deadline?',
    correctAnswer: 'Could I please have an extension on the deadline?',
    spokenAnswer: 'extension',
    explanation: 'Using "Could I please" makes the request polite and professional.',
  },
  {
    id: 'abv-3',
    type: 'answer-by-voice',
    prompt: 'Answer aloud:',
    voicePrompt: 'What do you say when you want to express agreement in a meeting?',
    correctAnswer: 'I completely agree with that point.',
    spokenAnswer: 'agree',
    explanation: 'Clear agreement phrases show engagement and support in discussions.',
  },
  {
    id: 'abv-4',
    type: 'answer-by-voice',
    prompt: 'Speak your response:',
    voicePrompt: 'How would you introduce yourself in an interview?',
    correctAnswer: 'My name is [name], and I have experience in [field].',
    spokenAnswer: 'my name is',
    explanation: 'A structured self-introduction includes name and relevant experience.',
  },
  {
    id: 'abv-5',
    type: 'answer-by-voice',
    prompt: 'Answer by voice:',
    voicePrompt: 'How do you politely decline an invitation?',
    correctAnswer: 'Thank you for the invitation, but I am unable to attend.',
    spokenAnswer: 'thank you',
    explanation: 'Polite decline starts with gratitude before stating the inability.',
  },
];

export const getQuestionsForGame = (gameType: string): Question[] => {
  switch (gameType) {
    case 'fill-blanks': return fillBlanksQuestions;
    case 'sentence-correction': return sentenceCorrectionQuestions;
    case 'word-order': return wordOrderQuestions;
    case 'match-pairs': return matchPairsQuestions;
    case 'multiple-choice': return multipleChoiceQuestions;
    case 'spot-error': return spotErrorQuestions;
    case 'transform-sentence': return transformSentenceQuestions;
    case 'context-clues': return contextCluesQuestions;
    case 'dictation': return dictationQuestions;
    case 'pronunciation-match': return pronunciationMatchQuestions;
    case 'photo-description': return photoDescriptionQuestions;
    case 'true-false': return trueFalseQuestions;
    case 'listen-choose': return listenChooseQuestions;
    case 'audio-word-match': return audioWordMatchQuestions;
    case 'repeat-sentence': return repeatSentenceQuestions;
    case 'answer-by-voice': return answerByVoiceQuestions;
    default: return multipleChoiceQuestions;
  }
};
