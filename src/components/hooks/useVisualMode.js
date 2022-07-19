import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      return setMode(mode);
    }
    setMode(mode);
    setHistory([...history, mode]);
  }

  function back() {
    if (history.length >= 2) {
      const prevHistory = history.splice(0, history.length - 1);
      setHistory(prevHistory);
      setMode(prevHistory[prevHistory.length - 1]);
    }
  }

  return { mode, transition, back };
}
