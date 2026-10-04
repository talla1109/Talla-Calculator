import Display from './Display';
import Keypad from './Keypad';

export default function Calculator({ state, pressed, press }) {
  return (
    <section
      id="calculator"
      aria-labelledby="calculator-title"
      className="scroll-mt-4 rounded-[2rem] bg-body p-4 shadow-[0_28px_40px_-20px_rgba(20,33,61,0.6)] sm:p-6"
    >
      <h2 id="calculator-title" className="sr-only">
        Calculator
      </h2>
      <Display expression={state.expression} previous={state.previous} error={state.error} />
      <Keypad pressed={pressed} onPress={press} />
    </section>
  );
}
