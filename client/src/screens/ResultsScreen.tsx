import { useState } from 'react';
import type { Poll, Screen } from '../types';
import { TEXT, MUTED, NAVY, BORDER, PALETTE } from '../tokens';
import Badge from '../components/Badge';
import Card from '../components/Card';
import Btn from '../components/Btn';
import DonutChart from '../components/DonutChart';
import Bars from '../components/Bars';

interface Props {
  poll: Poll;
  goTo: (s: Screen) => void;
  owned: boolean;
  onClose: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ResultsScreen({ poll, goTo, owned, onClose, onDelete }: Props) {
  const colors = poll.options.map((_, i) => PALETTE[i % PALETTE.length]);
  const [modal, setModal]   = useState<'close' | 'delete' | null>(null);
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confirm = (action: 'close' | 'delete') => {
    if (action === 'close')  onClose(poll.id);
    if (action === 'delete') onDelete(poll.id);
    setModal(null);
    goTo('dashboard');
  };

  return (
    <div className="fade-up" style={{ maxWidth: 660, margin: '0 auto', padding: '44px 24px 80px' }}>
      <button onClick={() => goTo('dashboard')}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: MUTED,
          fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: 5, marginBottom: 32 }}>
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Dashboard
      </button>

      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Badge status={poll.status}>{poll.status}</Badge>
          {owned && (
            <span style={{ fontSize: 11, color: MUTED, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.05em' }}>your poll</span>
          )}
          {poll.myVote !== undefined && !owned && (
            <span style={{ fontSize: 11, color: MUTED, fontWeight: 500 }}>
              You voted: <strong style={{ color: PALETTE[poll.myVote] }}>{poll.options[poll.myVote]}</strong>
            </span>
          )}
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: TEXT, letterSpacing: '-0.03em',
          marginBottom: 6, lineHeight: 1.2 }}>{poll.title}</h1>
        <p style={{ fontSize: 15, color: '#4A6285', lineHeight: 1.5 }}>{poll.question}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, marginBottom: 14,
        alignItems: 'start' }}>
        <Card style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 220 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: MUTED, letterSpacing: '0.1em',
            textTransform: 'uppercase', marginBottom: 12 }}>Distribution</div>
          <DonutChart options={poll.options} votes={poll.votes} colors={colors} />
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
            {poll.options.map((opt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: colors[i], flexShrink: 0 }} />
                <span style={{ fontSize: 11.5, color: MUTED, flex: 1,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opt}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ padding: '22px 24px' }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: MUTED, letterSpacing: '0.1em',
            textTransform: 'uppercase', marginBottom: 14 }}>Breakdown</div>
          <Bars options={poll.options} votes={poll.votes} colors={colors} />
        </Card>
      </div>

      <Card style={{ padding: '12px 16px', marginBottom: 14,
        display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width={15} height={15} viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
          <path d="M10 1l4 4-4 4M14 5H5a4 4 0 000 8h1" stroke={MUTED}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ flex: 1, fontSize: 12.5, color: MUTED, fontFamily: 'monospace',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          pollbear.app/v/{poll.id}
        </span>
        <Btn sm variant={copied ? 'mint' : 'ghost'} onClick={copyLink}>
          {copied ? '✓ Copied' : 'Copy link'}
        </Btn>
      </Card>

      {owned && (
        <div style={{ display: 'flex', gap: 9 }}>
          {poll.status === 'open' && (
            <Btn sm variant="ghost" onClick={() => setModal('close')}>Close poll</Btn>
          )}
          <Btn sm variant="danger" onClick={() => setModal('delete')}>Delete poll</Btn>
        </div>
      )}

      {modal && (
        <div className="scale-in" style={{ position: 'fixed', inset: 0,
          background: 'rgba(15,32,64,0.4)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 300, padding: 24 }}>
          <Card style={{ maxWidth: 360, width: '100%', padding: '28px 24px' }}>
            <h3 style={{ fontWeight: 800, fontSize: 18, color: TEXT,
              letterSpacing: '-0.02em', marginBottom: 8 }}>
              {modal === 'close' ? 'Close this poll?' : 'Delete this poll?'}
            </h3>
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.55, marginBottom: 22 }}>
              {modal === 'close'
                ? 'Once closed, this poll cannot be reopened. All existing votes are preserved.'
                : 'This will permanently delete the poll and all its votes. This action cannot be undone.'}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <Btn variant="ghost" onClick={() => setModal(null)}>Cancel</Btn>
              <Btn variant={modal === 'delete' ? 'danger' : 'primary'} onClick={() => confirm(modal)}>
                {modal === 'close' ? 'Close poll' : 'Delete poll'}
              </Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
