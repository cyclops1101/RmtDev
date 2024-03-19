import { createContext, useState } from "react";
import { useDebounce } from "../libs/hooks";

type TSearchTextContext = {
    searchText: string;
    debouncedSearchText: string;
    handleChangeSearchText: (searchText: string) => void;
};

export const SearchTextContext = createContext<TSearchTextContext>({
    searchText: "",
    debouncedSearchText: "",
    handleChangeSearchText: () => {},
});

type TSearchTextContextProvider = {
    children: React.ReactNode;
};

export const SearchTextContextProvider = ({ children }: TSearchTextContextProvider) => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const handleChangeSearchText = (searchText: string) => {
    setSearchText(searchText);
  };
  return (
    <SearchTextContext.Provider value={{ searchText, debouncedSearchText, handleChangeSearchText }}>
      {children}
    </SearchTextContext.Provider>
  );
};
