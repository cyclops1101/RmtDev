import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import { Header, HeaderTop } from "./Header";
import { useDebounce, useJobItems } from "../libs/hooks";
import { Sidebar, SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import Sorting from "./SortingControls";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const deboucedSearchTerm = useDebounce(searchTerm, 500);
  const { jobItems, isLoading } = useJobItems(deboucedSearchTerm);
  const totalResults = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);

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
            <Sorting />
          </SidebarTop>
          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
