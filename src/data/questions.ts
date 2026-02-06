import { Question } from '@/types/game';

export const fillBlanksQuestions: Question[] = [
  {
    id: 'fb-1',
    type: 'fill-blanks',
    prompt: 'She ___ to the store yesterday.',
    options: ['go', 'goes', 'went', 'going'],
    correctAnswer: 'went',
    explanation: 'Use past tense "went" because the action happened "yesterday" (past time marker).',
  },
  {
    id: 'fb-2',
    type: 'fill-blanks',
    prompt: 'If I ___ rich, I would travel the world.',
    options: ['am', 'was', 'were', 'be'],
    correctAnswer: 'were',
    explanation: 'In conditional sentences expressing unreal situations, we use "were" for all subjects (subjunctive mood).',
  },
  {
    id: 'fb-3',
    type: 'fill-blanks',
    prompt: 'Neither the teacher nor the students ___ ready for the test.',
    options: ['is', 'are', 'was', 'were'],
    correctAnswer: 'were',
    explanation: 'With "neither...nor", the verb agrees with the nearest subject ("students" - plural), hence "were".',
  },
  {
    id: 'fb-4',
    type: 'fill-blanks',
    prompt: 'By the time we arrive, the movie ___ already started.',
    options: ['has', 'have', 'will have', 'had'],
    correctAnswer: 'will have',
    explanation: 'Future perfect tense ("will have") is used for actions that will be completed before a future time.',
  },
  {
    id: 'fb-5',
    type: 'fill-blanks',
    prompt: 'The news ___ shocking to everyone.',
    options: ['is', 'are', 'were', 'have been'],
    correctAnswer: 'is',
    explanation: '"News" is an uncountable noun that takes a singular verb, even though it ends in "s".',
  },
];

export const sentenceCorrectionQuestions: Question[] = [
  {
    id: 'sc-1',
    type: 'sentence-correction',
    prompt: 'Find and fix the error:',
    sentence: 'He don\'t know the answer to the question.',
    options: ['He doesn\'t know the answer to the question.', 'He do not know the answer to the question.', 'He don\'t knows the answer to the question.', 'No error'],
    correctAnswer: 'He doesn\'t know the answer to the question.',
    explanation: 'Third person singular subjects (he, she, it) require "doesn\'t" instead of "don\'t".',
  },
  {
    id: 'sc-2',
    type: 'sentence-correction',
    prompt: 'Find and fix the error:',
    sentence: 'Me and my friend went to the park.',
    options: ['My friend and I went to the park.', 'I and my friend went to the park.', 'My friend and me went to the park.', 'No error'],
    correctAnswer: 'My friend and I went to the park.',
    explanation: 'Use "I" (not "me") as a subject. Also, it\'s polite to mention yourself last.',
  },
  {
    id: 'sc-3',
    type: 'sentence-correction',
    prompt: 'Find and fix the error:',
    sentence: 'Their going to the store later today.',
    options: ['They\'re going to the store later today.', 'There going to the store later today.', 'Their are going to the store later today.', 'No error'],
    correctAnswer: 'They\'re going to the store later today.',
    explanation: '"They\'re" (they are) is needed here, not "their" (possessive) or "there" (location).',
  },
  {
    id: 'sc-4',
    type: 'sentence-correction',
    prompt: 'Find and fix the error:',
    sentence: 'The team have won the championship.',
    options: ['The team has won the championship.', 'The team had won the championship.', 'The teams have won the championship.', 'No error'],
    correctAnswer: 'The team has won the championship.',
    explanation: 'Collective nouns like "team" typically take singular verbs in American English.',
  },
  {
    id: 'sc-5',
    type: 'sentence-correction',
    prompt: 'Find and fix the error:',
    sentence: 'She speaks English more better than her sister.',
    options: ['She speaks English better than her sister.', 'She speaks English more good than her sister.', 'She speaks English most better than her sister.', 'No error'],
    correctAnswer: 'She speaks English better than her sister.',
    explanation: '"Better" is already a comparative form. Don\'t use "more" with it (double comparative error).',
  },
];

