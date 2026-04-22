import { TEXT, MUTED, BG, BORDER } from '../tokens';

interface Props {
  options: string[];
  votes: number[];
  colors: string[];
}

export default function Bars({ options, votes, colors }: Props) {
  const total = votes.reduce((a, b) => a + b, 0) || 1;
  const max   = Math.max(...votes) || 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {options.map((opt, i) => {
        const pct = Math.round((votes[i] / total) * 100);
        const w   = (votes[i] / max) * 100;
        return (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: TEXT, flex: 1,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 8 }}>
                {opt}
              </span>
              <span style={{ fontSize: 13, fontWeight: 800, color: colors[i], flexShrink: 0 }}>{pct}%</span>
            </div>
            <div style={{ height: 7, background: BG, borderRadius: 99, overflow: 'hidden',
              border: `1px solid ${BORDER}` }}>
              <div style={{ width: `${w}%`, height: '100%', borderRadius: 99,
                background: colors[i], transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)' }} />
            </div>
            <div style={{ fontSize: 11, color: MUTED, marginTop: 3 }}>{votes[i]} votes</div>
          </div>
        );
      })}
    </div>
  );
}
