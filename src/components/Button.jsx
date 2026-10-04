const KIND_STYLES = {
  digit: 'bg-key text-ink hover:bg-white',
  fn: 'bg-fn text-white hover:bg-[#3f5686]',
  op: 'bg-amber text-ink hover:bg-[#ffc95a]',
  equals: 'bg-teal text-white hover:bg-[#15b88f]',
};

// One calculator key. Presses (mouse, touch, or keyboard) sink the key down.
export default function Button({ label, kind = 'digit', ariaLabel, pressed, onPress, className = '' }) {
  const sunk = pressed
    ? 'translate-y-1 shadow-[0_0_0_rgba(0,0,0,0)]'
    : 'shadow-[0_4px_0_rgba(8,14,30,0.55)] active:translate-y-1 active:shadow-[0_0_0_rgba(0,0,0,0)]';

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => onPress(label)}
      className={`h-16 rounded-xl text-2xl font-semibold transition-[transform,box-shadow,background-color] duration-75 motion-reduce:transition-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-amber sm:h-[4.5rem] ${KIND_STYLES[kind]} ${sunk} ${className}`}
    >
      {label}
    </button>
  );
}
