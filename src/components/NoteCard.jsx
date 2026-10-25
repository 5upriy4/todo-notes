function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note-card">

      <div className="note-header">
        <h3>{note.title}</h3>

        <span className="category">
          {note.category}
        </span>
      </div>

      <p className="note-content">
        {note.content}
      </p>

      <small>
        {note.date}
      </small>

      <div className="note-actions">

        <button onClick={() => onEdit(note)}>
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default NoteCard;