import type { Screen } from '../types';
import { NAVY, MINT, WHITE } from '../tokens';
import BearLogo from './BearLogo';
import Btn from './Btn';

interface Props {
  goTo: (s: Screen) => void;
  onLogout: () => void;
}

export default function TopNav({ goTo, onLogout }: Props) {
  return (
    <nav style={{
      background: NAVY,
      height: 60,
      display: 'flex',
      alignItems: 'center',
      padding: '0 28px',
      gap: 12,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 16px rgba(15,32,64,0.2)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        onClick={() => goTo('dashboard')}>
        <BearLogo size={30} light />
        <span style={{ color: WHITE, fontWeight: 800, fontSize: 17, letterSpacing: '-0.03em' }}>
          Poll<span style={{ color: MINT }}>Bear</span>
        </span>
      </div>

      <div style={{ flex: 1 }} />

      <Btn variant="ghost-dark" sm onClick={() => goTo('create')}>
        <svg width={13} height={13} viewBox="0 0 13 13" fill="none">
          <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        New Poll
      </Btn>

      <div
        title="Sign out"
        onClick={onLogout}
        style={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          background: MINT,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          fontWeight: 800,
          color: WHITE,
          letterSpacing: '-0.02em',
          flexShrink: 0,
        }}
      >
        U
      </div>
    </nav>
  );
}
