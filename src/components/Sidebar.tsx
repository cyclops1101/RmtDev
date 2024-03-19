import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import Sorting from "./SortingControls";

export function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarTop />
      
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
