import { useEffect, useRef } from "react";

export function useGameLoop(
  callback: (delta: number) => void,
  running: boolean,
) {
  const callbackRef = useRef(callback);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!running) return;

    const loop = (timestamp: number) => {
      const delta =
        lastTimeRef.current === 0
          ? 0
          : (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      // Cap delta to avoid spiral of death
      const cappedDelta = Math.min(delta, 0.05);
      callbackRef.current(cappedDelta);

      rafRef.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
    };
  }, [running]);
}
