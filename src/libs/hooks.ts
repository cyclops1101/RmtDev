import { useEffect, useState } from "react";
import { jobDetail, jobIndex } from "../services/searchApi";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";

export const useJobItems = (searchTerm: string) => {
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

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};
