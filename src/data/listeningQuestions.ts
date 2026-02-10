/**
 * Listening Module Questions — 3 modules × 3 levels × 3 unique tasks each
 * Every question uses audioText for TTS playback.
 */

export interface ListeningQuestion {
  id: string;
  moduleId: string;
  level: 1 | 2 | 3;
  /** Unique game mechanic identifier */
  gameType:
    | 'action-instruction'
    | 'short-question-answer'
    | 'keyword-identification'
    | 'dialogue-comprehension'
    | 'intent-recognition'
    | 'missing-information'
    | 'announcement-questions'
    | 'step-sequence'
    | 'summary-selection'
    | 'topic-identification'
    | 'speaker-decision'
    | 'role-identification'
    | 'problem-solution'
    | 'opinion-matching'
    | 'detail-extraction'
    | 'meeting-outcome'
    | 'agree-disagree'
    | 'key-points'
    | 'main-idea-selection'
    | 'fact-identification'
    | 'topic-matching'
    | 'section-questions'
    | 'order-of-points'
    | 'cause-effect'
    | 'presentation-summary'
    | 'data-extraction'
    | 'opinion-vs-fact';
  /** Label shown above question */
  label: string;
  /** Instruction/prompt shown to user */
  prompt: string;
  /** Text spoken via TTS */
  audioText: string;
  /** For single-select MCQ */
  options?: string[];
  /** Correct answer string */
  correctAnswer: string;
  explanation: string;
  /** For multi-question games (e.g. announcement-questions) */
  subQuestions?: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  /** For step-sequence: user orders these */
  steps?: string[];
  /** For opinion-matching: match speaker → opinion */
  speakers?: { speaker: string; opinion: string }[];
  /** For key-points: select N correct from options */
  correctKeys?: string[];
  /** For order-of-points: correct ordering */
  correctOrder?: string[];
  /** For opinion-vs-fact: statements with labels */
  statements?: { text: string; type: 'fact' | 'opinion' }[];
}

// ════════════════════════════════════════════════
// MODULE 10: Basic Listening & Responses
// ════════════════════════════════════════════════

