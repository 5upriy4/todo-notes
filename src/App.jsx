import { useState } from "react";
import Navbar from "./components/Navbar";
import TodoApp from "./components/TodoApp";
import NotesApp from "./components/NotesApp";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("todo");

  return (
    <div className="app">

      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-container">

        {activePage === "todo" && <TodoApp />}

        {activePage === "notes" && <NotesApp />}

      </main>

    </div>
  );
}

export default App;