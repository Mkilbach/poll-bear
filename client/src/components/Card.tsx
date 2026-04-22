import { useState, type CSSProperties, type ReactNode } from 'react';
import { WHITE, BORDER } from '../tokens';

interface Props {
  children: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function Card({ children, style: sx, onClick, hoverable }: Props) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hoverable && setHov(true)}
      onMouseLeave={() => hoverable && setHov(false)}
      style={{
        background: WHITE,
        borderRadius: 16,
        border: `1px solid ${BORDER}`,
        boxShadow: hov
          ? '0 8px 28px rgba(26,53,96,0.13)'
          : '0 2px 12px rgba(26,53,96,0.06)',
        transition: 'box-shadow 0.18s, transform 0.18s',
        transform: hov ? 'translateY(-2px)' : 'none',
        cursor: onClick ? 'pointer' : 'default',
        ...sx,
      }}
    >
      {children}
    </div>
  );
}