export const wordOrderQuestions: Question[] = [
  {
    id: 'wo-1',
    type: 'word-order',
    prompt: 'Arrange the words to form a correct sentence:',
    words: ['always', 'she', 'breakfast', 'eats', 'morning', 'in', 'the'],
    correctAnswer: 'She always eats breakfast in the morning.',
    explanation: 'Adverbs of frequency (always) typically come after the subject and before the main verb.',
  },
  {
    id: 'wo-2',
    type: 'word-order',
    prompt: 'Arrange the words to form a correct sentence:',
    words: ['never', 'have', 'I', 'to', 'Japan', 'been'],
    correctAnswer: 'I have never been to Japan.',
    explanation: 'In present perfect, "never" goes between "have" and the past participle.',
  },
  {
    id: 'wo-3',
    type: 'word-order',
    prompt: 'Arrange the words to form a correct sentence:',
    words: ['is', 'what', 'doing', 'he', 'now', 'right'],
    correctAnswer: 'What is he doing right now?',
    explanation: 'Question words come first, followed by auxiliary verb, subject, main verb, and time expression.',
  },
  {
    id: 'wo-4',
    type: 'word-order',
    prompt: 'Arrange the words to form a correct sentence:',
    words: ['quickly', 'ran', 'the', 'dog', 'very', 'home'],
    correctAnswer: 'The dog ran home very quickly.',
    explanation: 'Standard order: Subject + Verb + Place + Manner adverb. "Very" modifies "quickly".',
  },
  {
    id: 'wo-5',
    type: 'word-order',
    prompt: 'Arrange the words to form a correct sentence:',
    words: ['beautiful', 'a', 'is', 'this', 'really', 'painting'],
    correctAnswer: 'This is a really beautiful painting.',
    explanation: 'Demonstrative + verb + article + adverb + adjective + noun.',
  },
];

export const matchPairsQuestions: Question[] = [
  {
    id: 'mp-1',
    type: 'match-pairs',
    prompt: 'Match the words with their antonyms:',
    pairs: [
      { left: 'happy', right: 'sad' },
      { left: 'big', right: 'small' },
      { left: 'fast', right: 'slow' },
      { left: 'hot', right: 'cold' },
    ],
    correctAnswer: 'all matched',
    explanation: 'Antonyms are words with opposite meanings. Learning antonyms helps expand vocabulary.',
  },
  {
    id: 'mp-2',
    type: 'match-pairs',
    prompt: 'Match the verbs with their past tense:',
    pairs: [
      { left: 'go', right: 'went' },
      { left: 'eat', right: 'ate' },
      { left: 'see', right: 'saw' },
      { left: 'take', right: 'took' },
    ],
    correctAnswer: 'all matched',
    explanation: 'Irregular verbs don\'t follow the regular -ed pattern. These must be memorized.',
  },
  {
    id: 'mp-3',
    type: 'match-pairs',
    prompt: 'Match the synonyms:',
    pairs: [
      { left: 'beautiful', right: 'gorgeous' },
      { left: 'intelligent', right: 'smart' },
      { left: 'quick', right: 'fast' },
      { left: 'angry', right: 'furious' },
    ],
    correctAnswer: 'all matched',
    explanation: 'Synonyms are words with similar meanings. Using varied synonyms improves writing.',
  },
  {
    id: 'mp-4',
    type: 'match-pairs',
    prompt: 'Match the singular with plural:',
    pairs: [
      { left: 'child', right: 'children' },
      { left: 'mouse', right: 'mice' },
      { left: 'tooth', right: 'teeth' },
      { left: 'person', right: 'people' },
    ],
    correctAnswer: 'all matched',
    explanation: 'Irregular plurals don\'t follow the standard -s/-es rule.',
  },
  {
    id: 'mp-5',
    type: 'match-pairs',
    prompt: 'Match the contractions:',
    pairs: [
      { left: 'I am', right: "I'm" },
      { left: 'they are', right: "they're" },
      { left: 'do not', right: "don't" },
      { left: 'cannot', right: "can't" },
    ],
    correctAnswer: 'all matched',
    explanation: 'Contractions combine two words by replacing letters with an apostrophe.',
  },
];

