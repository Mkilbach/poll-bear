import { useState, type FormEvent } from 'react';
import { NAVY, MINT, MUTED, BG, WHITE, BORDER } from '../tokens';
import BearLogo from '../components/BearLogo';
import Card from '../components/Card';
import Field from '../components/Field';
import Btn from '../components/Btn';

interface Props {
  onLogin: () => void;
}

export default function AuthScreen({ onLogin }: Props) {
  const [mode, setMode]       = useState<'login' | 'register'>('login');
  const [email, setEmail]     = useState('');
  const [pass, setPass]       = useState('');
  const [conf, setConf]       = useState('');
  const [errs, setErrs]       = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.includes('@'))                      e.email = 'Enter a valid email address';
    if (pass.length < 6)                           e.pass  = 'Password must be at least 6 characters';
    if (mode === 'register' && pass !== conf)      e.conf  = 'Passwords do not match';
    return e;
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrs(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 900);
  };

  return (
    <div className="auth-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 24 }}>

      <div className="fade-up" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 44 }}>
        <BearLogo size={54} />
        <div>
          <div style={{ fontWeight: 800, fontSize: 32, letterSpacing: '-0.04em', color: NAVY, lineHeight: 1.05 }}>
            Poll<span style={{ color: MINT }}>Bear</span>
          </div>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 3, fontWeight: 400 }}>
            Create &amp; share polls with ease
          </div>
        </div>
      </div>

      <Card style={{ width: '100%', maxWidth: 400, padding: '32px 28px' }}>
        <div className="fade-up">
          <div style={{ display: 'flex', background: BG, borderRadius: 10, padding: 4, marginBottom: 26,
            border: `1px solid ${BORDER}` }}>
            {([['login', 'Sign In'], ['register', 'Create Account']] as const).map(([m, lbl]) => (
              <button key={m} onClick={() => { setMode(m); setErrs({}); }}
                style={{
                  flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 13, fontWeight: 600, transition: 'all 0.16s',
                  background: mode === m ? WHITE : 'transparent',
                  color: mode === m ? NAVY : MUTED,
                  boxShadow: mode === m ? '0 1px 6px rgba(26,53,96,0.10)' : 'none',
                }}>{lbl}</button>
            ))}
          </div>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="Email address" type="email" value={email}
              onChange={e => setEmail(e.target.value)} placeholder="you@example.com" error={errs.email} />
            <Field label="Password" type="password" value={pass}
              onChange={e => setPass(e.target.value)} placeholder="••••••••" error={errs.pass}
              helper={mode === 'register' ? 'Minimum 6 characters' : undefined} />
            {mode === 'register' && (
              <Field label="Confirm password" type="password" value={conf}
                onChange={e => setConf(e.target.value)} placeholder="••••••••" error={errs.conf} />
            )}
            <Btn variant="primary" full type="submit" style={{ marginTop: 4 }}>
              {loading ? '···' : mode === 'login' ? 'Sign In →' : 'Create Account →'}
            </Btn>
          </form>
        </div>
      </Card>

      <p style={{ marginTop: 24, fontSize: 12, color: MUTED, textAlign: 'center', lineHeight: 1.6 }}>
        Votes are anonymous · Polls are shared via link only
      </p>
    </div>
  );
}
