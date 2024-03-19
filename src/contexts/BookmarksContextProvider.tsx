import { createContext } from "react";
import { useJobItems, useLocalStorage } from "../libs/hooks";
import { JobItemDetail } from "../libs/types";

type BookmarkContextType = {
  bookmarkIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobs: JobItemDetail[];
  isLoading: boolean;
};

export const BookmarkContext = createContext<BookmarkContextType>({
  bookmarkIds: [],
  handleToggleBookmark: () => {},
  bookmarkedJobs: [],
  isLoading: false,
});

type BookmarkProviderProps = {
  children: React.ReactNode;
};

export default function BookmarkContextProvider({
  children,
}: BookmarkProviderProps) {
  const [bookmarkIds, setBookmarkIds] = useLocalStorage<number[]>(
    "bookmarkIds",
    []
  );

  const { jobItems, isLoading } = useJobItems(bookmarkIds);

  const handleToggleBookmark = (id: number) => {
    bookmarkIds.includes(id)
      ? setBookmarkIds((prev) => prev.filter((i) => i !== id))
      : setBookmarkIds((prev) => [...prev, id]);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkIds,
        handleToggleBookmark,
        bookmarkedJobs: jobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