export const multipleChoiceQuestions: Question[] = [
  {
    id: 'mc-1',
    type: 'multiple-choice',
    prompt: 'Which sentence uses the correct form of "their/there/they\'re"?',
    options: [
      'Their going to the movies tonight.',
      'They\'re going to the movies tonight.',
      'There going to the movies tonight.',
      'Theyre going to the movies tonight.',
    ],
    correctAnswer: 'They\'re going to the movies tonight.',
    explanation: '"They\'re" is a contraction of "they are." "Their" shows possession, and "there" refers to a place.',
  },
  {
    id: 'mc-2',
    type: 'multiple-choice',
    prompt: 'Which word correctly completes: "She is ___ than her brother."',
    options: ['more tall', 'taller', 'tallest', 'most tall'],
    correctAnswer: 'taller',
    explanation: 'For one-syllable adjectives, add "-er" for comparatives, not "more."',
  },
  {
    id: 'mc-3',
    type: 'multiple-choice',
    prompt: 'Identify the correct sentence:',
    options: [
      'The dog wagged it\'s tail.',
      'The dog wagged its tail.',
      'The dog wagged its\' tail.',
      'The dog wagged its\'s tail.',
    ],
    correctAnswer: 'The dog wagged its tail.',
    explanation: '"Its" (no apostrophe) is possessive. "It\'s" means "it is" or "it has."',
  },
  {
    id: 'mc-4',
    type: 'multiple-choice',
    prompt: 'Which is the correct plural of "crisis"?',
    options: ['crisises', 'crisies', 'crises', 'crisis\'s'],
    correctAnswer: 'crises',
    explanation: 'Words ending in "-is" typically change to "-es" in plural (crisis → crises, basis → bases).',
  },
  {
    id: 'mc-5',
    type: 'multiple-choice',
    prompt: 'Choose the sentence with correct subject-verb agreement:',
    options: [
      'The group of students are ready.',
      'The group of students is ready.',
      'The groups of students is ready.',
      'The group of student are ready.',
    ],
    correctAnswer: 'The group of students is ready.',
    explanation: '"Group" is a collective noun and takes a singular verb "is" in American English.',
  },
];

export const spotErrorQuestions: Question[] = [
  {
    id: 'se-1',
    type: 'spot-error',
    prompt: 'Find the word with the error:',
    sentence: 'She dont like to wake up early in the morning.',
    correctAnswer: 'dont',
    explanation: '"Dont" should be "doesn\'t" for third person singular subjects.',
  },
  {
    id: 'se-2',
    type: 'spot-error',
    prompt: 'Find the word with the error:',
    sentence: 'The childrens are playing in the garden happily.',
    correctAnswer: 'childrens',
    explanation: '"Children" is already plural. No need to add "s."',
  },
  {
    id: 'se-3',
    type: 'spot-error',
    prompt: 'Find the word with the error:',
    sentence: 'He has went to the store to buy groceries.',
    correctAnswer: 'went',
    explanation: 'With "has," use the past participle "gone," not "went."',
  },
  {
    id: 'se-4',
    type: 'spot-error',
    prompt: 'Find the word with the error:',
    sentence: 'Their is a beautiful garden behind our house.',
    correctAnswer: 'Their',
    explanation: '"Their" (possessive) should be "There" (indicating place/existence).',
  },
  {
    id: 'se-5',
    type: 'spot-error',
    prompt: 'Find the word with the error:',
    sentence: 'The informations provided were very helpful to us.',
    correctAnswer: 'informations',
    explanation: '"Information" is an uncountable noun and never takes a plural form.',
  },
];

