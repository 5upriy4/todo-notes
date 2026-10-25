import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";

function NotesApp() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Save notes to Local Storage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Create or update a note
  const saveNote = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    if (editingId !== null) {
      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: title,
                content: content,
                category: category,
              }
            : note
        )
      );

      setEditingId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title: title,
        content: content,
        category: category,
        date: new Date().toLocaleString(),
      };

      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setContent("");
    setCategory("General");
  };

  // Delete note
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Edit note
  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setEditingId(note.id);
  };

  // Search notes
  const filteredNotes = notes.filter((note) =>
    `${note.title} ${note.content} ${note.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="notes-section">

      <div className="page-heading">
        <h1>My Notes</h1>
        <p>Write down your ideas and important information</p>
      </div>

      <div className="note-form">

        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>General</option>
          <option>College</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Important</option>
        </select>

        <button onClick={saveNote}>
          {editingId !== null ? "Update Note" : "Save Note"}
        </button>

      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="notes-grid">

        {filteredNotes.length === 0 ? (
          <div className="empty-message">
            No notes found.
          </div>
        ) : (
          filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={editNote}
              onDelete={deleteNote}
            />
          ))
        )}

      </div>

    </section>
  );
}

export default NotesApp;