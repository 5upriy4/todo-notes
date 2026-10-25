function Navbar({ activePage, setActivePage }) {
  return (
    <nav className="navbar">
      <div className="logo">
        Task<span>Note</span>
      </div>

      <div className="nav-buttons">
        <button
          className={activePage === "todo" ? "active" : ""}
          onClick={() => setActivePage("todo")}
        >
          To-Do
        </button>

        <button
          className={activePage === "notes" ? "active" : ""}
          onClick={() => setActivePage("notes")}
        >
          Notes
        </button>
      </div>
    </nav>
  );
}

export default Navbar;