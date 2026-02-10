/**
 * Reading Module Questions — 3 modules × 3 levels × 3 unique tasks each
 */

export interface ReadingQuestion {
  id: string;
  moduleId: string;
  level: 1 | 2 | 3;
  gameType:
    | 'meaning-selection'
    | 'context-word-choice'
    | 'sentence-purpose'
    | 'main-idea-detection'
    | 'supporting-detail'
    | 'best-title'
    | 'tone-identification'
    | 'inference-question'
    | 'best-summary'
    | 'correct-action'
    | 'first-step'
    | 'true-false-not-mentioned'
    | 'step-arrangement'
    | 'missing-step'
    | 'situation-instruction-match'
    | 'email-intent'
    | 'policy-application'
    | 'decision-reading'
    | 'topic-identification'
    | 'fact-vs-opinion'
    | 'keyword-identification'
    | 'cause-and-effect'
    | 'supporting-evidence'
    | 'paragraph-role'
    | 'argument-strength'
    | 'author-intention'
    | 'complex-summary';
  label: string;
  prompt: string;
  /** The text passage/sentence to read */
  passage: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  /** For step-arrangement: items to drag */
  steps?: string[];
  correctOrder?: string[];
  /** For situation-instruction-match */
  matchItems?: { situation: string; instruction: string }[];
  /** For fact-vs-opinion */
  statement?: string;
  statementType?: 'fact' | 'opinion';
  /** For true-false-not-mentioned */
  tfStatement?: string;
}

// ════════════════════════════════════════════════
// MODULE 7: Sentence & Short Text Reading
// ════════════════════════════════════════════════

