export default function Header() {
  return (
    <header className="mx-auto flex max-w-5xl flex-col gap-4 px-4 pb-6 pt-8 sm:px-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Talla Pocket Calc</h1>
        <p className="mt-2 max-w-md text-base text-ink/70">
          Add, subtract, multiply, and divide with taps or your keyboard.
        </p>
      </div>
      <nav aria-label="Page sections" className="flex gap-5 text-base font-semibold">
        <a
          href="#calculator"
          className="rounded underline decoration-amber decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
        >
          Calculator
        </a>
        <a
          href="#guide"
          className="rounded underline decoration-amber decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
        >
          User guide
        </a>
      </nav>
    </header>
  );
}
