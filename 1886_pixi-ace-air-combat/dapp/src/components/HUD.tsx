import type { GameState } from "../game/types";

interface HUDProps {
  state: GameState;
}

function HUD({ state }: HUDProps) {
  const hpPercent = (state.playerHp / state.playerMaxHp) * 100;

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* Top bar */}
      <div className="flex items-start justify-between p-4">
        {/* Left: HP */}
        <div className="min-w-44">
          <div className="mb-1 font-mono text-xs tracking-widest text-cyan-500 uppercase">
            Hull Integrity
          </div>
          <div className="flex h-3 w-44 overflow-hidden rounded-sm border border-gray-700 bg-gray-900">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${hpPercent}%`,
                backgroundColor:
                  hpPercent > 60
                    ? "#00ff88"
                    : hpPercent > 30
                      ? "#ffaa00"
                      : "#ff2222",
                boxShadow:
                  hpPercent > 60
                    ? "0 0 6px #00ff88"
                    : hpPercent > 30
                      ? "0 0 6px #ffaa00"
                      : "0 0 6px #ff2222",
              }}
            />
          </div>
          <div className="mt-0.5 font-mono text-xs text-gray-400">
            {state.playerHp} / {state.playerMaxHp}
          </div>
        </div>

        {/* Center: Score + Wave */}
        <div className="flex flex-col items-center">
          <div className="font-mono text-xs tracking-widest text-cyan-500 uppercase">
            Score
          </div>
          <div
            className="font-mono text-2xl font-bold text-yellow-400"
            style={{ textShadow: "0 0 8px #ffd700" }}
          >
            {state.score.toLocaleString()}
          </div>
          <div className="mt-1 font-mono text-xs tracking-[0.2em] text-purple-400">
            WAVE {state.wave}
          </div>
        </div>

        {/* Right: Status indicators */}
        <div className="flex min-w-44 flex-col items-end gap-1">
          {state.shieldActive && (
            <div
              className="rounded border border-cyan-500 px-2 py-0.5 font-mono text-xs text-cyan-400"
              style={{ boxShadow: "0 0 8px #00d4ff" }}
            >
              ⬡ SHIELD ACTIVE
            </div>
          )}
          {state.rapidFireActive && (
            <div
              className="rounded border border-yellow-500 px-2 py-0.5 font-mono text-xs text-yellow-400"
              style={{ boxShadow: "0 0 8px #ffd700" }}
            >
              ⚡ RAPID FIRE
            </div>
          )}
        </div>
      </div>

      {/* Corner decoration lines */}
      <div className="pointer-events-none absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-cyan-700/50" />
      <div className="pointer-events-none absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-cyan-700/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-cyan-700/50" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2 border-cyan-700/50" />
    </div>
  );
}

export default HUD;
