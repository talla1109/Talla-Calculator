import { useCallback, useEffect, useReducer, useState } from 'react';
import { calculatorReducer, initialState, mapKeyboardKey } from '../lib/calc';

// All calculator state lives here: the reducer holds the expression, result,
// error, and history; `pressed` drives the key-press highlight.
export function useCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const [pressed, setPressed] = useState(null);

  const press = useCallback((key) => {
    dispatch({ type: 'press', key });
    setPressed(key);
  }, []);

  const recall = useCallback((entry) => {
    dispatch({ type: 'recall', expression: entry.expression, result: entry.result });
  }, []);

  const clearHistory = useCallback(() => dispatch({ type: 'clearHistory' }), []);

  // Clear the highlight shortly after a key is pressed.
  useEffect(() => {
    if (!pressed) return undefined;
    const timer = setTimeout(() => setPressed(null), 130);
    return () => clearTimeout(timer);
  }, [pressed]);

  // Keyboard support.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const key = mapKeyboardKey(event.key);
      if (!key) return;
      event.preventDefault();
      press(key);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [press]);

  return { state, pressed, press, recall, clearHistory };
}
