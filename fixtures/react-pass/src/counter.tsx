import { useCallback, useState } from "react";

interface CounterProps {
  readonly label: string;
}

export function Counter({ label }: CounterProps): React.JSX.Element {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => {
    setCount((previous) => previous + 1);
  }, []);
  return (
    <button type="button" onClick={increment}>
      {label}: {count}
    </button>
  );
}
