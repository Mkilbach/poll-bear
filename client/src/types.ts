export type Screen = 'auth' | 'dashboard' | 'create' | 'vote' | 'results';

export interface Poll {
  id: string;
  title: string;
  question: string;
  options: string[];
  votes: number[];
  status: 'open' | 'closed';
  created: string;
  totalVotes: number;
  myVote?: number;
}
