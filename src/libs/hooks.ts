import { useEffect, useState } from "react";
import { jobDetail, jobIndex } from "../services/searchApi";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { JobItemDetail } from "./types";

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
  const jobItems = results.map((result) => result.data?.jobItem).filter(jobItem => jobItem !== undefined) as JobItemDetail[];

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

export const useActiveJobItem = () => {
  const id = useActiveId();
  const [jobItem, isLoading] = useJobItem(id);
  if (!id) return [null, false] as const;

  return [jobItem, isLoading] as const;
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