export const transformSentenceQuestions: Question[] = [
  {
    id: 'ts-1',
    type: 'transform-sentence',
    prompt: 'Transform to passive voice:',
    sentence: 'The cat ate the fish.',
    transformRule: 'Active → Passive',
    correctAnswer: 'The fish was eaten by the cat.',
    explanation: 'In passive voice, the object becomes the subject, and we use "was/were + past participle."',
  },
  {
    id: 'ts-2',
    type: 'transform-sentence',
    prompt: 'Transform to negative:',
    sentence: 'She likes coffee.',
    transformRule: 'Positive → Negative',
    correctAnswer: 'She does not like coffee.',
    explanation: 'For present simple negative, add "does not" (or "doesn\'t") before the base verb.',
  },
  {
    id: 'ts-3',
    type: 'transform-sentence',
    prompt: 'Transform to a question:',
    sentence: 'They are coming to the party.',
    transformRule: 'Statement → Question',
    correctAnswer: 'Are they coming to the party?',
    explanation: 'For questions with "be" verbs, move the verb before the subject.',
  },
  {
    id: 'ts-4',
    type: 'transform-sentence',
    prompt: 'Transform to past tense:',
    sentence: 'I walk to school every day.',
    transformRule: 'Present → Past',
    correctAnswer: 'I walked to school every day.',
    explanation: 'Regular verbs form past tense by adding "-ed" to the base form.',
  },
  {
    id: 'ts-5',
    type: 'transform-sentence',
    prompt: 'Transform to future tense:',
    sentence: 'She reads books.',
    transformRule: 'Present → Future',
    correctAnswer: 'She will read books.',
    explanation: 'Future tense is formed with "will + base verb."',
  },
];

export const contextCluesQuestions: Question[] = [
  {
    id: 'cc-1',
    type: 'context-clues',
    prompt: 'Choose the word that fits the context:',
    sentence: 'The weather was ___ so we decided to have a picnic in the park.',
    options: ['terrible', 'beautiful', 'rainy', 'freezing'],
    correctAnswer: 'beautiful',
    explanation: 'A picnic suggests good weather. "Beautiful" fits the positive context.',
  },
  {
    id: 'cc-2',
    type: 'context-clues',
    prompt: 'Choose the word that fits the context:',
    sentence: 'After running the marathon, she was completely ___ and needed to rest.',
    options: ['energetic', 'exhausted', 'excited', 'calm'],
    correctAnswer: 'exhausted',
    explanation: 'Running a marathon is tiring, so "exhausted" (very tired) fits best.',
  },
  {
    id: 'cc-3',
    type: 'context-clues',
    prompt: 'Choose the word that fits the context:',
    sentence: 'The detective found a crucial ___ that helped solve the mystery.',
    options: ['problem', 'mistake', 'clue', 'question'],
    correctAnswer: 'clue',
    explanation: 'Detectives look for "clues" to solve mysteries. The context makes this clear.',
  },
  {
    id: 'cc-4',
    type: 'context-clues',
    prompt: 'Choose the word that fits the context:',
    sentence: 'The abandoned house looked ___ with broken windows and overgrown weeds.',
    options: ['inviting', 'cozy', 'creepy', 'modern'],
    correctAnswer: 'creepy',
    explanation: 'Broken windows and overgrown weeds suggest something scary or "creepy."',
  },
  {
    id: 'cc-5',
    type: 'context-clues',
    prompt: 'Choose the word that fits the context:',
    sentence: 'The generous man ___ food to everyone at the shelter.',
    options: ['sold', 'donated', 'stole', 'demanded'],
    correctAnswer: 'donated',
    explanation: '"Generous" suggests giving freely, which matches "donated."',
  },
];

export const dictationQuestions: Question[] = [
  {
    id: 'dt-1',
    type: 'dictation',
    prompt: 'Listen and type the sentence:',
    audioText: 'The quick brown fox jumps over the lazy dog.',
    correctAnswer: 'The quick brown fox jumps over the lazy dog.',
    explanation: 'This famous sentence contains every letter of the alphabet!',
  },
  {
    id: 'dt-2',
    type: 'dictation',
    prompt: 'Listen and type the sentence:',
    audioText: 'She sells seashells by the seashore.',
    correctAnswer: 'She sells seashells by the seashore.',
    explanation: 'This is a famous tongue twister that practices the "s" and "sh" sounds.',
  },
  {
    id: 'dt-3',
    type: 'dictation',
    prompt: 'Listen and type the sentence:',
    audioText: 'Practice makes perfect.',
    correctAnswer: 'Practice makes perfect.',
    explanation: 'This common saying encourages regular practice to improve skills.',
  },
  {
    id: 'dt-4',
    type: 'dictation',
    prompt: 'Listen and type the sentence:',
    audioText: 'Better late than never.',
    correctAnswer: 'Better late than never.',
    explanation: 'This proverb means it\'s better to do something late than not do it at all.',
  },
  {
    id: 'dt-5',
    type: 'dictation',
    prompt: 'Listen and type the sentence:',
    audioText: 'Actions speak louder than words.',
    correctAnswer: 'Actions speak louder than words.',
    explanation: 'This proverb means what you do is more important than what you say.',
  },
];

