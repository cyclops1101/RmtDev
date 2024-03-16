import { useActiveId } from "../libs/hooks";
import { JobItem } from "../libs/types";
import BookmarkIcon from "./BookmarkIcon";

interface JobListItemProps {
  jobItem: JobItem;
}

export default function JobListItem({ jobItem }: JobListItemProps) {
  const { id, company, title, badgeLetters, daysAgo } = jobItem;
  const isActiveId = useActiveId();
  const activeTag = isActiveId === id ? "job-item--active" : "job-item";
  return (
    <li className={activeTag}>
      <a href={`#${id}`} className="job-item__link">
        <div className="job-item__badge">{badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{title}</h3>
          <p className="job-item__company">{company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon />
          <time className="job-item__time">{daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
