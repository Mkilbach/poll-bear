import type { Poll } from '../types';
import { TEXT, MUTED, NAVY } from '../tokens';
import Card from './Card';
import Badge from './Badge';
import MiniBar from './MiniBar';

interface Props {
  poll: Poll;
  owned: boolean;
  onClick: () => void;
}

export default function PollCard({ poll, owned, onClick }: Props) {
  return (
    <Card hoverable onClick={onClick} style={{ padding: '18px 20px' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
            <Badge status={poll.status}>{poll.status}</Badge>
            {owned && (
              <span style={{ fontSize: 10, color: MUTED, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.06em' }}>your poll</span>
            )}
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, color: TEXT, marginBottom: 3,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{poll.title}</div>
          <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.45,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{poll.question}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 22, color: NAVY, lineHeight: 1 }}>{poll.totalVotes}</div>
          <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>votes</div>
        </div>
      </div>
      <MiniBar votes={poll.votes} />
    </Card>
  );
}
