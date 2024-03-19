import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageDirection } from "../libs/types";
import { useJobItemsContext } from "../libs/hooks";


export default function PaginationControls() {
  const { currentPage, totalNumberOfPages } = useJobItemsContext();
  return (
    <section className="pagination">
      <PaginationBtn direction="prev">
        {currentPage > 1 && (
          <>
            <ArrowLeftIcon />
            Page {currentPage - 1}
          </>
        )}
      </PaginationBtn>
      <PaginationBtn direction="next">
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
  direction: PageDirection;
  children: React.ReactNode;
};

const PaginationBtn = ({
  direction,
  children,
}: PaginationBtnProps) => {
  const { handlePaginationChange } = useJobItemsContext();
  return (
    <button
      className="pagination__button"
      onClick={() => handlePaginationChange(direction)}
    >
      {children}
    </button>
  );
};
