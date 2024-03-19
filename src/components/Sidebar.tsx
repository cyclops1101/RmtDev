import { useJobItemsContext } from "../libs/hooks";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import Sorting from "./SortingControls";

export function Sidebar() {
  const { jobItemsSortedAndSliced, isLoading } = useJobItemsContext();
  return (
    <div className="sidebar">
      <SidebarTop />
      <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />
      <PaginationControls />
    </div>
  );
}

export const SidebarTop = () => {
  return (
    <div className="sidebar__top">
      <ResultsCount />
      <Sorting />
    </div>
  );
};