export const basicListeningQuestions: ListeningQuestion[] = [
  // ── Level 1: Single Sentence Understanding ──
  {
    id: 'bl-l1-1',
    moduleId: 'basic-listening',
    level: 1,
    gameType: 'action-instruction',
    label: 'Action Instruction',
    prompt: 'Listen to the instruction and select the correct action.',
    audioText: 'Please open the email and reply before 3 PM.',
    options: [
      'Forward the email to your manager',
      'Reply to the email before 3 PM',
      'Delete the email after reading',
      'Print the email and file it',
    ],
    correctAnswer: 'Reply to the email before 3 PM',
    explanation: 'The instruction clearly states to reply (not forward, delete, or print) before 3 PM.',
  },
  {
    id: 'bl-l1-2',
    moduleId: 'basic-listening',
    level: 1,
    gameType: 'short-question-answer',
    label: 'Best Response',
    prompt: 'Listen to the question and select the most appropriate response.',
    audioText: 'Where is the meeting room?',
    options: [
      'It starts at 10 AM.',
      'It\'s on the second floor, room 204.',
      'The meeting is about the new project.',
      'Yes, I will attend the meeting.',
    ],
    correctAnswer: 'It\'s on the second floor, room 204.',
    explanation: 'The question asks about location. Only "second floor, room 204" provides a location answer.',
  },
  {
    id: 'bl-l1-3',
    moduleId: 'basic-listening',
    level: 1,
    gameType: 'keyword-identification',
    label: 'Key Information',
    prompt: 'What is the main information in this sentence?',
    audioText: 'The delivery will arrive tomorrow morning.',
    options: [
      'Delivery location',
      'Delivery time',
      'Delivery cost',
      'Delivery method',
    ],
    correctAnswer: 'Delivery time',
    explanation: '"Tomorrow morning" is the key information — it tells when the delivery will arrive.',
  },

  // ── Level 2: Short Conversations ──
  {
    id: 'bl-l2-1',
    moduleId: 'basic-listening',
    level: 2,
    gameType: 'dialogue-comprehension',
    label: 'Dialogue Comprehension',
    prompt: 'Listen to the conversation. What are they mainly discussing?',
    audioText: 'Person A: Have you seen the updated project timeline? Person B: Yes, the deadline has been moved to next Friday. Person A: Good. I\'ll adjust the milestones accordingly.',
    options: [
      'A salary negotiation',
      'A change in project deadline',
      'A new team member joining',
      'A client complaint',
    ],
    correctAnswer: 'A change in project deadline',
    explanation: 'The conversation revolves around the deadline being moved to next Friday.',
  },
  {
    id: 'bl-l2-2',
    moduleId: 'basic-listening',
    level: 2,
    gameType: 'intent-recognition',
    label: 'Speaker Intent',
    prompt: 'Listen and identify the speaker\'s intention.',
    audioText: 'Person A: Could you help me format this report? I\'m not sure how to add the charts. Person B: Sure, let me show you how to do it.',
    options: [
      'Asking for help',
      'Giving instructions',
      'Making a complaint',
      'Providing information',
    ],
    correctAnswer: 'Asking for help',
    explanation: 'Person A is requesting assistance with formatting — "Could you help me" signals a help request.',
  },
  {
    id: 'bl-l2-3',
    moduleId: 'basic-listening',
    level: 2,
    gameType: 'missing-information',
    label: 'Missing Detail',
    prompt: 'Listen and fill in the missing information.',
    audioText: 'The training session will be held in conference room B on Wednesday at 2 PM. Please bring your laptop and the course materials.',
    options: [
      'Conference room A at 3 PM',
      'Conference room B at 2 PM',
      'The auditorium at 2 PM',
      'Conference room B at 3 PM',
    ],
    correctAnswer: 'Conference room B at 2 PM',
    explanation: 'The audio specifically mentions "conference room B" and "2 PM."',
  },

  // ── Level 3: Multi-Sentence Audio ──
  {
    id: 'bl-l3-1',
    moduleId: 'basic-listening',
    level: 3,
    gameType: 'announcement-questions',
    label: 'Announcement Analysis',
    prompt: 'Listen to the announcement and answer the questions.',
    audioText: 'Attention all employees. The annual company picnic will be held this Saturday, June 15th, at Riverside Park from 10 AM to 4 PM. The purpose is to celebrate our record-breaking quarter. Food and refreshments will be provided. Please RSVP to HR by Wednesday.',
    subQuestions: [
      {
        question: 'When is the event?',
        options: ['Friday, June 14th', 'Saturday, June 15th', 'Sunday, June 16th', 'Monday, June 17th'],
        correctAnswer: 'Saturday, June 15th',
      },
      {
        question: 'Where will it be held?',
        options: ['Company cafeteria', 'Riverside Park', 'Downtown Convention Center', 'Office rooftop'],
        correctAnswer: 'Riverside Park',
      },
      {
        question: 'What is the purpose?',
        options: ['New product launch', 'Celebrate a record quarter', 'Welcome new employees', 'Retirement party'],
        correctAnswer: 'Celebrate a record quarter',
      },
    ],
    correctAnswer: 'all-sub-questions',
    explanation: 'The announcement states Saturday June 15th at Riverside Park to celebrate a record-breaking quarter.',
  },
  {
    id: 'bl-l3-2',
    moduleId: 'basic-listening',
    level: 3,
    gameType: 'step-sequence',
    label: 'Task Sequence',
    prompt: 'Listen to the instructions and arrange the steps in the correct order.',
    audioText: 'To set up your new workstation, first log into the company portal using your employee ID. Next, download the required software from the IT tools section. After that, connect to the secure VPN. Finally, test your email and messaging applications to ensure everything works.',
    steps: [
      'Log into the company portal',
      'Download required software',
      'Connect to the secure VPN',
      'Test email and messaging apps',
    ],
    correctOrder: [
      'Log into the company portal',
      'Download required software',
      'Connect to the secure VPN',
      'Test email and messaging apps',
    ],
    correctAnswer: 'correct-order',
    explanation: 'The instructions follow a sequential order: portal → software → VPN → test apps.',
  },
  {
    id: 'bl-l3-3',
    moduleId: 'basic-listening',
    level: 3,
    gameType: 'summary-selection',
    label: 'Best Summary',
    prompt: 'Listen and select the best summary of what was said.',
    audioText: 'Our customer satisfaction scores have improved by 15% this quarter compared to last quarter. The main factors include faster response times in our support department and the introduction of our new self-service portal. However, we still need to work on reducing the average resolution time for complex issues.',
    options: [
      'Customer satisfaction dropped due to slow response times.',
      'Customer scores improved thanks to faster support and a new portal, but complex issue resolution still needs work.',
      'The company launched a new product that increased satisfaction.',
      'Support tickets decreased by 15% this quarter.',
    ],
    correctAnswer: 'Customer scores improved thanks to faster support and a new portal, but complex issue resolution still needs work.',
    explanation: 'The summary captures the improvement (15%), the causes (faster support, new portal), and the remaining challenge (complex issues).',
  },
];

