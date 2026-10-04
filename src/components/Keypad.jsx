import Button from './Button';

const KEYS = [
  { label: 'AC', kind: 'fn', ariaLabel: 'All clear' },
  { label: '⌫', kind: 'fn', ariaLabel: 'Backspace' },
  { label: '%', kind: 'fn', ariaLabel: 'Percent' },
  { label: '÷', kind: 'op', ariaLabel: 'Divide' },
  { label: '7' },
  { label: '8' },
  { label: '9' },
  { label: '×', kind: 'op', ariaLabel: 'Multiply' },
  { label: '4' },
  { label: '5' },
  { label: '6' },
  { label: '−', kind: 'op', ariaLabel: 'Subtract' },
  { label: '1' },
  { label: '2' },
  { label: '3' },
  { label: '+', kind: 'op', ariaLabel: 'Add' },
  { label: '0', className: 'col-span-2' },
  { label: '.', ariaLabel: 'Decimal point' },
  { label: '=', kind: 'equals', ariaLabel: 'Equals' },
];

export default function Keypad({ pressed, onPress }) {
  return (
    <div className="grid grid-cols-4 gap-3" role="group" aria-label="Calculator keys">
      {KEYS.map((key) => (
        <Button key={key.label} {...key} pressed={pressed === key.label} onPress={onPress} />
      ))}
    </div>
  );
}
