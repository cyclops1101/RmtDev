import { SortBy } from "../libs/types";

type SortingProps = {
  onSortChange: (sort: SortBy) => void;
  sortBy: SortBy;
};

export default function Sorting({ onSortChange, sortBy }: SortingProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortBtn
        onClick={() => onSortChange("relevant")}
        conditionalStyles={
          sortBy === "relevant" ? "sorting__button--active" : ""
        }
      >
        Relevance
      </SortBtn>
      <SortBtn
        onClick={() => onSortChange("date")}
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
