import { BASE_API_URL } from "../libs/constants";
import { JobItem, JobItemDetail } from "../libs/types";

type JobIndexApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

type JobDetailApiResponse = {
  public: boolean;
  jobItem: JobItemDetail;
};

export const jobIndex = async (
  searchTerm: string
): Promise<JobIndexApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchTerm}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.description);
  }
  const data = await response.json();
  return data;
};

export const jobDetail = async (id: number): Promise<JobDetailApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.description);
  }
  const data = await response.json();
  return data;
};
