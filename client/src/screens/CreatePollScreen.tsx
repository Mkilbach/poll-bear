import { useState } from 'react';
import type { Poll, Screen } from '../types';
import { TEXT, MUTED, NAVY, MINT, MINT_LT, BORDER, ERROR, PALETTE } from '../tokens';
import Card from '../components/Card';
import Field from '../components/Field';
import Btn from '../components/Btn';

interface Props {
  goTo: (s: Screen) => void;
  onCreated: (poll: Poll) => void;
}

export default function CreatePollScreen({ goTo, onCreated }: Props) {
  const [title,    setTitle]    = useState('');
  const [question, setQuestion] = useState('');
  const [options,  setOptions]  = useState(['', '']);
  const [errs,     setErrs]     = useState<Record<string, string>>({});
  const [done,     setDone]     = useState(false);

  const addOpt    = () => options.length < 10 && setOptions([...options, '']);
  const removeOpt = (i: number) => options.length > 2 && setOptions(options.filter((_, x) => x !== i));
  const setOpt    = (i: number, v: string) => { const n = [...options]; n[i] = v; setOptions(n); };

  const submit = () => {
    const e: Record<string, string> = {};
    if (!title.trim())    e.title    = 'Title is required';
    if (!question.trim()) e.question = 'Question is required';
    if (options.filter(o => o.trim()).length < 2) e.options = 'At least 2 options are required';
    if (Object.keys(e).length) { setErrs(e); return; }
    setDone(true);
    setTimeout(() => {
      onCreated({
        id: 'new-' + Date.now(),
        title: title.trim(),
        question: question.trim(),
        options: options.filter(o => o.trim()),
        votes: options.filter(o => o.trim()).map(() => 0),
        status: 'open',
        created: 'Today',
        totalVotes: 0,
      });
    }, 600);
  };

  if (done) return (
    <div className="fade-up" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 14 }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: MINT_LT,
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
          <path d="M6 16l7 7 13-13" stroke={MINT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 style={{ fontWeight: 800, fontSize: 22, color: TEXT, letterSpacing: '-0.03em' }}>Poll created!</h2>
      <p style={{ color: MUTED, fontSize: 14 }}>Your poll is live and ready to share.</p>
    </div>
  );

  return (
    <div className="fade-up" style={{ maxWidth: 580, margin: '0 auto', padding: '44px 24px 64px' }}>
      <button onClick={() => goTo('dashboard')}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: MUTED,
          fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: 5, marginBottom: 28 }}>
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Dashboard
      </button>

      <h1 style={{ fontSize: 28, fontWeight: 800, color: TEXT, letterSpacing: '-0.04em', marginBottom: 4 }}>
        New Poll
      </h1>
      <p style={{ color: MUTED, fontSize: 14, marginBottom: 28 }}>
        Set up your question and options.
      </p>

      <Card style={{ padding: '26px 24px', marginBottom: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Field label="Poll title" value={title} onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Team Lunch Preference" error={errs.title} />
          <Field label="Question" value={question} onChange={e => setQuestion(e.target.value)}
            placeholder="e.g. Where should we go for lunch?" error={errs.question} />
        </div>
      </Card>

      <Card style={{ padding: '22px 24px' }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: TEXT, marginBottom: 12,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Answer options</span>
          <span style={{ color: MUTED, fontWeight: 500 }}>{options.length} / 10</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {options.map((opt, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2,
                background: PALETTE[i % PALETTE.length], flexShrink: 0, opacity: 0.75 }} />
              <input
                value={opt}
                onChange={e => setOpt(i, e.target.value)}
                placeholder={`Option ${i + 1}`}
                style={{ flex: 1, padding: '10px 13px', borderRadius: 9,
                  border: `1.5px solid ${BORDER}`, fontSize: 14,
                  fontFamily: 'inherit', outline: 'none', color: TEXT,
                  transition: 'border-color 0.15s' }}
                onFocus={e => (e.target.style.borderColor = NAVY)}
                onBlur={e => (e.target.style.borderColor = BORDER)}
              />
              {options.length > 2 && (
                <button onClick={() => removeOpt(i)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer',
                    color: MUTED, fontSize: 18, lineHeight: 1, padding: '0 3px',
                    display: 'flex', alignItems: 'center' }}>×</button>
              )}
            </div>
          ))}
        </div>
        {errs.options && <p style={{ fontSize: 12, color: ERROR, marginTop: 8 }}>{errs.options}</p>}
        {options.length < 10 && (
          <button onClick={addOpt}
            style={{ marginTop: 12, background: 'none', border: 'none', cursor: 'pointer',
              color: NAVY, fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Add option
          </button>
        )}
      </Card>

      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <Btn variant="ghost" onClick={() => goTo('dashboard')}>Cancel</Btn>
        <Btn variant="primary" onClick={submit} style={{ flex: 1 }}>Create Poll →</Btn>
      </div>
    </div>
  );
}
