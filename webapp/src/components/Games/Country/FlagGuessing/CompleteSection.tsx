"use client";
import { GameState } from ".";

type Props = {
  timerValue: number;
  countryCount: number;
  continent: Continent | "all" | null;
  setTimerType: React.Dispatch<React.SetStateAction<string>>;
  setTimerValue: React.Dispatch<React.SetStateAction<number>>;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  setCorrectAnswers: React.Dispatch<React.SetStateAction<Partial<Country>[]>>;
};

const CompleteSection: React.FC<Props> = (props: Props) => {
  const { timerValue, countryCount, setGameState, continent, setTimerType, setTimerValue, setCorrectAnswers } = props;

  return (
    <div className="flex flex-col gap-5">
      <p className="font-bold text-5xl">Game Complete!</p>

      <p className="text-2xl font-bold">
        You correctly guessed all {countryCount} Countries in {continent === "all" ? "the world" : continent} in{" "}
        {Math.floor(timerValue / 1000)}s.
      </p>

      <div>
        <button
          type="button"
          className="button"
          onClick={() => {
            setTimerValue(0);
            setTimerType("none");
            setCorrectAnswers([]);
            setGameState("start");
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default CompleteSection;
