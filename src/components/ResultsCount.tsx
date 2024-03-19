import { useJobItemsContext } from "../libs/hooks";

export default function ResultsCount() {
  const { totalResults } = useJobItemsContext();
  return <p className="count"><span className="u-bold">{totalResults}</span> result{totalResults !== 1 && 's'}</p>;
}
