import { BASE_API_URL } from "../libs/constants";

export const jobIndex = async (searchTerm: string) => {
  const response = await fetch(`${BASE_API_URL}?search=${searchTerm}`);
  const data = await response.json();
  return data;
};

export const jobDetail = async (id: string) => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  const data = await response.json();
  return data;
}