export const sentenceReadingQuestions: ReadingQuestion[] = [
  // ── Level 1: Sentence Meaning & Context ──
  {
    id: 'sr-l1-1',
    moduleId: 'sentence-reading',
    level: 1,
    gameType: 'meaning-selection',
    label: 'Meaning Selection',
    prompt: 'Select the closest meaning of this sentence.',
    passage: 'Please ensure the report is submitted before 5 PM.',
    options: [
      'Submit the report by 5 PM',
      'Start working on the report at 5 PM',
      'Ignore the report after 5 PM',
      'Submit the report next week',
    ],
    correctAnswer: 'Submit the report by 5 PM',
    explanation: '"Ensure... submitted before 5 PM" means the report must be turned in by that time.',
  },
  {
    id: 'sr-l1-2',
    moduleId: 'sentence-reading',
    level: 1,
    gameType: 'context-word-choice',
    label: 'Context Word Choice',
    prompt: 'Choose the best word to complete the sentence.',
    passage: 'The manager appreciated her ______ response to the client\'s issue.',
    options: ['careless', 'delayed', 'prompt', 'confusing'],
    correctAnswer: 'prompt',
    explanation: '"Appreciated" implies something positive. "Prompt" (quick, timely) fits best in a professional context.',
  },
  {
    id: 'sr-l1-3',
    moduleId: 'sentence-reading',
    level: 1,
    gameType: 'sentence-purpose',
    label: 'Sentence Purpose',
    prompt: 'What is the purpose of this sentence?',
    passage: 'Kindly review the attached document and share your feedback.',
    options: [
      'Giving information',
      'Making a request',
      'Giving an opinion',
      'Giving instructions',
    ],
    correctAnswer: 'Making a request',
    explanation: '"Kindly review" and "share your feedback" are polite request phrases.',
  },

  // ── Level 2: Short Paragraph Understanding ──
  {
    id: 'sr-l2-1',
    moduleId: 'sentence-reading',
    level: 2,
    gameType: 'main-idea-detection',
    label: 'Main Idea',
    prompt: 'What is the main idea of this paragraph?',
    passage: 'Remote work has transformed the modern workplace. Companies are investing in digital tools to support distributed teams. While remote work offers flexibility, it also presents challenges in maintaining team collaboration and company culture. Organizations must find a balance between remote and in-office work to maximize productivity.',
    options: [
      'Remote work has completely replaced office work',
      'Remote work is transforming workplaces with both benefits and challenges',
      'All companies reject remote work',
      'Digital tools are unnecessary for modern teams',
    ],
    correctAnswer: 'Remote work is transforming workplaces with both benefits and challenges',
    explanation: 'The paragraph discusses transformation, benefits (flexibility), and challenges (collaboration), suggesting balance.',
  },
  {
    id: 'sr-l2-2',
    moduleId: 'sentence-reading',
    level: 2,
    gameType: 'supporting-detail',
    label: 'Supporting Detail',
    prompt: 'Which statement is supported by the text?',
    passage: 'The marketing team launched a new social media campaign last quarter. As a result, website traffic increased by 35%, and the company gained 2,000 new newsletter subscribers. The team plans to expand the campaign to include video content in the next quarter.',
    options: [
      'The campaign caused website traffic to drop',
      'The company gained 2,000 new newsletter subscribers',
      'Video content was already part of the campaign',
      'The marketing budget was reduced',
    ],
    correctAnswer: 'The company gained 2,000 new newsletter subscribers',
    explanation: 'The text explicitly states the company "gained 2,000 new newsletter subscribers."',
  },
  {
    id: 'sr-l2-3',
    moduleId: 'sentence-reading',
    level: 2,
    gameType: 'best-title',
    label: 'Best Title',
    prompt: 'Choose the most suitable title for this paragraph.',
    passage: 'Effective time management is crucial for professional success. By prioritizing tasks, setting realistic deadlines, and minimizing distractions, professionals can significantly increase their output. Studies show that employees who use structured planning tools complete 25% more tasks per week.',
    options: [
      'The Decline of Workplace Productivity',
      'How Time Management Boosts Professional Success',
      'Why Employees Should Work Longer Hours',
      'The History of Planning Tools',
    ],
    correctAnswer: 'How Time Management Boosts Professional Success',
    explanation: 'The paragraph focuses on time management techniques and their positive impact on professional output.',
  },

  // ── Level 3: Reasoning & Interpretation ──
  {
    id: 'sr-l3-1',
    moduleId: 'sentence-reading',
    level: 3,
    gameType: 'tone-identification',
    label: 'Tone Identification',
    prompt: 'What is the tone of this passage?',
    passage: 'While the company has made some progress in diversity hiring, the numbers still fall short of industry benchmarks. The current initiatives, though well-intentioned, lack the structural support needed for meaningful change. Without significant investment in inclusive practices, the gap will only widen.',
    options: ['Neutral', 'Critical', 'Persuasive', 'Informative'],
    correctAnswer: 'Critical',
    explanation: 'Phrases like "fall short," "lack structural support," and "gap will only widen" indicate a critical tone.',
  },
  {
    id: 'sr-l3-2',
    moduleId: 'sentence-reading',
    level: 3,
    gameType: 'inference-question',
    label: 'Inference',
    prompt: 'What can be inferred from this passage?',
    passage: 'The CEO announced a company-wide restructuring. Several departments will be merged, and some positions will be eliminated. Employees were asked to update their profiles on the internal career portal. The HR team has scheduled individual meetings with affected team members next week.',
    options: [
      'The company is expanding and hiring more people',
      'Some employees may lose their jobs or be reassigned',
      'All departments will remain unchanged',
      'The CEO is planning to retire',
    ],
    correctAnswer: 'Some employees may lose their jobs or be reassigned',
    explanation: '"Positions eliminated," "update profiles on career portal," and "meetings with affected members" all imply job changes.',
  },
  {
    id: 'sr-l3-3',
    moduleId: 'sentence-reading',
    level: 3,
    gameType: 'best-summary',
    label: 'Best Summary',
    prompt: 'Select the most accurate summary.',
    passage: 'Artificial intelligence is rapidly changing the recruitment process. Automated screening tools can analyze thousands of resumes in minutes, identifying top candidates based on skills and experience. However, critics argue that these tools may inadvertently discriminate against certain groups. Companies must therefore implement regular audits of their AI systems to ensure fairness and transparency in hiring.',
    options: [
      'AI has completely replaced human recruiters in all companies.',
      'AI speeds up resume screening but may introduce bias, requiring regular audits for fair hiring.',
      'Critics have successfully banned AI from recruitment processes.',
      'AI only works for large corporations with extensive resources.',
    ],
    correctAnswer: 'AI speeds up resume screening but may introduce bias, requiring regular audits for fair hiring.',
    explanation: 'The summary captures the benefit (speed), the risk (bias), and the solution (audits).',
  },
];

// ════════════════════════════════════════════════
// MODULE 8: Information & Instruction Reading
// ════════════════════════════════════════════════

