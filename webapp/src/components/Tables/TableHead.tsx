"use client";
import { Fragment } from "react";
import SortAsc_SVG from "../SVGs/SortAsc_SVG";
import SortDesc_SVG from "../SVGs/SortDesc_SVG";
import { SortState, TableHeader } from "./TableCore";
import { useUserContext } from "@/contexts/userContext";
import SortShuffled_SVG from "../SVGs/SortShuffled_SVG";

type Props = {
  tableHeaders: TableHeader[];
  sortTableData: (key: number) => void;
};

const TableHead: React.FC<Props> = (props: Props) => {
  const { tableHeaders, sortTableData } = props;
  const { userRole } = useUserContext();

  const getSortIcon = (sortState: SortState) => {
    switch (sortState) {
      case "asc":
        return <SortAsc_SVG />;
      case "desc":
        return <SortDesc_SVG />;
      case "shuffled":
        return <SortShuffled_SVG />;
      default:
        return <SortShuffled_SVG />;
    }
  };
  return (
    <thead>
      <tr>
        {tableHeaders.map((header: TableHeader, key: number) => {
          if (header.hidden) return <Fragment key={key} />;

          if (!header.roles || header.roles.length === 0 || header.roles.includes(userRole)) {
            return (
              <th key={key}>
                <p>
                  {!header.dataType && (
                    <>
                      <span>{header.label}</span>
                      {header.canSort && (
                        <span
                          onClick={() => {
                            sortTableData(key);
                          }}
                        >
                          {getSortIcon(header.sortState || "shuffled")}
                        </span>
                      )}
                    </>
                  )}

                  {header.dataType === "edit" && <span>Edit</span>}
                </p>
              </th>
            );
          }

          return <Fragment key={key} />;
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
