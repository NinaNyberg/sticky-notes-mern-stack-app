import { useState, useEffect } from 'react';
import AddNote from '../components/AddNote';
import Note from '../components/Note';
import Search from '../components/Search';
import { loadNotes, pinList } from '../services/notes';
import Spinner from '../components/Spinner';
// import { useNavigate } from 'react-router-dom';

const NotesList = () => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  // const [pins, setPins] = useState([]);

  // console.log(pins);

  // const navigate = useNavigate();

  const getAllNotes = () => {
    loadNotes().then((data) => {
      // setNotes(data.notes);
      // setLoading(false);
      setTimeout(() => {
        setNotes(data.notes);
        setLoading(false);
      }, 500);
    });
  };

  useEffect(() => {
    setLoading(true);
    getAllNotes();
  }, []);

  // useEffect(() => {
  //   pinList().then((data) => {
  // console.log('data' + data);
  // setPins(data);
  //   });
  // }, []);

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
        {loading ? (
          <Spinner />
        ) : (
          (!Boolean(notes.length) && (
            <h3>Nothing to display :( Write a new note!</h3>
          )) ||
          notes.map((note) => (
            <Note
              key={note._id}
              id={note._id}
              text={note.text}
              rotate={note.rotate}
              background={note.color}
              date={formatter.format(Date.parse(note.createdAt))}
              getRefreshedNotes={getAllNotes}
              pins={pins}
              setPins={setPins}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotesList;
