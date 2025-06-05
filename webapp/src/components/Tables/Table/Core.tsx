"use client";
import TableHead from "./Head";
import TableBody from "./Body";
import TableControls from "./Controls";
import { useEffect, useState } from "react";
import getSortedData from "@/lib/getSortedData";
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
  const [pinned, setPinned] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pinnedTableData, setPinnedTableData] = useState<any[]>([]);
  const [favouriteTableData, setFavouriteTableData] = useState<any[]>([]);
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
    var newData = [...tableData];
    const newHeaders = [...tableHeaders];
    const header = { ...newHeaders[key] };
    var newPinnedData = [...pinnedTableData];
    var newFavouriteData = [...favouriteTableData];
    header.sortState = getNextSortState(header.sortState);
    newHeaders[key] = header;
    newHeaders.map((header: TableHeader) => {
      if (!header.sortState || !header.canSort) return;
      if (header.sortState === "shuffled") {
        for (let i = newData.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newData[i], newData[j]] = [newData[j], newData[i]];
          [newPinnedData[i], newPinnedData[j]] = [newPinnedData[j], newPinnedData[i]];
        }
        return;
      }
      newData = getSortedData({ sort: header.sortState, key: header.value, data: newData });
      newPinnedData = getSortedData({ sort: header.sortState, key: header.value, data: newPinnedData });
      newFavouriteData = getSortedData({ sort: header.sortState, key: header.value, data: newFavouriteData });
    });

    setTableData(newData);
    setTableHeaders(newHeaders);
    setPinnedTableData(newPinnedData);
    setFavouriteTableData(newFavouriteData);
  };

  const searchTableTable = (searchValue: string): void => {
    setPinned(false);
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
    var maxLength = pinned ? pinnedTableData.length : data.length;
    const endIndex = Math.min(startIndex + postsPerPage, maxLength);
    const dataSlice = pinned ? pinnedTableData.slice(startIndex, endIndex) : data.slice(startIndex, endIndex);
    pinned ? setPinnedTableData(dataSlice) : setTableData(dataSlice);
    setPostsPerPage(postsPerPage);
    setCurrentPage(currentPage);
  };

  useEffect(() => {
    if (formPreferences?.postsPerPage && pagination) paginateTable(currentPage, formPreferences.postsPerPage);
    if (formPreferences?.searchValue) searchTableTable(formPreferences.searchValue);
  }, []);

  return (
    <>
      <TableControls
        pinned={pinned}
        setPinned={setPinned}
        searchValue={searchValue}
        tableHeaders={tableHeaders}
        setSearchValue={setSearchValue}
        hideShowHeaders={hideShowHeaders}
        formPreferences={formPreferences}
        searchTableTable={searchTableTable}
        setFormPreferences={setFormPreferences}
      />

      <div className="scrollbar-x scrollbar-y inner">
        {pinned ? (
          <>
            {!pinnedTableData || pinnedTableData.length === 0 ? (
              <p>No pined data to display</p>
            ) : (
              <table className="pinned">
                <TableHead tableHeaders={tableHeaders} sortTableData={sortTableData} />
                <TableBody
                  collection={collection}
                  tableData={pinnedTableData}
                  tableHeaders={tableHeaders}
                  pinnedTableData={pinnedTableData}
                  setPinnedTableData={setPinnedTableData}
                />
              </table>
            )}
          </>
        ) : (
          <>
            {!tableData || tableData.length === 0 ? (
              <p>No data to display</p>
            ) : (
              <table>
                <TableHead tableHeaders={tableHeaders} sortTableData={sortTableData} />
                <TableBody
                  tableData={tableData}
                  collection={collection}
                  tableHeaders={tableHeaders}
                  pinnedTableData={pinnedTableData}
                  setPinnedTableData={setPinnedTableData}
                />
              </table>
            )}
          </>
        )}
      </div>

      {tableData && tableData.length > 0 && pagination && (
        <TablePagination
          data={data}
          pinned={pinned}
          tableData={tableData}
          currentPage={currentPage}
          searchValue={searchValue}
          postsPerPage={postsPerPage}
          paginateTable={paginateTable}
          setCurrentPage={setCurrentPage}
          pinnedTableData={pinnedTableData}
          setPostsPerPage={setPostsPerPage}
        />
      )}
    </>
  );
};

export default TableCore;
