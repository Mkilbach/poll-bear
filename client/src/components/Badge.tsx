import type { ReactNode } from 'react';
import { MINT_LT, MINT, MUTED } from '../tokens';

interface Props {
  children: ReactNode;
  status: 'open' | 'closed';
}

export default function Badge({ children, status }: Props) {
  const s = status === 'open'
    ? { bg: MINT_LT, color: '#1A9B80', dot: MINT }
    : { bg: '#F0F3FA', color: MUTED,   dot: '#C8D6EB' };

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      padding: '3px 9px 3px 7px',
      borderRadius: 20,
      background: s.bg,
      color: s.color,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
      {children}
    </span>
  );
}
