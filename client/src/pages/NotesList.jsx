import { useState, useEffect } from 'react';
import AddNote from '../components/AddNote';
import Note from '../components/Note';
import Search from '../components/Search';
import { loadNotes } from '../services/notes';
// import { useNavigate } from 'react-router-dom';

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  // const navigate = useNavigate();

  const getAllNotes = () => {
    loadNotes().then((data) => {
      setNotes(data.notes);
    });
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });

  // const dragOver = (event) => {
  //   event.stopPropagation();
  //   event.preventDefault();
  // };

  return (
    <div>
      <Search notes={notes} setNotes={setNotes} />
      <div className="notes-list">
        {/* onDragOver={dragOver} */}
        <AddNote getRefreshedNotes={getAllNotes} />
        {notes &&
          notes.map((note) => (
            <Note
              key={note._id}
              id={note._id}
              text={note.text}
              rotate={note.rotate}
              background={note.color}
              date={formatter.format(Date.parse(note.createdAt))}
              getRefreshedNotes={getAllNotes}
            />
          ))}
      </div>
    </div>
  );
};

export default NotesList;