export const pronunciationMatchQuestions: Question[] = [
  {
    id: 'pm-1',
    type: 'pronunciation-match',
    prompt: 'Which word rhymes with the target word?',
    sentence: 'cat',
    options: ['cut', 'hat', 'cot', 'cart'],
    correctAnswer: 'hat',
    explanation: '"Cat" and "hat" both end with the "-at" sound, making them rhymes.',
  },
  {
    id: 'pm-2',
    type: 'pronunciation-match',
    prompt: 'Which word has the same vowel sound?',
    sentence: 'beat',
    options: ['bet', 'bit', 'meet', 'but'],
    correctAnswer: 'meet',
    explanation: '"Beat" and "meet" both have the long "ee" vowel sound.',
  },
  {
    id: 'pm-3',
    type: 'pronunciation-match',
    prompt: 'Which word sounds the same (homophone)?',
    sentence: 'there',
    options: ['here', 'their', 'where', 'three'],
    correctAnswer: 'their',
    explanation: '"There" and "their" are homophones - they sound the same but have different meanings.',
  },
  {
    id: 'pm-4',
    type: 'pronunciation-match',
    prompt: 'Which word rhymes with the target word?',
    sentence: 'blue',
    options: ['blow', 'true', 'blew', 'blur'],
    correctAnswer: 'true',
    explanation: '"Blue" and "true" both end with the "-oo" sound.',
  },
  {
    id: 'pm-5',
    type: 'pronunciation-match',
    prompt: 'Which word has the same ending sound?',
    sentence: 'walked',
    options: ['wanted', 'played', 'talked', 'started'],
    correctAnswer: 'talked',
    explanation: 'Both "walked" and "talked" end with the "-t" sound (not "-ed" as in "wanted").',
  },
];

export const photoDescriptionQuestions: Question[] = [
  {
    id: 'pd-1',
    type: 'photo-description',
    prompt: 'Which sentence best describes the scene?',
    imageUrl: 'beach',
    options: [
      'People are skiing down a mountain.',
      'Waves are crashing on the sandy shore.',
      'Children are playing in the snow.',
      'Cars are driving on a busy highway.',
    ],
    correctAnswer: 'Waves are crashing on the sandy shore.',
    explanation: 'A beach scene includes sand, water, and waves - elements described in the correct answer.',
  },
  {
    id: 'pd-2',
    type: 'photo-description',
    prompt: 'Which sentence best describes the scene?',
    imageUrl: 'kitchen',
    options: [
      'The chef is preparing a delicious meal.',
      'Students are studying in the library.',
      'Athletes are running on the track.',
      'Musicians are performing on stage.',
    ],
    correctAnswer: 'The chef is preparing a delicious meal.',
    explanation: 'A kitchen scene involves cooking and food preparation.',
  },
  {
    id: 'pd-3',
    type: 'photo-description',
    prompt: 'Which sentence best describes the scene?',
    imageUrl: 'park',
    options: [
      'Fish are swimming in the ocean.',
      'Planes are landing at the airport.',
      'Children are playing on the playground.',
      'Workers are building a skyscraper.',
    ],
    correctAnswer: 'Children are playing on the playground.',
    explanation: 'Parks often have playgrounds where children play.',
  },
  {
    id: 'pd-4',
    type: 'photo-description',
    prompt: 'Which sentence best describes the scene?',
    imageUrl: 'classroom',
    options: [
      'The teacher is explaining the lesson to students.',
      'Doctors are performing surgery.',
      'Farmers are harvesting crops.',
      'Firefighters are putting out a fire.',
    ],
    correctAnswer: 'The teacher is explaining the lesson to students.',
    explanation: 'A classroom scene involves teaching and learning activities.',
  },
  {
    id: 'pd-5',
    type: 'photo-description',
    prompt: 'Which sentence best describes the scene?',
    imageUrl: 'restaurant',
    options: [
      'Guests are enjoying their dinner at the table.',
      'Hikers are climbing the mountain.',
      'Scientists are conducting experiments.',
      'Artists are painting in the studio.',
    ],
    correctAnswer: 'Guests are enjoying their dinner at the table.',
    explanation: 'A restaurant scene involves people dining and enjoying food.',
  },
];

