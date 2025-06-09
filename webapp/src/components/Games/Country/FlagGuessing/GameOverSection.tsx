"use client";
import { GameState } from ".";
import { Fragment } from "react";

type Props = {
  countryCount: number;
  timeoutValue: number;
  countries: Partial<Country>[];
  continent: Continent | "all" | null;
  setTimerType: React.Dispatch<React.SetStateAction<string>>;
  setTimerValue: React.Dispatch<React.SetStateAction<number>>;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  setCorrectAnswers: React.Dispatch<React.SetStateAction<Partial<Country>[]>>;
};

const GameOverSection: React.FC<Props> = (props: Props) => {
  const {
    continent,
    countries,
    countryCount,
    setGameState,
    timeoutValue,
    setTimerType,
    setTimerValue,
    setCorrectAnswers,
  } = props;
  return (
    <div className="flex flex-col gap-5 ">
      <p className="font-bold text-5xl">Game Over!</p>

      <p className="text-2xl font-bold">
        You correctly guessed {countryCount - countries.length} Countries in{" "}
        {continent === "all" ? "the world" : continent} in {Math.floor(timeoutValue / 1000)}s.
      </p>

      <div className="flex flex-col gap-1">
        <p>What did you miss?</p>

        <div className="flex flex-row flex-wrap gap-5 text-2xl font-bold">
          {countries.map((country: Partial<Country>, key: number) => {
            return (
              <Fragment key={key}>
                {key > 0 && <p>|</p>}
                <p>{country.displayName}</p>
              </Fragment>
            );
          })}
        </div>
      </div>

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
          Retry
        </button>
      </div>
    </div>
  );
};

export default GameOverSection;
