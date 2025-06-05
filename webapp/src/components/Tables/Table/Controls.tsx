"use client";
import Eye_SVG from "@/SVGs/Eye_SVG";
import TextInput from "@/Inputs/TextInput";
import { debounce } from "@/lib/debounce";
import EyeSlash_SVG from "@/SVGs/EyeSlash_SVG copy";
import { Fragment, useState, useMemo } from "react";
import { useUserContext } from "@/contexts/userContext";
import getSvg from "@/lib/getSvg";

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
    <div className="controls">
      <div className="search">
        <div className="flex flex-row gap-2 items-center">
          <div
            className={`button ${showHideShowDropdown ? "active" : ""}`}
            onClick={() => {
              setShowHideShowDropdown(!showHideShowDropdown);
            }}
          >
            {getSvg({ icon: "eye", size: 50 })}
          </div>

          <div
            className={`button ${showHideShowDropdown ? "active" : ""}`}
            onClick={() => {
              setPinned(!pinned);
            }}
          >
            {getSvg({ icon: "pin", size: 50 })}
          </div>
        </div>

        <div className={`search-bar font-bold ${searchValue ? "focused" : ""}`}>
          <label htmlFor="search-input">{getSvg({ icon: "search", size: 60 })}</label>
          <TextInput
            name="search-input"
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

      <div className={`hide-show ${showHideShowDropdown ? "show" : ""}`}>
        {tableHeaders.map((header: TableHeader, key: number) => {
          if (!header.roles || header.roles.length === 0 || header.roles.includes(userRole)) {
            return (
              <div
                key={key}
                className={`button ${!header.hidden ? "active" : ""}`}
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
                {header.hidden ? <EyeSlash_SVG width={32} height={32} /> : <Eye_SVG width={32} height={32} />}
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
