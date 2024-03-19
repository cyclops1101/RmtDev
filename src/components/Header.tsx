import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";

export default function Header() {
  return (
    <header className="header">
      <HeaderTop/>
      <SearchForm />
    </header>
  );
}

export function HeaderTop() {
  return (
    <div className="header__top">
      <Logo />
      <BookmarksButton />
    </div>
  );
}
