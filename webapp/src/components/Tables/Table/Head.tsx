"use client";
import { Fragment } from "react";
import Edit_SVG from "@/SVGs/Edit_SVG";
import SortAsc_SVG from "@/SVGs/SortAsc_SVG";
import Profile_SVG from "@/SVGs/Profile_SVG";
import SortDesc_SVG from "@/SVGs/SortDesc_SVG";
import Pin_SVG from "@/components/SVGs/Pin_SVG";
import SortShuffled_SVG from "@/SVGs/SortShuffled_SVG";
import { useUserContext } from "@/contexts/userContext";

type Props = {
  tableHeaders: TableHeader[];
  sortTableData: (key: number) => void;
};

const TableHead: React.FC<Props> = (props: Props) => {
  const { tableHeaders, sortTableData } = props;
  const { userRole } = useUserContext();

  const getSortIcon = (sortState: TableSortState) => {
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
    <thead className="top-0 left-0 sticky font-bold">
      <tr>
        {tableHeaders.map((header: TableHeader, key: number) => {
          if (header.hidden) return <Fragment key={key} />;

          if (!header.roles || header.roles.length === 0 || header.roles.includes(userRole)) {
            return (
              <th key={key} className="p-2">
                {!header.dataType && (
                  <p className="gap-10 flex flex-row justify-between">
                    <span className="overflow-hidden">{header.label}</span>
                    {header.canSort && (
                      <span
                        className="sort overflow-hidden"
                        onClick={() => {
                          sortTableData(key);
                        }}
                      >
                        {getSortIcon(header.sortState || "shuffled")}
                      </span>
                    )}
                  </p>
                )}

                {header.dataType === "pin" && (
                  <p className="pin gap-10 flex flex-row justify-center">
                    <Pin_SVG />
                  </p>
                )}
                {header.dataType === "edit" && (
                  <p className="edit gap-10 flex flex-row justify-center">
                    <Edit_SVG />
                  </p>
                )}
                {header.dataType === "impersonate" && (
                  <p className="impersonate gap-10 flex flex-row justify-center">
                    <Profile_SVG />
                  </p>
                )}
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
