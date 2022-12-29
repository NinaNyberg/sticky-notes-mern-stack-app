import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { deleteNote } from '../services/notes';

const Note = ({ id, text, date, getRefreshedNotes }) => {
  const handleDeleteNote = () => {
    deleteNote(id).then(() => {
      console.log('One note was deleted');
      getRefreshedNotes();
    });
  };
  return (
    <div className="note">
      <span>{text}</span>
      <div className="note-footer">
        <small>{date}</small>
        <MdDeleteForever
          onClick={() => handleDeleteNote()}
          className="delete-icon"
          size="1.3em"
        />
      </div>
    </div>
  );
};

export default Note;
