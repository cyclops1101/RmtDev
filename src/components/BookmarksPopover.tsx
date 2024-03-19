import { createPortal } from "react-dom";
import { useBookmarkContext } from "../libs/hooks";
import JobList from "./JobList";
import { forwardRef } from "react";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkedJobs, isLoading } = useBookmarkContext();
  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={bookmarkedJobs} isLoading={isLoading} />
    </div>,
    document.body
  );
});

export default BookmarksPopover;
