import { useState } from "react";
import StartScreen from "./components/StartScreen";
import GameCanvas from "./components/GameCanvas";
import GameOverScreen from "./components/GameOverScreen";
import { GameState } from "./game/types";

export type AppScreen = "start" | "playing" | "gameover";

export interface GameResult {
  score: number;
  kills: number;
  wave: number;
}

export default function App() {
  const [screen, setScreen] = useState<AppScreen>("start");
  const [gameResult, setGameResult] = useState<GameResult>({
    score: 0,
    kills: 0,
    wave: 1,
  });

  const handleStart = () => setScreen("playing");

  const handleGameOver = (state: GameState) => {
    setGameResult({ score: state.score, kills: state.kills, wave: state.wave });
    setScreen("gameover");
  };

  const handleRestart = () => setScreen("playing");

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {screen === "start" && <StartScreen onStart={handleStart} />}
      {screen === "playing" && <GameCanvas onGameOver={handleGameOver} />}
      {screen === "gameover" && (
        <GameOverScreen result={gameResult} onRestart={handleRestart} />
      )}
    </div>
  );
}
