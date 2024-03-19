import { createContext, useContext } from "react";
import { useActiveId } from "../libs/hooks";

type ActiveIdContextType = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContextType | null>(null);

type ActiveIdProviderProps = {
  children: React.ReactNode;
};

export const ActiveIdProvider = ({ children }: ActiveIdProviderProps) => {
  const activeId = useActiveId();
  return (
    <ActiveIdContext.Provider value={{ activeId }}>
      {children}
    </ActiveIdContext.Provider>
  );
};

export const useActiveIdContext = () => {
  return useContext(ActiveIdContext);
};
