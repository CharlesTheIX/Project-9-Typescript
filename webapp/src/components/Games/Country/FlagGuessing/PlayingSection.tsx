"use client";
import { GameState } from ".";
import getSortedData from "@/lib/getSortedData";
import createGameData from "@/lib/games/createGameData";
import { useUserContext } from "@/contexts/userContext";
import { useToastContext } from "@/contexts/toastContext";
import { useState, useRef, useEffect, Fragment } from "react";

type Props = {
  timerType: string;
  timerValue: number;
  countryCount: number;
  timeoutValue: number;
  countries: Partial<Country>[];
  correctAnswers: Partial<Country>[];
  setTimerType: React.Dispatch<React.SetStateAction<string>>;
  setTimerValue: React.Dispatch<React.SetStateAction<number>>;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  setCountries: React.Dispatch<React.SetStateAction<Partial<Country>[]>>;
  setCorrectAnswers: React.Dispatch<React.SetStateAction<Partial<Country>[]>>;
};

const PlayingSection: React.FC<Props> = (props: Props) => {
  const {
    countries,
    timerType,
    timerValue,
    setGameState,
    setCountries,
    countryCount,
    timeoutValue,
    setTimerValue,
    setTimerType,
    correctAnswers,
    setCorrectAnswers,
  } = props;
  const toast = useToastContext();
  const { user } = useUserContext();
  const timerValueRef = useRef<number>(0);
  const [value, setValue] = useState<string>("");
  const timerTimeoutRef = useRef<NodeJS.Timeout>(undefined);

  const getScore = (): number => {
    var score = 0;
    if (correctAnswers.length < countryCount) score = correctAnswers.length;
    score = correctAnswers.length * timerValue;
    if (!score) score = 1;
    return score;
  };

  const saveGame = async (): Promise<void> => {
    try {
      if (!user || !user._id) throw new Error("User data not available.");

      const gameData: GameData = {
        userId: user._id,
        score: getScore(),
        gameType: "countries_memory",
      };
      const response = await createGameData(gameData);
      if (response.error) throw new Error(response.message);

      toast.setContent("");
      toast.setHidden(false);
      toast.setType("success");
      toast.setTitle("Game saved");
    } catch (error: any) {
      toast.setHidden(false);
      toast.setType("error");
      toast.setContent(error.message);
      toast.setTitle("Fail to save game");
    }
  };

  const handleOnInput = (target: HTMLInputElement): boolean => {
    if (!timerTimeoutRef.current) {
      timerTimeoutRef.current = setInterval(async () => {
        timerValueRef.current += 1000;
        setTimerValue(timerValueRef.current);

        if (timerValueRef.current > timeoutValue) {
          clearInterval(timerTimeoutRef.current);
          timerTimeoutRef.current = undefined;
          setGameState("game_over");
          setTimerValue(0);
          saveGame();
          return;
        }
      }, 1000);
    }

    const value = target.value;
    const matchedCountry = countries.find((country: Partial<Country>) =>
      country.names?.includes(value.toLocaleLowerCase()),
    );

    if (!matchedCountry) return false;

    setCorrectAnswers((prevValue: Partial<Country>[]) => {
      const newAnswers = [...prevValue, matchedCountry];
      return getSortedData({ sort: "asc", key: "displayName", data: newAnswers });
    });
    setCountries((prevValue: Partial<Country>[]) => {
      return prevValue.filter((country: Partial<Country>) => country._id !== matchedCountry._id);
    });

    if (correctAnswers.length + 1 >= countryCount) {
      clearInterval(timerTimeoutRef.current);
      timerTimeoutRef.current = undefined;
      setGameState("complete");
      setCorrectAnswers([]);
      setTimerType("none");
      setTimerValue(0);
      saveGame();
    }

    return true;
  };

  useEffect(() => {
    const keyPressListener = (event: any) => {
      const isEnterKey = event.code === "Enter";
      if (isEnterKey) setValue("");
    };
    window.addEventListener("keypress", keyPressListener);

    return () => {
      window.removeEventListener("keypress", keyPressListener);
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2 w-full">
        <div className={`input text-input gap-2 flex flex-col text-left w-full`}>
          <label htmlFor="country-input" className="font-bold">
            Input
          </label>

          <input
            type="text"
            value={value}
            name="country-input"
            className="px-5 py-2 outline-none appearance-none"
            onInput={(event: any) => {
              const target = event.currentTarget || event.target;
              const clearInput = handleOnInput(target);

              setValue(target.value);
              if (!!clearInput) setValue("");
            }}
          />
        </div>

        <div className="w-full flex flex-row gap-1 items-center justify-end text-2xl font-bold">
          {timerType && timerType !== "none" && (
            <>
              <p>
                {timerType === "continuos"
                  ? Math.floor(timerValue / 1000)
                  : Math.floor((timeoutValue - timerValue) / 1000)}
                s
              </p>
              <p>|</p>
            </>
          )}

          <p>
            {correctAnswers.length}/{countryCount}
          </p>
        </div>

        <div className="w-full flex flex-row items-center justify-end">
          <button
            className="link-text"
            type="button"
            onClick={async () => {
              setTimerValue(0);
              setTimerType("none");
              setCorrectAnswers([]);
              setGameState("game_over");
              await saveGame();
            }}
          >
            End Game
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-5 flex-wrap items-center text-2xl font-bold">
        {correctAnswers.map((country: Partial<Country>, key: number) => {
          return (
            <Fragment key={key}>
              {key > 0 && <p>|</p>}
              <p>{country.displayName}</p>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PlayingSection;
