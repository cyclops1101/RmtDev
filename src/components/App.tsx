import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import { Header, HeaderTop } from "./Header";
import { useDebounce, useSearchQuery } from "../libs/hooks";
import { Sidebar, SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import Sorting from "./SortingControls";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { RESULTS_PER_PAGE } from "../libs/constants";
import { PageDirection, SortBy } from "../libs/types";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const deboucedSearchTerm = useDebounce(searchTerm, 500);
  const { jobItems, isLoading } = useSearchQuery(deboucedSearchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("relevant");

  const totalResults = jobItems.length;
  const totalNumberOfPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
  const jobItemsSortedAndSliced = [...(jobItems || [])]
    ?.sort((a, b) => {
      if (sortBy === "relevant") {
        return b.relevanceScore - a.relevanceScore;
      } else {
        return a.daysAgo - b.daysAgo;
      }
    })
    .slice(
      currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      currentPage * RESULTS_PER_PAGE
    );

  const handlePaginationChange = (direction: PageDirection) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (
      direction === "next" &&
      currentPage < Math.ceil(totalResults / 7)
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleChangeSortBy = (sort: SortBy) => {
    setSortBy(sort);
  };

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount count={totalResults} />
            <Sorting onSortChange={handleChangeSortBy} sortBy={sortBy} />
          </SidebarTop>
          <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />
          <PaginationControls
            currentPage={currentPage}
            onPaginationChange={handlePaginationChange}
            totalNumberOfPages={totalNumberOfPages}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