// ════════════════════════════════════════════════
// MODULE 11: Conversation Listening
// ════════════════════════════════════════════════

export const conversationListeningQuestions: ListeningQuestion[] = [
  // ── Level 1: Slow, Clear Conversations ──
  {
    id: 'cl-l1-1',
    moduleId: 'conversation-listening',
    level: 1,
    gameType: 'topic-identification',
    label: 'Topic Identification',
    prompt: 'Listen to the dialogue. What is the main topic?',
    audioText: 'Person A: I think we should update the company website. The design looks outdated. Person B: I agree. We could also add a blog section to share industry news. Person A: That\'s a great idea. Let\'s discuss the budget for it.',
    options: [
      'Hiring new staff',
      'Updating the company website',
      'Planning a corporate event',
      'Reviewing financial reports',
    ],
    correctAnswer: 'Updating the company website',
    explanation: 'Both speakers are discussing website updates — design refresh and adding a blog section.',
  },
  {
    id: 'cl-l1-2',
    moduleId: 'conversation-listening',
    level: 1,
    gameType: 'speaker-decision',
    label: 'Speaker Decision',
    prompt: 'Listen to the conversation. What decision did they make?',
    audioText: 'Person A: Should we hold the team meeting on Monday or Tuesday? Person B: Tuesday works better. Most of the team has client calls on Monday. Person A: Alright, let\'s go with Tuesday at 10 AM then.',
    options: [
      'Cancel the meeting entirely',
      'Hold the meeting on Monday',
      'Hold the meeting on Tuesday at 10 AM',
      'Postpone to next week',
    ],
    correctAnswer: 'Hold the meeting on Tuesday at 10 AM',
    explanation: 'Person A confirms "let\'s go with Tuesday at 10 AM" as the final decision.',
  },
  {
    id: 'cl-l1-3',
    moduleId: 'conversation-listening',
    level: 1,
    gameType: 'role-identification',
    label: 'Role Identification',
    prompt: 'Listen and identify who the speakers are.',
    audioText: 'Person A: Good morning. How can I help you? Person B: I\'d like to return this item. I purchased it last week but the size doesn\'t fit. Person A: Of course. Do you have the receipt? Person B: Yes, here it is.',
    options: [
      'Manager and employee',
      'Customer and store staff',
      'Student and teacher',
      'Doctor and patient',
    ],
    correctAnswer: 'Customer and store staff',
    explanation: 'Person A asks "How can I help you?" (staff), and Person B wants to return a purchase (customer).',
  },

  // ── Level 2: Natural-Speed Conversations ──
  {
    id: 'cl-l2-1',
    moduleId: 'conversation-listening',
    level: 2,
    gameType: 'problem-solution',
    label: 'Problem & Solution',
    prompt: 'Listen and identify the problem and the proposed solution.',
    audioText: 'Person A: We\'ve been getting a lot of complaints about the new software update. Users say it\'s too slow. Person B: I think we should roll back to the previous version while the engineering team works on optimizing the performance. Person A: Agreed. Let\'s communicate that to the users as well.',
    options: [
      'Problem: Slow software; Solution: Roll back to previous version',
      'Problem: Missing features; Solution: Add new modules',
      'Problem: Security breach; Solution: Update passwords',
      'Problem: Server downtime; Solution: Change hosting provider',
    ],
    correctAnswer: 'Problem: Slow software; Solution: Roll back to previous version',
    explanation: 'The problem is the slow software update, and the solution is rolling back while optimizing.',
  },
  {
    id: 'cl-l2-2',
    moduleId: 'conversation-listening',
    level: 2,
    gameType: 'opinion-matching',
    label: 'Opinion Matching',
    prompt: 'Listen and match each speaker to their opinion on remote work.',
    audioText: 'Person A: I believe remote work increases productivity. Employees save commute time and can focus better at home. Person B: I partially disagree. While some tasks are easier at home, collaboration and brainstorming sessions work much better in the office.',
    speakers: [
      { speaker: 'Person A', opinion: 'Remote work increases productivity' },
      { speaker: 'Person B', opinion: 'In-office collaboration is better' },
    ],
    correctAnswer: 'matched',
    explanation: 'Person A supports remote work for productivity; Person B values in-office collaboration.',
  },
  {
    id: 'cl-l2-3',
    moduleId: 'conversation-listening',
    level: 2,
    gameType: 'detail-extraction',
    label: 'Detail Extraction',
    prompt: 'Listen carefully and answer the specific detail question.',
    audioText: 'Person A: When does the new onboarding program start? Person B: It begins on March 3rd. The first week covers company culture and policies. The second week is hands-on training with the tools. Person A: Perfect. How many new hires are joining? Person B: We have twelve new team members starting.',
    options: [
      'Eight new team members',
      'Ten new team members',
      'Twelve new team members',
      'Fifteen new team members',
    ],
    correctAnswer: 'Twelve new team members',
    explanation: 'Person B specifically states "twelve new team members starting."',
  },

  // ── Level 3: Complex Discussions ──
  {
    id: 'cl-l3-1',
    moduleId: 'conversation-listening',
    level: 3,
    gameType: 'meeting-outcome',
    label: 'Meeting Outcome',
    prompt: 'Listen to the meeting discussion. What is the main outcome?',
    audioText: 'Person A: After reviewing the Q3 results, I think we need to increase our marketing budget by 20%. Person B: That\'s a significant increase. Can we justify it with projected returns? Person A: Based on our analysis, every dollar spent on digital marketing has returned three dollars in revenue. Person B: Alright, let\'s approve the 20% increase but set up monthly reviews to track performance.',
    options: [
      'The marketing budget was reduced',
      'They approved a 20% budget increase with monthly reviews',
      'They decided to pause marketing entirely',
      'They hired a new marketing agency',
    ],
    correctAnswer: 'They approved a 20% budget increase with monthly reviews',
    explanation: 'Person B approves the increase but adds a condition: monthly performance reviews.',
  },
  {
    id: 'cl-l3-2',
    moduleId: 'conversation-listening',
    level: 3,
    gameType: 'agree-disagree',
    label: 'Agreement Analysis',
    prompt: 'Listen to the discussion. Do the speakers agree, disagree, or partially agree on the topic of AI in hiring?',
    audioText: 'Person A: I think AI should be used to screen resumes. It saves time and reduces bias. Person B: I agree that AI can speed up the process, but I\'m concerned about algorithmic bias. We should always have a human review the final shortlist. Person A: That\'s fair. A hybrid approach would be the best solution.',
    options: [
      'Fully agree',
      'Fully disagree',
      'Partially agree',
    ],
    correctAnswer: 'Partially agree',
    explanation: 'Both see benefits in AI for hiring, but Person B raises concerns about bias. They settle on a hybrid approach — partial agreement.',
  },
  {
    id: 'cl-l3-3',
    moduleId: 'conversation-listening',
    level: 3,
    gameType: 'key-points',
    label: 'Key Points',
    prompt: 'Listen to the complex conversation. Select the THREE key points mentioned.',
    audioText: 'In today\'s strategy meeting, we discussed three priorities for next quarter. First, expanding into the European market, starting with Germany and France. Second, launching the mobile application by the end of April. Third, reducing operational costs by automating the invoice processing system. We also briefly mentioned hiring, but that will be addressed next month.',
    options: [
      'Expand into the European market',
      'Launch the mobile application',
      'Hire 50 new employees',
      'Automate invoice processing',
      'Relocate the headquarters',
      'Rebrand the company',
    ],
    correctKeys: [
      'Expand into the European market',
      'Launch the mobile application',
      'Automate invoice processing',
    ],
    correctAnswer: 'multi-select',
    explanation: 'The three priorities are: European expansion, mobile app launch, and automating invoice processing. Hiring was mentioned as a future topic.',
  },
];

