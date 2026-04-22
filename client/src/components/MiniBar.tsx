import { PALETTE } from '../tokens';

interface Props {
  votes: number[];
}

export default function MiniBar({ votes }: Props) {
  return (
    <div style={{ display: 'flex', height: 4, borderRadius: 2, overflow: 'hidden', gap: 2, marginTop: 12 }}>
      {votes.map((v, i) => (
        <div key={i} style={{ flex: v || 0.4, background: PALETTE[i % PALETTE.length], opacity: 0.65, borderRadius: 2 }} />
      ))}
    </div>
  );
}
