import { useState } from 'react';
import { TEXT, BORDER, WHITE, NAVY, ERROR, MUTED } from '../tokens';

interface Props {
  label?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  helper?: string;
}

export default function Field({ label, type = 'text', value, onChange, placeholder, error, helper }: Props) {
  const [focus, setFocus] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <label style={{ fontSize: 12.5, fontWeight: 700, color: TEXT, letterSpacing: '0.01em' }}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          padding: '11px 14px',
          borderRadius: 10,
          border: `1.5px solid ${error ? ERROR : focus ? NAVY : BORDER}`,
          fontSize: 14,
          outline: 'none',
          background: WHITE,
          color: TEXT,
          transition: 'border-color 0.15s',
          boxShadow: focus
            ? `0 0 0 3px ${error ? 'rgba(217,95,114,0.10)' : 'rgba(26,53,96,0.08)'}`
            : 'none',
        }}
      />
      {error  && <span style={{ fontSize: 12, color: ERROR }}>{error}</span>}
      {helper && <span style={{ fontSize: 12, color: MUTED }}>{helper}</span>}
    </div>
  );
}
