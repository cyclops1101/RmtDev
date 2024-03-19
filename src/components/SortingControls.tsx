import { useJobItemsContext } from "../libs/hooks";

export default function Sorting() {
  const { sortBy, handleChangeSortBy } = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortBtn
        onClick={() => handleChangeSortBy("relevant")}
        conditionalStyles={
          sortBy === "relevant" ? "sorting__button--active" : ""
        }
      >
        Relevance
      </SortBtn>
      <SortBtn
        onClick={() => handleChangeSortBy("date")}
        conditionalStyles={sortBy === "date" ? "sorting__button--active" : ""}
      >
        Recent
      </SortBtn>
    </section>
  );
}

type SortBtnProps = {
  children: React.ReactNode;
  conditionalStyles: string;
  onClick: () => void;
};

function SortBtn({ children, conditionalStyles, onClick }: SortBtnProps) {
  return (
    <button
      className={`sorting__button ${conditionalStyles}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
