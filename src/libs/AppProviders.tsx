import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActiveIdProvider } from "../contexts/ActiveIdContextProvider";
import BookmarkContextProvider from "../contexts/BookmarksContextProvider";
import { SearchTextContextProvider } from "../contexts/SearchTextContextProvider";
import JobItemsContextProvider from "../contexts/JobItemsContextProvider";

type ProvidersProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export default function AppProviders({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ActiveIdProvider>
        <BookmarkContextProvider>
          <SearchTextContextProvider>
            <JobItemsContextProvider>{children}</JobItemsContextProvider>
          </SearchTextContextProvider>
        </BookmarkContextProvider>
      </ActiveIdProvider>
    </QueryClientProvider>
  );
}
