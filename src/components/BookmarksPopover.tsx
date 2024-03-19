import { useBookmarkContext } from "../contexts/bookmark.context";
import JobList from "./JobList";

export default function BookmarbookmarkedJobsksPopover() {
  const { bookmarkedJobs, isLoading } = useBookmarkContext();
  return (
    <div className="bookmarks-popover">
      <JobList jobItems={bookmarkedJobs} isLoading={isLoading}/>
    </div>
  );
}