export const informationReadingQuestions: ReadingQuestion[] = [
  // ── Level 1: Basic Instruction Tasks ──
  {
    id: 'ir-l1-1',
    moduleId: 'information-reading',
    level: 1,
    gameType: 'correct-action',
    label: 'Correct Action',
    prompt: 'What should you do based on this instruction?',
    passage: 'Submit your ID at the reception before entering the building.',
    options: [
      'Go directly inside',
      'Submit ID at reception first',
      'Wait outside the building',
      'Call the manager',
    ],
    correctAnswer: 'Submit ID at reception first',
    explanation: 'The instruction clearly states to submit ID at reception before entering.',
  },
  {
    id: 'ir-l1-2',
    moduleId: 'information-reading',
    level: 1,
    gameType: 'first-step',
    label: 'First Step',
    prompt: 'What should be done first?',
    passage: 'To request time off: First, check the team calendar for conflicts. Then, fill out the leave request form. After approval from your manager, update your status in the HR portal.',
    options: [
      'Fill out the leave request form',
      'Update your status in the HR portal',
      'Check the team calendar for conflicts',
      'Get approval from your manager',
    ],
    correctAnswer: 'Check the team calendar for conflicts',
    explanation: 'The instruction says "First, check the team calendar for conflicts."',
  },
  {
    id: 'ir-l1-3',
    moduleId: 'information-reading',
    level: 1,
    gameType: 'true-false-not-mentioned',
    label: 'True / False / Not Mentioned',
    prompt: 'Is this statement True, False, or Not Mentioned?',
    passage: 'All employees must complete the cybersecurity training by March 31st. The training is available online through the learning portal. Certificates will be issued upon completion.',
    tfStatement: 'The training can be completed in person at the office.',
    options: ['True', 'False', 'Not Mentioned'],
    correctAnswer: 'Not Mentioned',
    explanation: 'The text says the training is "available online" but doesn\'t mention in-person options — so it\'s not mentioned.',
  },

  // ── Level 2: Multi-Step Process Reading ──
  {
    id: 'ir-l2-1',
    moduleId: 'information-reading',
    level: 2,
    gameType: 'step-arrangement',
    label: 'Step Arrangement',
    prompt: 'Arrange these steps in the correct order.',
    passage: 'To process a customer refund: Verify the customer\'s purchase receipt. Then log the refund request in the system. Next, get approval from the floor manager. Finally, process the refund through the payment terminal.',
    steps: [
      'Verify the purchase receipt',
      'Log the refund request in the system',
      'Get approval from the floor manager',
      'Process the refund through the terminal',
    ],
    correctOrder: [
      'Verify the purchase receipt',
      'Log the refund request in the system',
      'Get approval from the floor manager',
      'Process the refund through the terminal',
    ],
    correctAnswer: 'correct-order',
    explanation: 'The process follows: verify → log → approve → process.',
  },
  {
    id: 'ir-l2-2',
    moduleId: 'information-reading',
    level: 2,
    gameType: 'missing-step',
    label: 'Missing Step',
    prompt: 'Which step is missing from this process?',
    passage: 'Steps for onboarding a new employee: 1) Send welcome email with login credentials. 2) _______ 3) Assign a mentor for the first month. 4) Schedule a 30-day performance check-in.',
    options: [
      'Conduct exit interview',
      'Set up workstation and access to company tools',
      'Plan the company holiday party',
      'Review annual budget reports',
    ],
    correctAnswer: 'Set up workstation and access to company tools',
    explanation: 'After login credentials, the logical next step is setting up their workspace before assigning a mentor.',
  },
  {
    id: 'ir-l2-3',
    moduleId: 'information-reading',
    level: 2,
    gameType: 'situation-instruction-match',
    label: 'Situation Match',
    prompt: 'Match each situation to the correct instruction.',
    passage: '',
    matchItems: [
      { situation: 'Fire alarm sounds in the building', instruction: 'Evacuate immediately using the nearest stairwell' },
      { situation: 'You receive a suspicious email', instruction: 'Do not click any links and report to IT security' },
      { situation: 'A visitor arrives without an appointment', instruction: 'Direct them to the reception desk to register' },
    ],
    correctAnswer: 'all-matched',
    explanation: 'Each workplace situation has a specific standard protocol to follow.',
  },

  // ── Level 3: Workplace Text Analysis ──
  {
    id: 'ir-l3-1',
    moduleId: 'information-reading',
    level: 3,
    gameType: 'email-intent',
    label: 'Email Intent',
    prompt: 'What is the purpose of this email?',
    passage: 'Subject: Updated Meeting Schedule\n\nDear Team,\n\nPlease note that the weekly status meeting has been moved from Monday 10 AM to Wednesday 2 PM, effective immediately. This change is to accommodate the new client review sessions scheduled on Monday mornings. Please update your calendars accordingly.\n\nBest regards,\nProject Manager',
    options: [
      'Request for vacation approval',
      'Complaint about workload',
      'Schedule update notification',
      'Invitation to a team outing',
    ],
    correctAnswer: 'Schedule update notification',
    explanation: 'The email informs the team about a meeting time change — it\'s a schedule update.',
  },
  {
    id: 'ir-l3-2',
    moduleId: 'information-reading',
    level: 3,
    gameType: 'policy-application',
    label: 'Policy Application',
    prompt: 'Based on this policy, what should the employee do?',
    passage: 'Company Travel Policy: All business trips must be approved by the department head at least 5 business days in advance. Employees must book economy class for domestic flights and may request business class for international flights exceeding 6 hours. All receipts must be submitted within 7 days of return.',
    options: [
      'Book any flight class without approval',
      'Submit receipts within 30 days',
      'Get department head approval 5 business days before travel',
      'Only travel internationally',
    ],
    correctAnswer: 'Get department head approval 5 business days before travel',
    explanation: 'The policy requires approval "at least 5 business days in advance."',
  },
  {
    id: 'ir-l3-3',
    moduleId: 'information-reading',
    level: 3,
    gameType: 'decision-reading',
    label: 'Decision Reading',
    prompt: 'What is the best decision based on this notice?',
    passage: 'Notice: The office parking lot will be closed for maintenance from March 15-20. Alternative parking is available at the garage on Oak Street (free shuttle service provided) or employees may use public transit with reimbursement up to $15/day during this period.',
    options: [
      'Park in the office lot as usual',
      'Use Oak Street garage with shuttle or public transit with reimbursement',
      'Work from home all week without informing anyone',
      'Drive to a different office branch',
    ],
    correctAnswer: 'Use Oak Street garage with shuttle or public transit with reimbursement',
    explanation: 'The notice provides two alternatives: Oak Street garage (with shuttle) or public transit (with $15/day reimbursement).',
  },
];

