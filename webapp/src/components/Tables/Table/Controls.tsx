"use client";
import Eye_SVG from "@/SVGs/Eye_SVG";
import { debounce } from "@/lib/debounce";
import TextInput from "@/Inputs/TextInput";
import Pin_SVG from "@/components/SVGs/Pin_SVG";
import EyeSlash_SVG from "@/SVGs/EyeSlash_SVG copy";
import { Fragment, useState, useMemo } from "react";
import Search_SVG from "@/components/SVGs/Search_SVG";
import { useUserContext } from "@/contexts/userContext";

type Props = {
  pinned: boolean;
  searchValue: string;
  tableHeaders: TableHeader[];
  formPreferences: FormPreferences | null;
  hideShowHeaders: (index: number) => void;
  searchTableTable: (searchValue: string) => void;
  setPinned: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setFormPreferences: React.Dispatch<React.SetStateAction<FormPreferences | null>>;
};

const TableControls: React.FC<Props> = (props: Props) => {
  const {
    pinned,
    setPinned,
    searchValue,
    tableHeaders,
    setSearchValue,
    hideShowHeaders,
    searchTableTable,
    formPreferences,
    setFormPreferences,
  } = props;
  const { userRole } = useUserContext();
  const [showHideShowDropdown, setShowHideShowDropdown] = useState<boolean>(false);
  const debouncedLogSearch = useMemo(() => debounce(searchTableTable, 300), [searchTableTable]);

  return (
    <div className="controls gap-2 p-2 flex overflow-hidden flex-col">
      <div className="search gap-2 flex flex-row w-full justify-between">
        <div className="flex flex-row gap-2 items-center px-2 w-auto gap-2 wrap justify-start">
          <div
            className={`${
              showHideShowDropdown ? "active" : ""
            } button px-2 py-1 gap-0 flex cursor-pointer overflow-hidden items-center flex-row`}
            onClick={() => {
              setShowHideShowDropdown(!showHideShowDropdown);
            }}
          >
            <Eye_SVG width={30} height={30} />
          </div>

          <div
            className={`${
              pinned ? "active" : ""
            } button px-2 py-1 gap-0 flex cursor-pointer overflow-hidden items-center flex-row`}
            onClick={() => {
              setPinned(!pinned);
            }}
          >
            <Pin_SVG width={30} height={30} />
          </div>
        </div>

        <div
          className={`search-bar font-bold ${
            searchValue ? "focused" : ""
          } px-2 w-auto flex flex-row items-center wrap justify-start gap-2`}
        >
          <label htmlFor="search-input">
            <Search_SVG width={40} height={40} />
          </label>
          <TextInput
            name="search-input"
            className="border-[0px] p-0"
            defaultValue={searchValue}
            onInput={(inputElement: any) => {
              const value = inputElement.value;
              const newFormPreferences = formPreferences || {};
              newFormPreferences.searchValue = value;

              setSearchValue(value);
              debouncedLogSearch(value);
              setFormPreferences(newFormPreferences);
            }}
          />
        </div>
      </div>

      <div className={`hide-show ${showHideShowDropdown ? "show" : ""} gap-5 flex flex-row overflow-hidden wrap px-2`}>
        {tableHeaders.map((header: TableHeader, key: number) => {
          if (!header.roles || header.roles.length === 0 || header.roles.includes(userRole)) {
            return (
              <div
                key={key}
                className={`button ${
                  !header.hidden ? "active" : ""
                } px-2 flex wrap items-center flex-row justify-start gap-5`}
                onClick={() => {
                  const newFormPreferences: any = formPreferences || {};
                  if (!newFormPreferences.hide) newFormPreferences.hide = [];

                  if (!newFormPreferences.hide.includes(tableHeaders[key].value)) {
                    newFormPreferences.hide.push[tableHeaders[key].value];
                  } else {
                    newFormPreferences.hide.filter((item: string) => tableHeaders[key].value !== item);
                  }

                  setFormPreferences(newFormPreferences);
                  hideShowHeaders(key);
                }}
              >
                <p>{header.label}</p>
                {header.hidden ? <EyeSlash_SVG width={24} height={24} /> : <Eye_SVG width={24} height={24} />}
              </div>
            );
          }

          return <Fragment key={key} />;
        })}
      </div>
    </div>
  );
};

export default TableControls;
