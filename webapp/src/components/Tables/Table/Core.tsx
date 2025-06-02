"use client";
import TableHead from "./Head";
import TableBody from "./Body";
import TableControls from "./Controls";
import { useEffect, useState } from "react";
import TablePagination, { paginationOptions } from "./Pagination";

type Props = {
  data: any[];
  pagination?: boolean;
  headers: TableHeader[];
  collection?: "countries" | "users";
  formPreferences: FormPreferences | null;
  setFormPreferences: React.Dispatch<React.SetStateAction<FormPreferences | null>>;
};

const TableCore: React.FC<Props> = (props: Props) => {
  const { headers, data, pagination, collection, formPreferences, setFormPreferences } = props;
  const [tableData, setTableData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tableHeaders, setTableHeaders] = useState<TableHeader[]>(headers);
  const [searchValue, setSearchValue] = useState<string>(formPreferences?.searchValue || "");
  const [postsPerPage, setPostsPerPage] = useState<number>(paginationOptions[0].value as number);

  const getNextSortState = (sortState: TableSortState | undefined): TableSortState => {
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

  useEffect(() => {
    if (formPreferences?.postsPerPage && pagination) paginateTable(currentPage, formPreferences.postsPerPage);
    if (formPreferences?.searchValue) searchTableTable(formPreferences.searchValue);
  }, []);

  return (
    <>
      <TableControls
        searchValue={searchValue}
        tableHeaders={tableHeaders}
        setSearchValue={setSearchValue}
        hideShowHeaders={hideShowHeaders}
        formPreferences={formPreferences}
        searchTableTable={searchTableTable}
        setFormPreferences={setFormPreferences}
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