// ════════════════════════════════════════════════
// MODULE 9: Knowledge & Idea Reading
// ════════════════════════════════════════════════

export const knowledgeReadingQuestions: ReadingQuestion[] = [
  // ── Level 1: Idea Recognition ──
  {
    id: 'kr-l1-1',
    moduleId: 'knowledge-reading',
    level: 1,
    gameType: 'topic-identification',
    label: 'Topic Identification',
    prompt: 'What is this paragraph mainly about?',
    passage: 'The global shift to renewable energy is accelerating. Solar and wind power installations have doubled in the past five years, driven by decreasing costs and government incentives. Many countries now generate over 30% of their electricity from renewable sources.',
    options: [
      'The decline of renewable energy',
      'The growth of renewable energy worldwide',
      'The history of fossil fuels',
      'Government corruption in the energy sector',
    ],
    correctAnswer: 'The growth of renewable energy worldwide',
    explanation: 'The paragraph discusses the acceleration and doubling of renewable energy — it\'s about growth.',
  },
  {
    id: 'kr-l1-2',
    moduleId: 'knowledge-reading',
    level: 1,
    gameType: 'fact-vs-opinion',
    label: 'Fact or Opinion',
    prompt: 'Is this statement a fact or an opinion?',
    passage: '',
    statement: 'Electric vehicles will completely replace gasoline cars within the next decade.',
    options: ['Fact', 'Opinion'],
    correctAnswer: 'Opinion',
    explanation: 'This is a prediction about the future, not a verifiable fact. It reflects a belief, not proven data.',
  },
  {
    id: 'kr-l1-3',
    moduleId: 'knowledge-reading',
    level: 1,
    gameType: 'keyword-identification',
    label: 'Key Concept',
    prompt: 'What is the most important keyword in this paragraph?',
    passage: 'Data privacy has become a major concern for consumers and businesses alike. With increasing data breaches and stricter regulations like GDPR, companies must prioritize protecting personal information to maintain customer trust.',
    options: ['Regulations', 'Data privacy', 'Customer trust', 'GDPR'],
    correctAnswer: 'Data privacy',
    explanation: '"Data privacy" is the central concept — the entire paragraph revolves around it.',
  },

  // ── Level 2: Idea & Detail Analysis ──
  {
    id: 'kr-l2-1',
    moduleId: 'knowledge-reading',
    level: 2,
    gameType: 'cause-and-effect',
    label: 'Cause & Effect',
    prompt: 'What caused the situation described?',
    passage: 'Due to supply chain disruptions caused by the pandemic, many retailers experienced severe inventory shortages. This led to increased prices for consumer goods and longer delivery times for online orders.',
    options: [
      'Increased consumer spending',
      'Supply chain disruptions from the pandemic',
      'New government tax policies',
      'Decreased manufacturing costs',
    ],
    correctAnswer: 'Supply chain disruptions from the pandemic',
    explanation: 'The passage clearly states "supply chain disruptions caused by the pandemic" as the cause.',
  },
  {
    id: 'kr-l2-2',
    moduleId: 'knowledge-reading',
    level: 2,
    gameType: 'supporting-evidence',
    label: 'Supporting Evidence',
    prompt: 'Which statement best supports the claim?',
    passage: 'Claim: Flexible work arrangements improve employee satisfaction.\n\nA recent Gallup survey found that 67% of employees with flexible schedules reported higher job satisfaction compared to only 43% of those with rigid 9-to-5 schedules.',
    options: [
      'Most employees prefer working at night',
      '67% of employees with flexible schedules report higher satisfaction vs. 43% with rigid schedules',
      'Flexible work was banned by most companies in 2023',
      'Employees with rigid schedules earn more money',
    ],
    correctAnswer: '67% of employees with flexible schedules report higher satisfaction vs. 43% with rigid schedules',
    explanation: 'The survey data directly supports the claim with comparative statistics.',
  },
  {
    id: 'kr-l2-3',
    moduleId: 'knowledge-reading',
    level: 2,
    gameType: 'paragraph-role',
    label: 'Paragraph Role',
    prompt: 'What is the role of this paragraph in an article?',
    passage: 'For instance, a mid-sized software company in Berlin implemented a four-day work week in 2023. Within six months, employee productivity increased by 20%, and turnover decreased by 35%. This case demonstrates the practical benefits of reduced work hours.',
    options: ['Introduction', 'Example', 'Explanation', 'Conclusion'],
    correctAnswer: 'Example',
    explanation: '"For instance" signals that this is an example supporting a larger argument.',
  },

  // ── Level 3: Advanced Analytical Reading ──
  {
    id: 'kr-l3-1',
    moduleId: 'knowledge-reading',
    level: 3,
    gameType: 'argument-strength',
    label: 'Argument Strength',
    prompt: 'Which conclusion is best supported by this argument?',
    passage: 'Research consistently shows that diverse teams outperform homogeneous ones. A McKinsey study found that companies in the top quartile for gender diversity were 25% more likely to achieve above-average profitability. Furthermore, diverse perspectives lead to more innovative solutions and better decision-making.',
    options: [
      'Diversity has no impact on business performance',
      'Companies should invest in diversity to improve profitability and innovation',
      'Only gender diversity matters for business success',
      'Homogeneous teams are more efficient',
    ],
    correctAnswer: 'Companies should invest in diversity to improve profitability and innovation',
    explanation: 'The evidence supports that diversity leads to both financial and creative benefits.',
  },
  {
    id: 'kr-l3-2',
    moduleId: 'knowledge-reading',
    level: 3,
    gameType: 'author-intention',
    label: 'Author\'s Intention',
    prompt: 'Why did the author write this passage?',
    passage: 'The current education system fails to prepare students for the modern workforce. While schools focus on memorization and standardized tests, employers increasingly value critical thinking, creativity, and adaptability. It is time for a fundamental reform of how we educate the next generation.',
    options: [
      'To inform about test scores',
      'To persuade readers that education reform is needed',
      'To criticize individual teachers',
      'To explain the history of education',
    ],
    correctAnswer: 'To persuade readers that education reform is needed',
    explanation: '"Fails to prepare," "it is time for fundamental reform" — the author is arguing for change.',
  },
  {
    id: 'kr-l3-3',
    moduleId: 'knowledge-reading',
    level: 3,
    gameType: 'complex-summary',
    label: 'Complex Summary',
    prompt: 'Select the best summary of this passage.',
    passage: 'The gig economy has created new opportunities for workers seeking flexibility, but it has also raised concerns about job security and benefits. Independent contractors often lack health insurance, paid leave, and retirement plans. Some governments are introducing legislation to classify gig workers as employees, which would entitle them to traditional benefits. However, companies argue this would increase costs and reduce the flexibility that makes gig work attractive.',
    options: [
      'The gig economy has been banned in most countries.',
      'The gig economy offers flexibility but lacks worker protections, prompting debate over classification and benefits legislation.',
      'All gig workers now receive full employee benefits.',
      'Companies fully support new gig worker legislation.',
    ],
    correctAnswer: 'The gig economy offers flexibility but lacks worker protections, prompting debate over classification and benefits legislation.',
    explanation: 'The summary captures the trade-off (flexibility vs. protections) and the ongoing debate.',
  },
];

/** Get questions for a specific reading module + level */
export const getReadingQuestions = (moduleId: string, level: 1 | 2 | 3): ReadingQuestion[] => {
  const allQuestions = [
    ...sentenceReadingQuestions,
    ...informationReadingQuestions,
    ...knowledgeReadingQuestions,
  ];
  return allQuestions.filter(q => q.moduleId === moduleId && q.level === level);
};
