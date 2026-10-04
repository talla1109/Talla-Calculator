export default function History({ history, onRecall, onClear }) {
  return (
    <section aria-labelledby="history-title" className="px-1">
      <div className="flex items-baseline justify-between">
        <h2 id="history-title" className="text-xl font-bold">
          Recent results
        </h2>
        {history.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="rounded text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            Clear history
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="mt-3 text-base text-ink/70">Finish a calculation with = and it shows up here.</p>
      ) : (
        <ul className="mt-3 divide-y divide-ink/15 border-y border-ink/15">
          {history.map((entry, index) => (
            <li key={`${entry.expression}-${index}`}>
              <button
                type="button"
                onClick={() => onRecall(entry)}
                aria-label={`Use result ${entry.result} from ${entry.expression}`}
                className="flex w-full items-baseline justify-between gap-4 px-1 py-3 text-left hover:bg-white/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-teal"
              >
                <span className="truncate text-ink/70 tabular-nums">{entry.expression}</span>
                <span className="text-lg font-semibold tabular-nums">= {entry.result}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