export const trueFalseQuestions: Question[] = [
  {
    id: 'tf-1',
    type: 'true-false',
    prompt: 'Is this statement grammatically correct?',
    statement: 'The children is playing in the garden.',
    isTrue: false,
    correctAnswer: 'false',
    explanation: '"Children" is plural, so it requires "are" not "is." Correct: "The children are playing."',
  },
  {
    id: 'tf-2',
    type: 'true-false',
    prompt: 'Is this statement grammatically correct?',
    statement: 'She has been working here for five years.',
    isTrue: true,
    correctAnswer: 'true',
    explanation: 'This is correct! Present perfect continuous is used with "for" to show duration.',
  },
  {
    id: 'tf-3',
    type: 'true-false',
    prompt: 'Is this statement grammatically correct?',
    statement: 'I seen him at the store yesterday.',
    isTrue: false,
    correctAnswer: 'false',
    explanation: '"Seen" requires a helper verb. Correct: "I saw him" or "I have seen him."',
  },
  {
    id: 'tf-4',
    type: 'true-false',
    prompt: 'Is this statement grammatically correct?',
    statement: 'Neither of the answers is correct.',
    isTrue: true,
    correctAnswer: 'true',
    explanation: '"Neither" takes a singular verb "is." This sentence is grammatically correct.',
  },
  {
    id: 'tf-5',
    type: 'true-false',
    prompt: 'Is this statement grammatically correct?',
    statement: 'Everyone have their own opinion.',
    isTrue: false,
    correctAnswer: 'false',
    explanation: '"Everyone" is singular and requires "has." Correct: "Everyone has their own opinion."',
  },
];

// Listen & Choose Questions (New)
export const listenChooseQuestions: Question[] = [
  {
    id: 'lc-1',
    type: 'listen-choose',
    prompt: 'Listen to the sentence and choose the correct option:',
    audioText: 'The meeting has been postponed until next week.',
    options: [
      'The meeting was canceled completely.',
      'The meeting has been postponed until next week.',
      'The meeting will start immediately.',
      'The meeting happened yesterday.',
    ],
    correctAnswer: 'The meeting has been postponed until next week.',
    explanation: 'The audio clearly states the meeting was "postponed until next week," not canceled.',
  },
  {
    id: 'lc-2',
    type: 'listen-choose',
    prompt: 'Listen and select what you heard:',
    audioText: 'Please turn off your mobile phones during the presentation.',
    options: [
      'Please charge your phones during the show.',
      'Please turn on your phones after the meeting.',
      'Please turn off your mobile phones during the presentation.',
      'Mobile phones are allowed in the theater.',
    ],
    correctAnswer: 'Please turn off your mobile phones during the presentation.',
    explanation: 'The instruction was to turn OFF phones during the presentation.',
  },
  {
    id: 'lc-3',
    type: 'listen-choose',
    prompt: 'What did you hear?',
    audioText: 'The library closes at nine o\'clock on weekdays.',
    options: [
      'The library opens at nine every day.',
      'The library closes at nine o\'clock on weekdays.',
      'The library is open twenty-four hours.',
      'The library closes at six on Saturdays.',
    ],
    correctAnswer: 'The library closes at nine o\'clock on weekdays.',
    explanation: 'The audio specifies the closing time is 9 PM on weekdays.',
  },
  {
    id: 'lc-4',
    type: 'listen-choose',
    prompt: 'Listen carefully and choose:',
    audioText: 'She would have called if she had known about the party.',
    options: [
      'She called about the party.',
      'She didn\'t know about the party and didn\'t call.',
      'She knew about the party but didn\'t call.',
      'She will call about the party tomorrow.',
    ],
    correctAnswer: 'She didn\'t know about the party and didn\'t call.',
    explanation: 'The third conditional implies she didn\'t know, so she didn\'t call.',
  },
  {
    id: 'lc-5',
    type: 'listen-choose',
    prompt: 'Select the correct interpretation:',
    audioText: 'I wish I had studied harder for the exam.',
    options: [
      'I studied hard and passed the exam.',
      'I regret not studying harder for the exam.',
      'I will study harder next time.',
      'I don\'t need to study for exams.',
    ],
    correctAnswer: 'I regret not studying harder for the exam.',
    explanation: '"I wish I had" expresses regret about a past action that didn\'t happen.',
  },
];

