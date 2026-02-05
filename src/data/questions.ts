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
 
 export const getQuestionsForGame = (gameType: string): Question[] => {
   switch (gameType) {
     case 'fill-blanks':
       return fillBlanksQuestions;
     case 'sentence-correction':
       return sentenceCorrectionQuestions;
     case 'word-order':
       return wordOrderQuestions;
     default:
       return fillBlanksQuestions;
   }
 };