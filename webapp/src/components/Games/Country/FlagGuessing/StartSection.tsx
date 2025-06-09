"use client";
import { GameState } from ".";
import { FormEvent } from "react";
import SelectInput from "@/Inputs/SelectInput";
import NumberInput from "@/Inputs/NumberInput";
import getAllCountries from "@/lib/countries/getAllCountries";

type Props = {
  timerType: string;
  continent: Continent | "all" | null;
  setTimerType: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTimeoutValue: React.Dispatch<React.SetStateAction<number>>;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  setCountryCount: React.Dispatch<React.SetStateAction<number>>;
  setCountries: React.Dispatch<React.SetStateAction<Partial<Country>[]>>;
  setContinent: React.Dispatch<React.SetStateAction<Continent | "all" | null>>;
};

const StartSection: React.FC<Props> = (props: Props) => {
  const {
    timerType,
    continent,
    setIsLoading,
    setGameState,
    setCountries,
    setContinent,
    setTimerType,
    setCountryCount,
    setTimeoutValue,
  } = props;

  const fetchCountries = async (item: Continent | "all"): Promise<void> => {
    if (item === continent) return;
    setIsLoading(true);

    try {
      var response: ApiResponse;

      if (item === "all") {
        response = await getAllCountries({ limit: 200 });
      } else {
        response = await getAllCountries({ limit: 200, and: "continent", andValue: item });
      }

      if (response.error) throw new Error(response.message);

      setContinent(item);
      setIsLoading(false);
      setCountries(response.data || []);
      setCountryCount(response.data?.length || 0);
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  const handleFormSubmission = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const target = (event.currentTarget || event.target) as HTMLFormElement;
      const formData = new FormData(target);
      const continent = JSON.parse(formData.get("continent")?.toString() || "").value;
      const timerType = JSON.parse(formData.get("timer-type")?.toString() || "").value;
      const timeout = parseInt(formData.get("timeout")?.toString() || `${1}`) * (60 * 1000);

      if (!continent || !timerType) throw new Error();
      if (timerType === "count-down" && !timeout) throw new Error();

      await fetchCountries(continent);
      setTimeoutValue(timeout);
      setGameState("playing");
      setTimerType(timerType);
      setIsLoading(false);
    } catch (error: any) {
      setCountries([]);
      setIsLoading(false);
    }
  };

  return (
    <div className="controller">
      <form
        className="flex flex-row gap-2 items-end justify-between"
        onSubmit={async (event: FormEvent) => {
          handleFormSubmission(event);
        }}
      >
        <div className="flex flex-row gap-2 w-auto items-start">
          <SelectInput
            name="continent"
            label="Continent"
            options={[
              { value: "all", label: "All" },
              { value: "Asia", label: "Asia" },
              { value: "Africa", label: "Africa" },
              { value: "Europe", label: "Europe" },
              { value: "Oceania", label: "Oceania" },
              { value: "North America", label: "North America" },
              { value: "South America", label: "South America" },
            ]}
          />
          <SelectInput
            name="timer-type"
            label="Timer Type"
            options={[
              { value: "none", label: "None" },
              { value: "count-down", label: "Count Down" },
              { value: "continuos", label: "Continuos" },
            ]}
            onChange={(target: any) => {
              setTimerType(target);
            }}
          />
          {timerType === "count-down" && (
            <NumberInput min={1} step={1} max={100} name="timeout" defaultValue="10" label="Time Limit" />
          )}
        </div>

        <input type="submit" className="button" value="Submit" />
      </form>
    </div>
  );
};

export default StartSection;
