"use client";
import { useState } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableControls from "./TableControls";
import TablePagination, { paginationOptions } from "./TablePagination";

export type SortState = "asc" | "desc" | "shuffled";
export type TableHeader = {
  value: any;
  label: string;
  hidden?: boolean;
  canSort?: boolean;
  canCopy?: boolean;
  roles?: UserRole[];
  searchable?: boolean;
  sortState?: SortState;
  dataType?: "edit" | "impersonate";
};

type Props = {
  data: any[];
  pagination?: boolean;
  headers: TableHeader[];
  collection?: "countries" | "users";
};

const TableCore: React.FC<Props> = (props: Props) => {
  const { headers, data, pagination, collection } = props;
  const [tableData, setTableData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [tableHeaders, setTableHeaders] = useState<TableHeader[]>(headers);
  const [postsPerPage, setPostsPerPage] = useState<number>(paginationOptions[0].value as number);

  const getNextSortState = (sortState: SortState | undefined): SortState => {
    switch (sortState) {
      case "asc":
        return "desc";
      case "desc":
        return "asc";
      case "shuffled":
        return "asc";
      default:
        return "asc";
    }
  };

  const hideShowHeaders = (index: number): void => {
    setTableHeaders((prevValue: TableHeader[]) => {
      const newHeaders = [...prevValue];
      const header = { ...newHeaders[index] };
      header.hidden = !header.hidden;
      newHeaders[index] = header;
      return newHeaders;
    });
  };

  const sortTableData = (key: number): void => {
    const newHeaders = [...tableHeaders];
    const header = { ...newHeaders[key] };
    header.sortState = getNextSortState(header.sortState);
    newHeaders[key] = header;
    setTableHeaders(newHeaders);
    setTableData((prevValue: any[]) => {
      const newData = [...prevValue];
      newHeaders.map((header: TableHeader) => {
        if (!header.sortState || !header.canSort) return;
        if (header.sortState === "shuffled") {
          for (let i = newData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newData[i], newData[j]] = [newData[j], newData[i]];
          }
          return;
        }
        newData.sort((a, b) => {
          const aName = a[header.value];
          const bName = b[header.value];
          const aIsUndefined = aName === undefined;
          const bIsUndefined = bName === undefined;
          if (aIsUndefined && bIsUndefined) return 0;
          if (aIsUndefined) return 1;
          if (bIsUndefined) return -1;
          switch (header.sortState) {
            case "asc":
              return aName!.localeCompare(bName!);
            case "desc":
              return bName!.localeCompare(aName!);
          }
        });
      });
      return newData;
    });
  };

  const searchTableTable = (searchValue: string): void => {
    if (!searchValue) return paginateTable(1, paginationOptions[0].value as number);
    const filteredData = data.filter((item: any) => {
      return tableHeaders.some((header: TableHeader) => {
        const key = header.value;
        const cellValue = item[key];
        if (cellValue === undefined || cellValue === null) return false;
        return String(cellValue).toLowerCase().includes(searchValue.toLowerCase());
      });
    });
    setPostsPerPage(data.length);
    setTableData(filteredData);
    setCurrentPage(1);
  };

  const paginateTable = (currentPage: number, postsPerPage: number): void => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = Math.min(startIndex + postsPerPage, data.length);
    const dataSlice = data.slice(startIndex, endIndex);
    setPostsPerPage(postsPerPage);
    setTableData(dataSlice);
    setCurrentPage(currentPage);
  };

  return (
    <>
      <TableControls
        searchValue={searchValue}
        tableHeaders={tableHeaders}
        setSearchValue={setSearchValue}
        hideShowHeaders={hideShowHeaders}
        searchTableTable={searchTableTable}
      />

      <div className="scrollbar-x scrollbar-y inner">
        {!tableData || tableData.length === 0 ? (
          <p>No data to display</p>
        ) : (
          <table>
            <TableHead tableHeaders={tableHeaders} sortTableData={sortTableData} />
            <TableBody tableData={tableData} tableHeaders={tableHeaders} collection={collection} />
          </table>
        )}
      </div>

      {tableData && tableData.length > 0 && pagination && (
        <TablePagination
          data={data}
          tableData={tableData}
          currentPage={currentPage}
          searchValue={searchValue}
          postsPerPage={postsPerPage}
          paginateTable={paginateTable}
          setCurrentPage={setCurrentPage}
          setPostsPerPage={setPostsPerPage}
        />
      )}
    </>
  );
};

export default TableCore;
