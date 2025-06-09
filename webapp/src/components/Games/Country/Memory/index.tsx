"use client";
import { useState } from "react";
import StartSection from "./StartSection";
import PlayingSection from "./PlayingSection";
import CompleteSection from "./CompleteSection";
import GameOverSection from "./GameOverSection";
import LoadingContainer from "@/components/LoadingContainer";

export type GameState = "start" | "playing" | "complete" | "game_over";
const oneMinute = 1000 * 60;

const MemoryGame: React.FC = () => {
  const [timerValue, setTimerValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timerType, setTimerType] = useState<string>("none");
  const [countryCount, setCountryCount] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>("start");
  const [countries, setCountries] = useState<Partial<Country>[]>([]);
  const [timeoutValue, setTimeoutValue] = useState<number>(oneMinute);
  const [continent, setContinent] = useState<Continent | "all" | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<Partial<Country>[]>([]);

  return (
    <div className="game-controller">
      {isLoading ? (
        <LoadingContainer />
      ) : (
        <>
          {gameState === "start" && (
            <StartSection
              timerType={timerType}
              continent={continent}
              setTimerType={setTimerType}
              setContinent={setContinent}
              setCountries={setCountries}
              setGameState={setGameState}
              setIsLoading={setIsLoading}
              setTimeoutValue={setTimeoutValue}
              setCountryCount={setCountryCount}
            />
          )}

          {gameState === "playing" && (
            <PlayingSection
              timerType={timerType}
              countries={countries}
              timerValue={timerValue}
              setTimerType={setTimerType}
              timeoutValue={timeoutValue}
              countryCount={countryCount}
              setCountries={setCountries}
              setGameState={setGameState}
              setTimerValue={setTimerValue}
              correctAnswers={correctAnswers}
              setCorrectAnswers={setCorrectAnswers}
            />
          )}

          {gameState === "complete" && (
            <CompleteSection
              continent={continent}
              timerValue={timerValue}
              setTimerType={setTimerType}
              countryCount={countryCount}
              setGameState={setGameState}
              setTimerValue={setTimerValue}
              setCorrectAnswers={setCorrectAnswers}
            />
          )}

          {gameState === "game_over" && (
            <GameOverSection
              continent={continent}
              countries={countries}
              setTimerType={setTimerType}
              timeoutValue={timeoutValue}
              countryCount={countryCount}
              setGameState={setGameState}
              setTimerValue={setTimeoutValue}
              setCorrectAnswers={setCorrectAnswers}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MemoryGame;
