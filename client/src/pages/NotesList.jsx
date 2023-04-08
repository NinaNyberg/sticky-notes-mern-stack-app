import { useState, useEffect } from 'react';
import AddNote from '../components/AddNote';
import Note from '../components/Note';
import Search from '../components/Search';
import { loadNotes, pinList } from '../services/notes';
import Spinner from '../components/Spinner';

const NotesList = () => {
  // ADDING PINS FUNCTIONALITY TEMPORARY COMMENTED OUT

  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  // const [pins, setPins] = useState([]);

  // list all notes on the homepage
  const getAllNotes = () => {
    loadNotes().then((data) => {
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

  // const dragOver = (event) => {
  //   event.stopPropagation();
  //   event.preventDefault();
  // };

  return (
    <div>
      {/* search field */}
      <Search notes={notes} setNotes={setNotes} />
      <div className="notes-list">
        {/* onDragOver={dragOver} */}

        {/* add note form */}
        <AddNote getRefreshedNotes={getAllNotes} />

        {/* render notes */}
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
              date={note.createdAt}
              getRefreshedNotes={getAllNotes}
              // pins={pins}
              // setPins={setPins}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotesList;
