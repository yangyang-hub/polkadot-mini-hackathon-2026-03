import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { WagmiProvider, useConnection } from "wagmi";
import { Connection } from "./components/Connection";
import GameCanvas from "./components/GameCanvas";
import GameOverScreen from "./components/GameOverScreen";
import StartScreen from "./components/StartScreen";
import { WalletOptions } from "./components/WalletOptions";
import { config } from "./config";
import type { GameState } from "./game/types";

export type AppScreen = "start" | "playing" | "gameover";

export interface GameResult {
  score: number;
  kills: number;
  wave: number;
}

const queryClient = new QueryClient();

function ConnectWallet() {
  const { isConnected } = useConnection();
  if (isConnected) return <Connection />;
  return <WalletOptions />;
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
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="relative h-screen w-screen overflow-hidden bg-black">
          {screen === "start" && (
            <StartScreen onStart={handleStart}>
              <ConnectWallet />
            </StartScreen>
          )}
          {screen === "playing" && <GameCanvas onGameOver={handleGameOver} />}
          {screen === "gameover" && (
            <GameOverScreen result={gameResult} onRestart={handleRestart} />
          )}
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
