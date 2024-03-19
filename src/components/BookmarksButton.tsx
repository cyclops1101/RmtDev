import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useRef, useState } from "react";
import { useOnClickOutside } from "../libs/hooks";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>
  (null);
  const popoverRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([popoverRef, buttonRef], () => setIsOpen(false));


  return (
    <section>
      <button ref={buttonRef} className="bookmarks-btn" onClick={() => setIsOpen(!isOpen)}>
        Bookmarks <TriangleDownIcon />
      </button>

      {isOpen && <BookmarksPopover ref={popoverRef}/>}
    </section>
  );
}
