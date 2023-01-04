import { useState, useEffect } from 'react';
import AddNote from '../components/AddNote';
import Note from '../components/Note';
import Search from '../components/Search';
import { loadNotes } from '../services/notes';
import { editNote } from '../services/notes';
// import ElementMaker from '../components/ElementMaker';
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
              // contenteditable="true"
              // onInput={(e) => editNote(note.id, e.currentTarget.textContent)}
              key={note._id}
              id={note._id}
              text={note.text}
              rotate={note.rotate}
              background={note.color}
              date={formatter.format(Date.parse(note.createdAt))}
              getRefreshedNotes={getAllNotes}
            >
              {/* <ElementMaker
                value={note.text}
                handleChange={(e) => {
                  editNote(note._id, e.target.value).then((data) => {
                    console.log('Edited!');
                  });
                }}
                handleDoubleClick={() => setShowInputEle(true)}
                handleBlur={() => setShowInputEle(false)}
                showInputEle={showInputEle}
              />
              ; */}
            </Note>
          ))}
      </div>
    </div>
  );
};

export default NotesList;
