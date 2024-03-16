
export default function SearchForm({ searchTerm, setSearchTerm}) {

  return (
    <form onSubmit={(e) => e.preventDefault()} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
