import { useState, type CSSProperties, type ReactNode } from 'react';
import { NAVY, MINT, BG, WHITE, BORDER, ERROR } from '../tokens';

type Variant = 'primary' | 'mint' | 'ghost' | 'ghost-dark' | 'danger';

interface Props {
  children: ReactNode;
  variant?: Variant;
  onClick?: () => void;
  disabled?: boolean;
  full?: boolean;
  sm?: boolean;
  style?: CSSProperties;
  type?: 'button' | 'submit' | 'reset';
}

const variants: Record<Variant, { bg: string; hbg: string; color: string; border?: string }> = {
  primary:      { bg: NAVY,            hbg: '#22427A',                      color: WHITE },
  mint:         { bg: MINT,            hbg: '#2BB999',                      color: WHITE },
  ghost:        { bg: 'transparent',   hbg: BG,                             color: NAVY,  border: `1.5px solid ${BORDER}` },
  'ghost-dark': { bg: 'transparent',   hbg: 'rgba(255,255,255,0.08)',        color: WHITE, border: '1.5px solid rgba(255,255,255,0.28)' },
  danger:       { bg: '#FEF0F2',       hbg: '#FDDDE1',                      color: ERROR, border: '1.5px solid #F5C8CC' },
};

export default function Btn({ children, variant = 'primary', onClick, disabled, full, sm, style: sx, type = 'button' }: Props) {
  const [hov, setHov] = useState(false);
  const v = variants[variant];

  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    border: v.border ?? 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit',
    fontWeight: 600,
    borderRadius: 11,
    transition: 'all 0.17s ease',
    whiteSpace: 'nowrap',
    width: full ? '100%' : 'auto',
    padding: sm ? '8px 15px' : '12px 22px',
    fontSize: sm ? 13 : 14,
    opacity: disabled ? 0.45 : 1,
    letterSpacing: '-0.01em',
    background: hov ? v.hbg : v.bg,
    color: v.color,
    transform: hov && !disabled ? 'translateY(-1px)' : 'none',
    boxShadow: hov && !disabled && variant === 'primary' ? '0 4px 14px rgba(26,53,96,0.22)' : 'none',
    ...sx,
  };

  return (
    <button
      type={type}
      style={base}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </button>
  );
}