// ════════════════════════════════════════════════
// MODULE 12: Talks & Explanations
// ════════════════════════════════════════════════

export const talksExplanationsQuestions: ListeningQuestion[] = [
  // ── Level 1: Short Explanations ──
  {
    id: 'te-l1-1',
    moduleId: 'talks-explanations',
    level: 1,
    gameType: 'main-idea-selection',
    label: 'Main Idea',
    prompt: 'Listen to the explanation and select the main idea.',
    audioText: 'Cloud computing allows businesses to store and access data over the internet instead of local servers. This reduces costs and provides flexibility for teams working remotely.',
    options: [
      'Cloud computing is expensive and unreliable',
      'Cloud computing enables internet-based data storage, reducing costs and improving flexibility',
      'Cloud computing requires dedicated local servers',
      'Cloud computing is only useful for large corporations',
    ],
    correctAnswer: 'Cloud computing enables internet-based data storage, reducing costs and improving flexibility',
    explanation: 'The explanation highlights two benefits: cost reduction and remote work flexibility.',
  },
  {
    id: 'te-l1-2',
    moduleId: 'talks-explanations',
    level: 1,
    gameType: 'fact-identification',
    label: 'Fact Check',
    prompt: 'Listen and choose the correct fact mentioned.',
    audioText: 'According to a recent study, companies that invest in employee training see a 24% increase in productivity. The study surveyed over 500 organizations across 12 countries.',
    options: [
      'Training increases productivity by 50%',
      'Training increases productivity by 24%',
      'The study surveyed 200 organizations',
      'The study was conducted in one country',
    ],
    correctAnswer: 'Training increases productivity by 24%',
    explanation: 'The audio specifically states a "24% increase in productivity."',
  },
  {
    id: 'te-l1-3',
    moduleId: 'talks-explanations',
    level: 1,
    gameType: 'topic-matching',
    label: 'Topic Match',
    prompt: 'Listen to the short talk and match it to the correct topic title.',
    audioText: 'Artificial intelligence is transforming the healthcare industry. From diagnosing diseases to personalizing treatment plans, AI tools are helping doctors make faster and more accurate decisions.',
    options: [
      'AI in Manufacturing',
      'AI in Healthcare',
      'AI in Education',
      'AI in Finance',
    ],
    correctAnswer: 'AI in Healthcare',
    explanation: 'The talk discusses AI in the context of diagnosing diseases and treatment plans — healthcare.',
  },

  // ── Level 2: Structured Talks ──
  {
    id: 'te-l2-1',
    moduleId: 'talks-explanations',
    level: 2,
    gameType: 'section-questions',
    label: 'Structured Analysis',
    prompt: 'Listen to the structured talk and answer the questions.',
    audioText: 'Today I want to talk about the benefits of agile project management. The main idea is that agile allows teams to deliver work in small, manageable increments. This approach improves communication between team members and stakeholders. As a supporting detail, companies using agile report a 30% faster time-to-market compared to traditional methods.',
    subQuestions: [
      {
        question: 'What is the main idea?',
        options: [
          'Agile is too complex for small teams',
          'Agile delivers work in small increments',
          'Agile replaces all communication tools',
          'Agile slows down product delivery',
        ],
        correctAnswer: 'Agile delivers work in small increments',
      },
      {
        question: 'What supporting detail is given?',
        options: [
          '50% cost reduction',
          '30% faster time-to-market',
          'Teams work fewer hours',
          'No meetings are needed',
        ],
        correctAnswer: '30% faster time-to-market',
      },
    ],
    correctAnswer: 'all-sub-questions',
    explanation: 'The talk states agile delivers in increments (main idea) and provides a 30% time-to-market stat (detail).',
  },
  {
    id: 'te-l2-2',
    moduleId: 'talks-explanations',
    level: 2,
    gameType: 'order-of-points',
    label: 'Point Order',
    prompt: 'Listen to the explanation and arrange the points in the correct order.',
    audioText: 'The process of launching a startup involves several stages. First, you need to validate your business idea through market research. Next, create a minimum viable product to test with early users. After that, secure funding from investors or through bootstrapping. Finally, scale your operations based on user feedback and demand.',
    steps: [
      'Validate business idea through market research',
      'Create a minimum viable product',
      'Secure funding',
      'Scale operations based on feedback',
    ],
    correctOrder: [
      'Validate business idea through market research',
      'Create a minimum viable product',
      'Secure funding',
      'Scale operations based on feedback',
    ],
    correctAnswer: 'correct-order',
    explanation: 'The startup process follows: validate → build MVP → fund → scale.',
  },
  {
    id: 'te-l2-3',
    moduleId: 'talks-explanations',
    level: 2,
    gameType: 'cause-effect',
    label: 'Cause & Effect',
    prompt: 'Listen and identify the cause-effect relationship.',
    audioText: 'Due to the global chip shortage, many automobile manufacturers experienced production delays. This led to a significant increase in used car prices, as consumers turned to the pre-owned market when new vehicles were unavailable.',
    options: [
      'Cause: High fuel prices; Effect: Lower car sales',
      'Cause: Chip shortage; Effect: Production delays and rising used car prices',
      'Cause: New car models; Effect: Decrease in used car demand',
      'Cause: Trade agreements; Effect: More imports',
    ],
    correctAnswer: 'Cause: Chip shortage; Effect: Production delays and rising used car prices',
    explanation: 'The chip shortage (cause) led to production delays and increased used car prices (effects).',
  },

  // ── Level 3: Detailed Presentations ──
  {
    id: 'te-l3-1',
    moduleId: 'talks-explanations',
    level: 3,
    gameType: 'presentation-summary',
    label: 'Presentation Summary',
    prompt: 'Listen to the presentation and choose the best summary.',
    audioText: 'Good morning, everyone. Today I will present our sustainability initiative for 2025. Our company has committed to reducing carbon emissions by 40% over the next three years. We plan to achieve this through three main strategies: switching to renewable energy sources for all our facilities, implementing a zero-waste policy in manufacturing, and transitioning our delivery fleet to electric vehicles. Early estimates suggest these changes will save the company approximately 2 million dollars annually while significantly reducing our environmental footprint.',
    options: [
      'The company will increase production capacity by 40% using new technology.',
      'The company plans to cut carbon emissions by 40% through renewable energy, zero-waste manufacturing, and electric vehicles, saving $2M annually.',
      'The company will hire more sustainability experts next year.',
      'The presentation focused on increasing employee benefits and remote work options.',
    ],
    correctAnswer: 'The company plans to cut carbon emissions by 40% through renewable energy, zero-waste manufacturing, and electric vehicles, saving $2M annually.',
    explanation: 'The summary captures the goal (40% emission reduction), three strategies, and the financial benefit ($2M savings).',
  },
  {
    id: 'te-l3-2',
    moduleId: 'talks-explanations',
    level: 3,
    gameType: 'data-extraction',
    label: 'Data Extraction',
    prompt: 'Listen and select the correct data mentioned in the talk.',
    audioText: 'Our user base grew from 1.2 million to 3.5 million in the last fiscal year, representing a 192% increase. The Asia-Pacific region contributed 45% of new sign-ups, while Europe accounted for 30%. Revenue per user increased from 8 dollars to 12 dollars, and overall annual revenue reached 42 million dollars.',
    options: [
      'User base grew to 2.5 million with 150% increase',
      'Asia-Pacific contributed 30% of new sign-ups',
      'Annual revenue reached 42 million dollars',
      'Revenue per user decreased to 6 dollars',
    ],
    correctAnswer: 'Annual revenue reached 42 million dollars',
    explanation: 'The audio states "overall annual revenue reached 42 million dollars."',
  },
  {
    id: 'te-l3-3',
    moduleId: 'talks-explanations',
    level: 3,
    gameType: 'opinion-vs-fact',
    label: 'Opinion vs Fact',
    prompt: 'Listen to the presentation and classify each statement as Fact or Opinion.',
    audioText: 'Remote work has become standard in the tech industry. A survey by Global Workforce Analytics found that 78% of tech companies now offer full-time remote options. I believe this trend will make traditional offices obsolete within a decade. Additionally, remote workers report 13% higher productivity according to Stanford research. However, in my view, the lack of in-person interaction will eventually harm company culture.',
    statements: [
      { text: '78% of tech companies offer full-time remote options', type: 'fact' as const },
      { text: 'Traditional offices will become obsolete within a decade', type: 'opinion' as const },
      { text: 'Remote workers report 13% higher productivity', type: 'fact' as const },
      { text: 'Lack of in-person interaction will harm company culture', type: 'opinion' as const },
    ],
    correctAnswer: 'all-classified',
    explanation: 'Statistics from surveys/research are facts. Predictions ("I believe", "in my view") are opinions.',
  },
];

/** Get questions for a specific listening module + level */
export const getListeningQuestions = (moduleId: string, level: 1 | 2 | 3): ListeningQuestion[] => {
  const allQuestions = [
    ...basicListeningQuestions,
    ...conversationListeningQuestions,
    ...talksExplanationsQuestions,
  ];
  return allQuestions.filter(q => q.moduleId === moduleId && q.level === level);
};
