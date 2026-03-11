interface PauseOverlayProps {
  onResume: () => void;
}

function PauseOverlay({ onResume }: PauseOverlayProps) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="mb-2 font-mono text-sm tracking-[0.5em] text-cyan-500 uppercase">
        ◈ STANDBY ◈
      </div>
      <h2
        className="mb-8 font-mono text-5xl font-black tracking-widest text-white"
        style={{ textShadow: "0 0 20px #00d4ff" }}
      >
        PAUSED
      </h2>

      <div className="mb-8 h-px w-64 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />

      <div className="mb-8 font-mono text-sm text-gray-400">
        Press{" "}
        <kbd className="rounded border border-gray-600 bg-gray-800 px-2 py-0.5 text-cyan-400">
          ESC
        </kbd>{" "}
        to resume
      </div>

      <button
        onClick={onResume}
        className="cursor-pointer rounded border border-cyan-500 bg-transparent px-10 py-3 font-mono text-base font-bold tracking-[0.3em] text-cyan-400 uppercase transition-all duration-200 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_25px_#00d4ff]"
        style={{ boxShadow: "0 0 10px rgba(0,212,255,0.3)" }}
      >
        ▶ RESUME
      </button>
    </div>
  );
}

export default PauseOverlay;
