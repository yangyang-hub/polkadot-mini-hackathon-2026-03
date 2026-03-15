import { useEffect, useRef } from "react";
import type { KeyState } from "../game/types";

const KEY_MAP: Record<string, keyof KeyState> = {
  ArrowUp: "up",
  KeyW: "up",
  ArrowDown: "down",
  KeyS: "down",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
  Space: "shoot",
};

export function useKeyboard(): React.RefObject<KeyState> {
  const keysRef = useRef<KeyState>({
    up: false,
    down: false,
    left: false,
    right: false,
    shoot: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const action = KEY_MAP[e.code];
      if (action) {
        e.preventDefault();
        keysRef.current[action] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const action = KEY_MAP[e.code];
      if (action) {
        keysRef.current[action] = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keysRef;
}
