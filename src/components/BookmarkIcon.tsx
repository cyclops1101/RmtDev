import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarkContext } from "../contexts/bookmark.context";

type BookmarkIconProps = { id: number };

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { handleToggleBookmark, bookmarkIds } = useBookmarkContext();
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    handleToggleBookmark(id);
  };
  return (
    <button className="bookmark-btn" onClick={handleClick}>
      <BookmarkFilledIcon
        className={bookmarkIds.includes(id) ? "filled" : ""}
      />
    </button>
  );
}
