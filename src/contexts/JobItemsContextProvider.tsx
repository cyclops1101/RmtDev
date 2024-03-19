import { createContext, useCallback, useMemo, useState } from "react";
import { JobItem, PageDirection, SortBy } from "../libs/types";
import { useSearchQuery, useSearchTextContext } from "../libs/hooks";
import { RESULTS_PER_PAGE } from "../libs/constants";

type JobItemsContextType = {
  jobItems: JobItem[] | undefined;
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalResults: number;
  totalNumberOfPages: number;
  jobItemsSortedAndSliced: JobItem[];
  handlePaginationChange: (direction: PageDirection) => void;
  sortBy: SortBy;
  handleChangeSortBy: (sort: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContextType>({
  jobItems: [],
  isLoading: false,
  currentPage: 1,
  setCurrentPage: () => {},
  totalResults: 0,
  totalNumberOfPages: 0,
  jobItemsSortedAndSliced: [],
  handlePaginationChange: () => {},
  sortBy: "relevant",
  handleChangeSortBy: () => {},
});

type JobContextProviderProps = {
  children: React.ReactNode;
};

export default function JobItemsContextProvider({
  children,
}: JobContextProviderProps) {
  const { debouncedSearchText } = useSearchTextContext();
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  const totalResults = jobItems.length;
  const totalNumberOfPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])]?.sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [jobItems, sortBy]
  );

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted?.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [currentPage, jobItemsSorted]
  );

  const handlePaginationChange = useCallback((direction: PageDirection) => {
    if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    }
  }, []);

  const handleChangeSortBy = useCallback((sort: SortBy) => {
    setSortBy(sort);
  }, []);

  const contextValue = useMemo(
    () => ({
      jobItems,
      isLoading,
      currentPage,
      setCurrentPage,
      totalResults,
      totalNumberOfPages,
      jobItemsSortedAndSliced,
      handlePaginationChange,
      sortBy,
      handleChangeSortBy,
    }),
    [
      jobItems,
      isLoading,
      currentPage,
      setCurrentPage,
      totalResults,
      totalNumberOfPages,
      jobItemsSortedAndSliced,
      handlePaginationChange,
      sortBy,
      handleChangeSortBy,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
