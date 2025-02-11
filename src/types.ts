export interface GameState {
  subject: string;
  letter: string;
  isPlaying: boolean;
  timeRemaining: number;
  selectedTime: number;
  score: number;
  showSummary: boolean;
}

export const SUBJECTS = [
  'Animals',
  'Countries',
  'Cities',
  'Food',
  'Movies',
  'TV Shows',
  'Sports',
  'Professions',
  'Names',
  'Brands',
  'Songs',
  'Bands',
  'Books',
  'Superheroes',
  'Video Games',
  'Cartoon Characters',
  'Things That Are Red',
  'Things That Float',
  'Things That Are Soft',
  'Things Found in Space',
  'Things at the Beach',
  'Things That Make Noise',
  'Things in a Kitchen',
  'Things That Are Scary',
  'Fictional Places',
  'Famous Buildings',
  'School Subjects',
  'Things You Can Drink',
  'Things That Fly',
  'Things That Are Square'
];

export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const TIME_OPTIONS = [
  { label: '2 minutes', value: 120 },
  { label: '5 minutes', value: 300 }
];