"use client";
import { useEffect } from "react";
import Chevron_SVG from "../SVGs/Chevron_SVG";
import SelectInput from "../Inputs/SelectInput";

type Props = {
  data: any[];
  tableData: any[];
  currentPage: number;
  searchValue: string;
  postsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPostsPerPage: React.Dispatch<React.SetStateAction<number>>;
  paginateTable: (currentPage: number, postsPerPage: number) => void;
};
export const paginationOptions: Option[] = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: "all",
    label: "All",
  },
];
const TablePagination: React.FC<Props> = (props: Props) => {
  const { searchValue, data, tableData, currentPage, postsPerPage, setCurrentPage, setPostsPerPage, paginateTable } =
    props;

  useEffect(() => {
    paginateTable(1, postsPerPage);
  }, []);
  return (
    <div className="pagination">
      <div>
        {searchValue || postsPerPage === data.length ? (
          <div className="w-full justify-end">
            <p>{searchValue ? tableData.length : data.length} results</p>
          </div>
        ) : (
          <>
            <div className="posts-per-page">
              <div className="min-w-[100px]">
                <SelectInput
                  name="posts-per-page"
                  options={paginationOptions}
                  defaultValue={paginationOptions[0]}
                  onChange={(value: number | "all") => {
                    if (value === "all") value = data.length;
                    setCurrentPage(1);
                    setPostsPerPage(value);
                    paginateTable(1, value);
                  }}
                />
              </div>

              <p>posts per page</p>
            </div>

            <div className="page-navigation">
              <button
                className={`${currentPage <= 1 ? "disabled" : ""}`}
                onClick={() => {
                  var newValue = currentPage - 1;
                  const maxPages = Math.ceil(data.length / postsPerPage);

                  if (newValue < 1) newValue = 1;
                  if (newValue > maxPages) newValue = maxPages;

                  setCurrentPage(newValue);
                  paginateTable(newValue, postsPerPage);
                }}
              >
                <Chevron_SVG direction="left" />
              </button>

              <p>
                {currentPage} / {Math.ceil(data.length / postsPerPage)}
              </p>

              <button
                className={`${currentPage >= Math.ceil(tableData.length / postsPerPage) ? "disabled" : ""}`}
                onClick={() => {
                  var newValue = currentPage + 1;
                  const maxPages = Math.ceil(data.length / postsPerPage);

                  if (newValue < 1) newValue = 1;
                  if (newValue > maxPages) newValue = maxPages;

                  setCurrentPage(newValue);
                  paginateTable(newValue, postsPerPage);
                }}
              >
                <Chevron_SVG direction="right" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TablePagination;
