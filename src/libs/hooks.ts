import { useContext, useEffect, useState } from "react";
import { jobDetail, jobIndex } from "../services/searchApi";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { JobItemDetail } from "./types";
import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";
import { SearchTextContext } from "../contexts/SearchTextContextProvider";
import { JobItemsContext } from "../contexts/JobItemsContextProvider";
import { BookmarkContext } from "../contexts/BookmarksContextProvider";

export const useSearchQuery = (searchTerm: string) => {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchTerm],
    async () => (searchTerm ? jobIndex(searchTerm) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!searchTerm,
      onError: handleError,
    }
  );
  const jobItems = data?.jobItems ?? [];
  const isLoading = isInitialLoading;

  return { jobItems, isLoading } as const;
};

export const useJobItem = (id: number | null) => {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    async () => (id ? jobDetail(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: handleError,
    }
  );
  const jobItem = data?.jobItem;
  const isLoading = isInitialLoading;

  return [jobItem, isLoading] as const;
};

export const useJobItems = (ids: number[]) => {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: async () => jobDetail(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: handleError,
    })),
  });
  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => jobItem !== undefined) as JobItemDetail[];

  const isLoading = results.some((result) => result.isLoading);

  return { jobItems, isLoading } as const;
};

export const useActiveId = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  useEffect(() => {
    const handleHashChange = () => {
      setActiveId(+window.location.hash.slice(1));
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
};

// utility hooks

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: (event: MouseEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const shouldClose = refs.every((ref) => {
        return ref.current && !ref.current.contains(event.target as Node);
      });

      if (shouldClose) handler(event);
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [refs, handler]);
}

// context hooks
export const useActiveIdContext = () => {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error("useActiveIdContext must be used within ActiveIdProvider");
  }
  return context;
};

export const useJobItemsContext = () => {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw new Error("useJobItemsContext must be used within JobItemsProvider");
  }
  return context;
};

export const useSearchTextContext = () => {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error("useSearchTextContext must be used within SearchTextProvider");
  }
  return context;
};

export const useBookmarkContext = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarkContext must be used within BookmarkProvider");
  }
  return context;
}