// Audio Word Match Questions (New)
export const audioWordMatchQuestions: Question[] = [
  {
    id: 'awm-1',
    type: 'audio-word-match',
    prompt: 'Match each word you hear to its written form:',
    pairs: [
      { left: 'comfortable', right: 'comfortable' },
      { left: 'necessary', right: 'necessary' },
      { left: 'beautiful', right: 'beautiful' },
      { left: 'interesting', right: 'interesting' },
    ],
    correctAnswer: 'all matched',
    explanation: 'These commonly used words can be tricky to spell. Practice helps!',
  },
  {
    id: 'awm-2',
    type: 'audio-word-match',
    prompt: 'Match the spoken words to correct spelling:',
    pairs: [
      { left: 'receive', right: 'receive' },
      { left: 'believe', right: 'believe' },
      { left: 'achieve', right: 'achieve' },
      { left: 'perceive', right: 'perceive' },
    ],
    correctAnswer: 'all matched',
    explanation: 'Words with "ie" vs "ei" follow the rule: "i before e except after c."',
  },
  {
    id: 'awm-3',
    type: 'audio-word-match',
    prompt: 'Listen and match homophones:',
    pairs: [
      { left: 'their', right: 'their' },
      { left: 'there', right: 'there' },
      { left: 'they\'re', right: 'they\'re' },
      { left: 'wear', right: 'wear' },
    ],
    correctAnswer: 'all matched',
    explanation: 'Homophones sound the same but have different spellings and meanings.',
  },
  {
    id: 'awm-4',
    type: 'audio-word-match',
    prompt: 'Match spoken contractions to their forms:',
    pairs: [
      { left: 'wouldn\'t', right: 'wouldn\'t' },
      { left: 'shouldn\'t', right: 'shouldn\'t' },
      { left: 'couldn\'t', right: 'couldn\'t' },
      { left: 'won\'t', right: 'won\'t' },
    ],
    correctAnswer: 'all matched',
    explanation: 'Contractions are shortened forms of words, marked with apostrophes.',
  },
  {
    id: 'awm-5',
    type: 'audio-word-match',
    prompt: 'Match these frequently misspelled words:',
    pairs: [
      { left: 'definitely', right: 'definitely' },
      { left: 'separately', right: 'separately' },
      { left: 'occasionally', right: 'occasionally' },
      { left: 'immediately', right: 'immediately' },
    ],
    correctAnswer: 'all matched',
    explanation: 'These adverbs are commonly misspelled. Note the "-ly" endings.',
  },
];

