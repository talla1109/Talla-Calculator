const OPERATIONS = [
  { name: 'Addition', key: '+', example: '8 + 5 = 13' },
  { name: 'Subtraction', key: '−', example: '8 − 5 = 3' },
  { name: 'Multiplication', key: '×', example: '8 × 5 = 40' },
  { name: 'Division', key: '÷', example: '20 ÷ 4 = 5' },
  { name: 'Percent', key: '%', example: '50 % turns 50 into 0.5' },
];

const SHORTCUTS = [
  { keys: '0 – 9 and .', does: 'Type numbers' },
  { keys: '+  -  *  /', does: 'Add, subtract, multiply, divide' },
  { keys: 'Enter or =', does: 'Calculate the result' },
  { keys: 'Backspace', does: 'Delete the last character' },
  { keys: 'Esc or C', does: 'Clear everything (AC)' },
];

function Heading({ children }) {
  return <h3 className="mb-3 text-lg font-bold">{children}</h3>;
}

export default function UserGuide() {
  return (
    <section id="guide" aria-labelledby="guide-title" className="scroll-mt-4 px-1 lg:pt-2">
      <h2 id="guide-title" className="text-3xl font-extrabold tracking-tight">
        User guide
      </h2>

      <div className="mt-6 border-t border-ink/15 pt-5">
        <Heading>How to use the calculator</Heading>
        <ol className="list-decimal space-y-2 pl-6 text-base leading-relaxed marker:font-semibold">
          <li>Tap or click the number keys to enter your first number.</li>
          <li>Choose an operator: +, −, ×, or ÷.</li>
          <li>Enter the second number.</li>
          <li>Press = to see the result. Keep going by pressing another operator.</li>
          <li>Press AC to clear the display and start over, or ⌫ to fix a typo.</li>
        </ol>
      </div>

      <div className="mt-8 border-t border-ink/15 pt-5">
        <Heading>Supported operations</Heading>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[20rem] text-left text-base">
            <thead>
              <tr className="border-b border-ink/15 text-sm text-ink/70">
                <th scope="col" className="py-2 pr-4 font-semibold">Operation</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Key</th>
                <th scope="col" className="py-2 font-semibold">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {OPERATIONS.map((op) => (
                <tr key={op.name}>
                  <th scope="row" className="py-2 pr-4 font-medium">{op.name}</th>
                  <td className="py-2 pr-4 text-xl font-semibold">{op.key}</td>
                  <td className="py-2 tabular-nums">{op.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 border-t border-ink/15 pt-5">
        <Heading>Keyboard shortcuts</Heading>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-base">
          {SHORTCUTS.map((item) => (
            <div key={item.keys} className="contents">
              <dt className="font-semibold">{item.keys}</dt>
              <dd>{item.does}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-8 border-t border-ink/15 pt-5">
        <Heading>Good to know</Heading>
        <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed">
          <li>× and ÷ are worked out before + and −, so 2 + 3 × 4 gives 14.</li>
          <li>Dividing by zero shows an error. Press AC or start typing a new number to continue.</li>
          <li>Each number can have up to 15 digits and one decimal point.</li>
          <li>Select an entry under Recent results to use that answer again.</li>
        </ul>
      </div>
    </section>
  );
}
