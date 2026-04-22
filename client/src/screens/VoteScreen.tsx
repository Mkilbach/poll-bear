import { useState } from 'react';
import type { Poll, Screen } from '../types';
import { TEXT, MUTED, NAVY, MINT, MINT_LT, BORDER, WHITE, BG } from '../tokens';
import Badge from '../components/Badge';
import Btn from '../components/Btn';

interface Props {
  poll: Poll;
  goTo: (s: Screen) => void;
  onVote: (updated: Poll) => void;
  setCurrentPoll: (p: Poll) => void;
}

export default function VoteScreen({ poll, goTo, onVote, setCurrentPoll }: Props) {
  const [sel, setSel]       = useState<number | null>(null);
  const [sending, setSend]  = useState(false);

  const cast = () => {
    if (sel === null) return;
    setSend(true);
    setTimeout(() => {
      const newVotes = [...poll.votes];
      newVotes[sel] += 1;
      const updated: Poll = { ...poll, votes: newVotes, totalVotes: poll.totalVotes + 1, myVote: sel };
      onVote(updated);
      setCurrentPoll(updated);
      goTo('results');
    }, 500);
  };

  return (
    <div className="fade-up" style={{ maxWidth: 560, margin: '0 auto', padding: '44px 24px 64px' }}>
      <button onClick={() => goTo('dashboard')}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: MUTED,
          fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: 5, marginBottom: 32 }}>
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Dashboard
      </button>

      <Badge status={poll.status}>{poll.status}</Badge>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: TEXT, letterSpacing: '-0.03em',
        marginTop: 10, marginBottom: 6, lineHeight: 1.2 }}>{poll.title}</h1>
      <p style={{ fontSize: 15, color: '#4A6285', lineHeight: 1.55, marginBottom: 28 }}>{poll.question}</p>

      <div style={{ background: WHITE, borderRadius: 16, border: `1px solid ${BORDER}`,
        boxShadow: '0 2px 12px rgba(26,53,96,0.06)', overflow: 'hidden',
        padding: '6px 0', marginBottom: 20 }}>
        {poll.options.map((opt, i) => {
          const active = sel === i;
          return (
            <div key={i} onClick={() => setSel(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '15px 20px',
                cursor: 'pointer', transition: 'background 0.14s',
                background: active ? MINT_LT : 'transparent',
                borderLeft: `3px solid ${active ? MINT : 'transparent'}`,
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLDivElement).style.background = BG; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                border: `2px solid ${active ? MINT : BORDER}`,
                background: active ? MINT : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}>
                {active && <div style={{ width: 7, height: 7, borderRadius: '50%', background: WHITE }} />}
              </div>
              <span style={{ fontSize: 14, fontWeight: active ? 600 : 400,
                color: active ? NAVY : '#4A6285', transition: 'color 0.14s' }}>{opt}</span>
            </div>
          );
        })}
      </div>

      <Btn variant="primary" full onClick={cast} disabled={sel === null}>
        {sending ? '···' : 'Cast Vote →'}
      </Btn>
      {sel === null && (
        <p style={{ textAlign: 'center', fontSize: 12, color: MUTED, marginTop: 10 }}>
          Select an option above to vote
        </p>
      )}
    </div>
  );
}
