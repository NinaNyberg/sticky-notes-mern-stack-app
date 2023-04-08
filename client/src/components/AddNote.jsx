import { useState } from 'react';
import { createNote } from '../services/notes';

const AddNote = ({ getRefreshedNotes }) => {
  const [note, setNote] = useState({ text: '' });

  const characterLimit = 200;

  //adding a new note
  const handleAdd = () => {
    if (note.text.trim().length > 0) {
      createNote(note).then((data) => {
        console.log('New note added', data);
        setNote({ text: '' });
        getRefreshedNotes();
      });
    }
  };

  return (
    <div className="note-add new">
      <textarea
        rows="8"
        cols="10"
        placeholder="Type a new note..."
        value={note.text}
        onChange={(event) => {
          if (characterLimit - event.target.value.length >= 0) {
            setNote({ ...note, text: event.target.value });
          }
        }}
      ></textarea>
      <div className="note-footer">
        <small>{characterLimit - note.text.length} remaining</small>
        <button className="add" onClick={handleAdd}>
          Add new
        </button>
      </div>
    </div>
  );
};

export default AddNote;
