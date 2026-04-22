import { useState, useCallback } from 'react';
import type { Screen, Poll } from './types';
import TopNav from './components/TopNav';
import AuthScreen from './screens/AuthScreen';
import DashboardScreen from './screens/DashboardScreen';
import CreatePollScreen from './screens/CreatePollScreen';
import VoteScreen from './screens/VoteScreen';
import ResultsScreen from './screens/ResultsScreen';

const INIT_MY_POLLS: Poll[] = [
  { id: 'm1', title: 'Team Lunch Spot', question: 'Where should we go for our next team lunch?',
    options: ['Italian', 'Japanese', 'Mexican', 'Thai', 'BBQ'],
    votes: [14, 9, 5, 11, 3], status: 'open', created: 'Apr 18', totalVotes: 42 },
  { id: 'm2', title: 'Sprint Planning Day', question: 'Which day works best for sprint planning?',
    options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    votes: [4, 16, 8, 2], status: 'open', created: 'Apr 20', totalVotes: 30 },
  { id: 'm3', title: 'Office Background Music', question: 'What kind of music do you prefer in the office?',
    options: ['Lo-fi / Chill', 'Jazz', 'Pop', 'No music'],
    votes: [20, 6, 5, 13], status: 'closed', created: 'Apr 10', totalVotes: 44 },
];

const INIT_VOTED_POLLS: Poll[] = [
  { id: 'v1', title: 'Company Rebrand Name', question: 'Which name do you prefer for the rebrand?',
    options: ['NovaSpark', 'Luminary', 'Axiom', 'Clearpath'],
    votes: [25, 16, 9, 20], status: 'open', created: 'Apr 15', totalVotes: 70, myVote: 0 },
  { id: 'v2', title: 'Product Launch Month', question: 'When should we launch the new product?',
    options: ['May', 'June', 'July', 'August'],
    votes: [9, 24, 15, 6], status: 'closed', created: 'Apr 5', totalVotes: 54, myVote: 1 },
];

export default function App() {
  const [screen, setScreen]           = useState<Screen>(() => (localStorage.getItem('pb_screen') as Screen) || 'auth');
  const [currentPoll, setCurrentPoll] = useState<Poll | null>(null);
  const [myPolls, setMyPolls]         = useState<Poll[]>(INIT_MY_POLLS);
  const [votedPolls, setVotedPolls]   = useState<Poll[]>(INIT_VOTED_POLLS);

  const goTo = useCallback((s: Screen) => {
    localStorage.setItem('pb_screen', s);
    setScreen(s);
  }, []);

  const onLogin  = () => goTo('dashboard');
  const onLogout = () => goTo('auth');

  const onCreated = (poll: Poll) => {
    setMyPolls(p => [poll, ...p]);
    setCurrentPoll(poll);
    goTo('results');
  };

  const onVote = (updatedPoll: Poll) => {
    setVotedPolls(p => {
      const exists = p.find(x => x.id === updatedPoll.id);
      return exists ? p.map(x => x.id === updatedPoll.id ? updatedPoll : x) : [updatedPoll, ...p];
    });
  };

  const onClose  = (id: string) => setMyPolls(p => p.map(x => x.id === id ? { ...x, status: 'closed' } : x));
  const onDelete = (id: string) => setMyPolls(p => p.filter(x => x.id !== id));

  const activePoll = currentPoll || INIT_MY_POLLS[0];

  return (
    <div style={{ minHeight: '100vh' }}>
      {screen !== 'auth' && <TopNav goTo={goTo} onLogout={onLogout} />}

      {screen === 'auth'      && <AuthScreen onLogin={onLogin} />}
      {screen === 'dashboard' && (
        <DashboardScreen goTo={goTo} setCurrentPoll={setCurrentPoll} myPolls={myPolls} votedPolls={votedPolls} />
      )}
      {screen === 'create' && (
        <CreatePollScreen goTo={goTo} onCreated={onCreated} />
      )}
      {screen === 'vote' && (
        <VoteScreen poll={currentPoll || INIT_VOTED_POLLS[0]} goTo={goTo} onVote={onVote} setCurrentPoll={setCurrentPoll} />
      )}
      {screen === 'results' && (
        <ResultsScreen
          poll={activePoll}
          goTo={goTo}
          owned={myPolls.some(p => p.id === activePoll.id)}
          onClose={onClose}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
