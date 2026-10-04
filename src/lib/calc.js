// Calculator logic: kept separate from the UI so it is easy to test.
// The expression is stored as a string such as "12+3×4" and is evaluated
// with a small parser (no eval), so only the four operators are possible.

export const OPERATORS = ['+', '−', '×', '÷'];
export const MAX_DIGITS = 15;
export const HISTORY_LIMIT = 5;

export const isOperator = (ch) => OPERATORS.includes(ch);

// The number currently being typed (everything after the last operator).
const tailNumber = (expr) => {
  let i = expr.length;
  while (i > 0 && !isOperator(expr[i - 1])) i -= 1;
  return expr.slice(i);
};

const stripTrailingOperators = (expr) => {
  let end = expr.length;
  while (end > 0 && isOperator(expr[end - 1])) end -= 1;
  return expr.slice(0, end);
};

function tokenize(expr) {
  const tokens = [];
  let num = '';
  for (const ch of expr) {
    if (isOperator(ch)) {
      // A minus sign at the very start belongs to the first number.
      if (num === '' && tokens.length === 0 && ch === '−') {
        num = '-';
        continue;
      }
      tokens.push(parseFloat(num));
      num = '';
      tokens.push(ch);
    } else {
      num += ch;
    }
  }
  tokens.push(parseFloat(num));
  return tokens;
}

// Evaluates with normal precedence: × and ÷ first, then + and −.
export function evaluate(expression) {
  const clean = stripTrailingOperators(expression);
  if (clean === '' || clean === '−') return 0;
  const tokens = tokenize(clean);

  const pending = [tokens[0]];
  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i];
    const rhs = tokens[i + 1];
    if (op === '×') {
      pending.push(pending.pop() * rhs);
    } else if (op === '÷') {
      if (rhs === 0) throw new Error('Cannot divide by zero');
      pending.push(pending.pop() / rhs);
    } else {
      pending.push(op, rhs);
    }
  }

  let result = pending[0];
  for (let i = 1; i < pending.length; i += 2) {
    result = pending[i] === '+' ? result + pending[i + 1] : result - pending[i + 1];
  }
  return result;
}

// Turns a number into a display string and fixes floating point noise
// (0.1 + 0.2 becomes 0.3).
export function formatResult(value) {
  if (!Number.isFinite(value)) throw new Error('Result is too large');
  const rounded = Number(value.toPrecision(15));
  if (Math.abs(rounded) >= 1e15) throw new Error('Result is too large');

  let text;
  if (rounded !== 0 && Math.abs(rounded) < 1) {
    text = rounded.toFixed(12).replace(/0+$/, '').replace(/\.$/, '');
  } else {
    text = String(rounded);
  }
  if (text === '-0' || text === '') text = '0';
  return text.replace('-', '−');
}

// Adds spaces around operators so "12+3×4" reads as "12 + 3 × 4".
export const formatExpression = (expr) => expr.replace(/([\d.])([+−×÷])/g, '$1 $2 ');

// Maps a physical keyboard key to a calculator key (or null to ignore it).
export function mapKeyboardKey(key) {
  if (/^\d$/.test(key)) return key;
  const map = {
    '.': '.',
    '+': '+',
    '-': '−',
    '*': '×',
    x: '×',
    X: '×',
    '/': '÷',
    Enter: '=',
    '=': '=',
    Backspace: '⌫',
    Escape: 'AC',
    Delete: 'AC',
    c: 'AC',
    C: 'AC',
    '%': '%',
  };
  return map[key] ?? null;
}

export const initialState = {
  expression: '',
  previous: '',
  error: '',
  justEvaluated: false,
  history: [],
};

const fresh = (state) => ({
  ...state,
  expression: '',
  previous: '',
  error: '',
  justEvaluated: false,
});

// After "=" or an error, typing a digit starts a brand new calculation.
const startOver = (state) => (state.error || state.justEvaluated ? fresh(state) : state);

function inputDigit(state, digit) {
  const s = startOver(state);
  const tail = tailNumber(s.expression);
  if (tail.replace('.', '').length >= MAX_DIGITS) return s;
  if (tail === '0') return { ...s, expression: s.expression.slice(0, -1) + digit };
  return { ...s, expression: s.expression + digit };
}

function inputDecimal(state) {
  const s = startOver(state);
  const tail = tailNumber(s.expression);
  if (tail.includes('.')) return s;
  return { ...s, expression: s.expression + (tail === '' ? '0.' : '.') };
}

function inputOperator(state, op) {
  const s = state.error ? fresh(state) : state;
  const { expression } = s;

  if (expression === '') {
    return op === '−' ? { ...s, expression: '−' } : s;
  }
  const last = expression.at(-1);
  if (isOperator(last)) {
    if (expression.length === 1) return s; // only a leading minus so far
    return { ...s, expression: expression.slice(0, -1) + op }; // swap operator
  }
  return { ...s, expression: expression + op, previous: '', justEvaluated: false };
}

function calculate(state) {
  if (!state.expression || state.justEvaluated || state.error) return state;
  const clean = stripTrailingOperators(state.expression);
  const hasOperator = /[+−×÷]/.test(clean.slice(1));
  if (!hasOperator) return state;

  try {
    const result = formatResult(evaluate(clean));
    return {
      expression: result,
      previous: `${clean} =`,
      error: '',
      justEvaluated: true,
      history: [{ expression: clean, result }, ...state.history].slice(0, HISTORY_LIMIT),
    };
  } catch (err) {
    return { ...state, expression: '', previous: `${clean} =`, error: err.message, justEvaluated: false };
  }
}

function percent(state) {
  if (state.error) return fresh(state);
  const tail = tailNumber(state.expression);
  if (tail === '') return state;
  const converted = formatResult(parseFloat(tail) / 100);
  return {
    ...state,
    expression: state.expression.slice(0, state.expression.length - tail.length) + converted,
    previous: '',
    justEvaluated: false,
  };
}

function backspace(state) {
  if (state.error || state.justEvaluated) return fresh(state);
  return { ...state, expression: state.expression.slice(0, -1) };
}

function pressKey(state, key) {
  if (/^\d$/.test(key)) return inputDigit(state, key);
  if (key === '.') return inputDecimal(state);
  if (isOperator(key)) return inputOperator(state, key);
  switch (key) {
    case '=':
      return calculate(state);
    case '%':
      return percent(state);
    case '⌫':
      return backspace(state);
    case 'AC':
      return fresh(state);
    default:
      return state;
  }
}

export function calculatorReducer(state, action) {
  switch (action.type) {
    case 'press':
      return pressKey(state, action.key);
    case 'recall':
      return {
        ...state,
        expression: action.result,
        previous: `${action.expression} =`,
        error: '',
        justEvaluated: true,
      };
    case 'clearHistory':
      return { ...state, history: [] };
    default:
      return state;
  }
}
