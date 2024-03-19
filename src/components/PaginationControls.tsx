import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageDirection } from "../libs/types";

type PaginationControlsProps = {
  currentPage: number;
  onPaginationChange: (direction: PageDirection) => void;
  totalNumberOfPages: number;
};

export default function PaginationControls({
  currentPage,
  onPaginationChange,
  totalNumberOfPages,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      <PaginationBtn onPaginationChange={onPaginationChange} direction="prev">
        {currentPage > 1 && (
          <>
            <ArrowLeftIcon />
            Page {currentPage - 1}
          </>
        )}
      </PaginationBtn>
      <PaginationBtn onPaginationChange={onPaginationChange} direction="next">
        {currentPage < totalNumberOfPages && (
          <>
            Page {currentPage + 1}
            <ArrowRightIcon />
          </>
        )}
      </PaginationBtn>
    </section>
  );
}

type PaginationBtnProps = {
  onPaginationChange: (direction: PageDirection) => void;
  direction: string;
  children: React.ReactNode;
};

const PaginationBtn = ({
  onPaginationChange,
  direction,
  children,
}: PaginationBtnProps) => {
  const handlePaginationChange = (direction: string) => {
    onPaginationChange(direction);
  };
  return (
    <button
      className="pagination__button"
      onClick={() => handlePaginationChange(direction)}
    >
      {children}
    </button>
  );
};
