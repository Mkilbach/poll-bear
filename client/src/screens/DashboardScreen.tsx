import { useState } from 'react';
import type { Poll, Screen } from '../types';
import { TEXT, MUTED, NAVY, WHITE, BORDER } from '../tokens';
import BearLogo from '../components/BearLogo';
import Btn from '../components/Btn';
import PollCard from '../components/PollCard';

interface Props {
  goTo: (s: Screen) => void;
  setCurrentPoll: (p: Poll) => void;
  myPolls: Poll[];
  votedPolls: Poll[];
}

export default function DashboardScreen({ goTo, setCurrentPoll, myPolls, votedPolls }: Props) {
  const [tab, setTab] = useState<'mine' | 'voted'>('mine');

  const open = (poll: Poll, owned: boolean) => {
    setCurrentPoll(poll);
    goTo(owned || poll.myVote !== undefined ? 'results' : 'vote');
  };

  const list = tab === 'mine' ? myPolls : votedPolls;

  return (
    <div className="fade-up" style={{ maxWidth: 680, margin: '0 auto', padding: '44px 24px 64px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: TEXT, letterSpacing: '-0.04em', lineHeight: 1 }}>
          Dashboard
        </h1>
        <p style={{ color: MUTED, fontSize: 14, marginTop: 6 }}>
          Manage your polls and see what you've voted on.
        </p>
      </div>

      <div style={{ display: 'flex', borderBottom: `2px solid ${BORDER}`, marginBottom: 24 }}>
        {([['mine', 'My Polls', myPolls.length], ['voted', 'Voted In', votedPolls.length]] as const).map(([k, lbl, cnt]) => (
          <button key={k} onClick={() => setTab(k)}
            style={{
              padding: '10px 18px', border: 'none', background: 'transparent', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 14,
              fontWeight: tab === k ? 700 : 500, color: tab === k ? NAVY : MUTED,
              borderBottom: tab === k ? `2.5px solid ${NAVY}` : '2.5px solid transparent',
              marginBottom: -2, transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', gap: 7,
            }}>
            {lbl}
            <span style={{
              fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 99,
              background: tab === k ? NAVY : BORDER,
              color: tab === k ? WHITE : MUTED,
            }}>{cnt}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <BearLogo size={52} />
            <p style={{ color: MUTED, fontSize: 14, marginTop: 16 }}>
              {tab === 'mine' ? "You haven't created any polls yet." : "You haven't voted in any polls yet."}
            </p>
            {tab === 'mine' && (
              <Btn variant="primary" style={{ marginTop: 20 }} onClick={() => goTo('create')}>
                Create your first poll →
              </Btn>
            )}
          </div>
        ) : (
          list.map(p => (
            <PollCard key={p.id} poll={p} owned={tab === 'mine'} onClick={() => open(p, tab === 'mine')} />
          ))
        )}
      </div>

      {list.length > 0 && tab === 'mine' && (
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
          <Btn variant="ghost" onClick={() => goTo('create')}>+ Create new poll</Btn>
        </div>
      )}
    </div>
  );
}