// Repeat Sentence Questions (New)
export const repeatSentenceQuestions: Question[] = [
  {
    id: 'rs-1',
    type: 'repeat-sentence',
    prompt: 'Listen and repeat the sentence aloud:',
    audioText: 'The weather is beautiful today.',
    correctAnswer: 'The weather is beautiful today.',
    explanation: 'Practice clear pronunciation of each word. Focus on the "th" sound in "weather."',
  },
  {
    id: 'rs-2',
    type: 'repeat-sentence',
    prompt: 'Listen and repeat:',
    audioText: 'Could you please help me with this problem?',
    correctAnswer: 'Could you please help me with this problem?',
    explanation: 'This is a polite request. Notice the rising intonation for questions.',
  },
  {
    id: 'rs-3',
    type: 'repeat-sentence',
    prompt: 'Repeat after listening:',
    audioText: 'I have been studying English for three years.',
    correctAnswer: 'I have been studying English for three years.',
    explanation: 'Present perfect continuous tense for ongoing actions. Stress "studying."',
  },
  {
    id: 'rs-4',
    type: 'repeat-sentence',
    prompt: 'Listen carefully and repeat:',
    audioText: 'The restaurant around the corner serves excellent food.',
    correctAnswer: 'The restaurant around the corner serves excellent food.',
    explanation: 'Practice the "r" sounds and link words smoothly together.',
  },
  {
    id: 'rs-5',
    type: 'repeat-sentence',
    prompt: 'Repeat this sentence:',
    audioText: 'If I had more time, I would travel the world.',
    correctAnswer: 'If I had more time, I would travel the world.',
    explanation: 'Second conditional structure. Notice the pause after the comma.',
  },
];

// Answer by Voice Questions (New)
export const answerByVoiceQuestions: Question[] = [
  {
    id: 'abv-1',
    type: 'answer-by-voice',
    prompt: 'Answer the question by speaking:',
    voicePrompt: 'What is the past tense of "go"?',
    correctAnswer: 'went',
    spokenAnswer: 'went',
    explanation: '"Go" is an irregular verb. Its past tense is "went," not "goed."',
  },
  {
    id: 'abv-2',
    type: 'answer-by-voice',
    prompt: 'Speak your answer:',
    voicePrompt: 'Complete this sentence: "She ___ to school every day."',
    correctAnswer: 'goes',
    spokenAnswer: 'goes',
    explanation: 'Third person singular (she) requires "goes" in present simple.',
  },
  {
    id: 'abv-3',
    type: 'answer-by-voice',
    prompt: 'Answer aloud:',
    voicePrompt: 'What word means the opposite of "happy"?',
    correctAnswer: 'sad',
    spokenAnswer: 'sad',
    explanation: '"Sad" is the most common antonym of "happy."',
  },
  {
    id: 'abv-4',
    type: 'answer-by-voice',
    prompt: 'Speak your response:',
    voicePrompt: 'Correct this sentence: "He don\'t like pizza."',
    correctAnswer: 'He doesn\'t like pizza.',
    spokenAnswer: 'doesn\'t',
    explanation: 'Use "doesn\'t" for third person singular negative statements.',
  },
  {
    id: 'abv-5',
    type: 'answer-by-voice',
    prompt: 'Answer by voice:',
    voicePrompt: 'What is the plural of "child"?',
    correctAnswer: 'children',
    spokenAnswer: 'children',
    explanation: '"Child" has an irregular plural: "children," not "childs."',
  },
];

export const getQuestionsForGame = (gameType: string): Question[] => {
  switch (gameType) {
    case 'fill-blanks':
      return fillBlanksQuestions;
    case 'sentence-correction':
      return sentenceCorrectionQuestions;
    case 'word-order':
      return wordOrderQuestions;
    case 'match-pairs':
      return matchPairsQuestions;
    case 'multiple-choice':
      return multipleChoiceQuestions;
    case 'spot-error':
      return spotErrorQuestions;
    case 'transform-sentence':
      return transformSentenceQuestions;
    case 'context-clues':
      return contextCluesQuestions;
    case 'dictation':
      return dictationQuestions;
    case 'pronunciation-match':
      return pronunciationMatchQuestions;
    case 'photo-description':
      return photoDescriptionQuestions;
    case 'true-false':
      return trueFalseQuestions;
    case 'listen-choose':
      return listenChooseQuestions;
    case 'audio-word-match':
      return audioWordMatchQuestions;
    case 'repeat-sentence':
      return repeatSentenceQuestions;
    case 'answer-by-voice':
      return answerByVoiceQuestions;
    default:
      return fillBlanksQuestions;
  }
};
