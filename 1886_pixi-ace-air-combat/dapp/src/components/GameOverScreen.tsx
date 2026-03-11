import type { GameResult } from "../App";

interface GameOverScreenProps {
  result: GameResult;
  onRestart: () => void;
}

function GameOverScreen({ result, onRestart }: GameOverScreenProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-black">
      {/* Background overlay */}
      <div className="pointer-events-none absolute inset-0 bg-red-950/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Title */}
        <div className="mb-2 font-mono text-sm tracking-[0.5em] text-red-500 uppercase">
          ◈ MISSION FAILED ◈
        </div>
        <h2
          className="mb-8 font-mono text-5xl font-black tracking-widest text-red-500 md:text-7xl"
          style={{ textShadow: "0 0 20px #ff0000, 0 0 40px #ff0000" }}
        >
          GAME OVER
        </h2>

        {/* Divider */}
        <div className="mb-8 h-px w-80 bg-linear-to-r from-transparent via-red-500 to-transparent" />

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="font-mono text-xs tracking-widest text-gray-500 uppercase">
              Score
            </div>
            <div
              className="mt-1 font-mono text-4xl font-bold text-yellow-400"
              style={{ textShadow: "0 0 10px #ffd700" }}
            >
              {result.score.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="font-mono text-xs tracking-widest text-gray-500 uppercase">
              Kills
            </div>
            <div
              className="mt-1 font-mono text-4xl font-bold text-cyan-400"
              style={{ textShadow: "0 0 10px #00d4ff" }}
            >
              {result.kills}
            </div>
          </div>
          <div>
            <div className="font-mono text-xs tracking-widest text-gray-500 uppercase">
              Wave
            </div>
            <div
              className="mt-1 font-mono text-4xl font-bold text-purple-400"
              style={{ textShadow: "0 0 10px #cc00ff" }}
            >
              {result.wave}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px w-80 bg-linear-to-r from-transparent via-red-500 to-transparent" />

        {/* Rank */}
        <div className="mb-8 text-center">
          <div className="font-mono text-xs tracking-widest text-gray-500 uppercase">
            Combat Rating
          </div>
          <div
            className="mt-1 font-mono text-2xl font-bold text-white"
            style={{ textShadow: "0 0 15px #ffffff" }}
          >
            {getRank(result.score)}
          </div>
        </div>

        {/* Restart button */}
        <button
          onClick={onRestart}
          className="cursor-pointer rounded border border-cyan-500 bg-transparent px-12 py-4 font-mono text-lg font-bold tracking-[0.3em] text-cyan-400 uppercase transition-all duration-200 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_30px_#00d4ff]"
          style={{ boxShadow: "0 0 15px rgba(0,212,255,0.3)" }}
        >
          ↺ RETRY
        </button>
      </div>
    </div>
  );
}

function getRank(score: number): string {
  if (score >= 50000) return "◈ ACE PILOT ◈";
  if (score >= 20000) return "★ VETERAN ★";
  if (score >= 10000) return "◆ SKILLED ◆";
  if (score >= 5000) return "▲ AVERAGE ▲";
  if (score >= 1000) return "▽ ROOKIE ▽";
  return "○ RECRUIT ○";
}

export default GameOverScreen;
