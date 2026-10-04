import { formatExpression } from '../lib/calc';

export default function Display({ expression, previous, error }) {
  const shown = formatExpression(expression) || '0';
  const size =
    shown.length > 18 ? 'text-2xl' : shown.length > 12 ? 'text-3xl' : shown.length > 8 ? 'text-4xl' : 'text-5xl';

  return (
    <div className="mb-5 rounded-2xl bg-lcd px-4 py-3 text-lcd-ink shadow-[inset_0_3px_8px_rgba(20,48,31,0.28)]">
      <p
        className={`min-h-6 truncate text-right text-sm ${error ? 'font-semibold text-alert' : 'text-lcd-ink/70'}`}
      >
        {error || previous || '\u00A0'}
      </p>
      <p
        role="status"
        aria-live="polite"
        className={`mt-1 min-h-14 break-all text-right font-semibold leading-tight tabular-nums ${size} ${
          error ? 'text-alert' : ''
        }`}
      >
        {error ? 'Error' : shown}
      </p>
    </div>
  );
}
