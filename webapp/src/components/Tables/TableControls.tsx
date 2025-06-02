"use client";
import Eye_SVG from "../SVGs/Eye_SVG";
import { TableHeader } from "./TableCore";
import TextInput from "../Inputs/TextInput";
import { debounce } from "@/functions/debounce";
import { Fragment, useState, useMemo } from "react";
import EyeSlash_SVG from "../SVGs/EyeSlash_SVG copy";
import { useUserContext } from "@/contexts/userContext";

type Props = {
  searchValue: string;
  tableHeaders: TableHeader[];
  hideShowHeaders: (index: number) => void;
  searchTableTable: (searchValue: string) => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const TableControls: React.FC<Props> = (props: Props) => {
  const { tableHeaders, hideShowHeaders, searchTableTable, setSearchValue, searchValue } = props;
  const { userRole } = useUserContext();
  const [showHideShowDropdown, setShowHideShowDropdown] = useState<boolean>(false);
  const debouncedLogSearch = useMemo(() => debounce(searchTableTable, 300), [searchTableTable]);

  return (
    <div className="controls">
      <div className="search">
        <div
          onClick={() => {
            setShowHideShowDropdown(!showHideShowDropdown);
          }}
        >
          <p className={`button ${showHideShowDropdown ? "active" : ""}`}>Hide / Show</p>
        </div>

        <div className={`search-bar font-bold ${searchValue ? "focused" : ""}`}>
          <TextInput
            label="Search"
            name="search-input"
            defaultValue={searchValue}
            onInput={(inputElement: any) => {
              const value = inputElement.value;
              setSearchValue(value);
              debouncedLogSearch(value);
            }}
          />
        </div>
      </div>

      <div className={`hide-show ${showHideShowDropdown ? "show" : ""}`}>
        <div>
          {tableHeaders.map((header: TableHeader, key: number) => {
            if (!header.roles || header.roles.length === 0 || header.roles.includes(userRole)) {
              return (
                <div
                  key={key}
                  className={`button ${!header.hidden ? "active" : ""}`}
                  onClick={() => {
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
    </div>
  );
};

export default TableControls;
