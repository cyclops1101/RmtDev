import { useEffect, useState } from "react";
import { JobItem, JobItemDetail } from "./types";
import { jobDetail, jobIndex } from "../services/searchApi";

export const useJobItems = (searchTerm: string) => {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 250);
  const totalResults = jobItems.length;

  const jobItemsSliced = jobItems.slice(0, 7);
  useEffect(() => {
    if (!searchTerm) return;
    setIsLoading(true);
    const fetchData = async () => {
      const data = await jobIndex(debouncedSearchTerm);
      setJobItems(data.jobItems);
      setIsLoading(false);
    };
    if (debouncedSearchTerm) {
      fetchData();
    }
  }, [debouncedSearchTerm]);

  return { jobItemsSliced, isLoading, totalResults } as const;
};

export const useJobItem = (id: number | null) => {
  const [jobItem, setJobItem] = useState<JobItemDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    const fetchData = async () => {
      const data = await jobDetail(id.toString());
      setJobItem(data.jobItem);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

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
