import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { deleteNote } from '../services/notes';

const Note = ({ id, text, date, rotate, background, getRefreshedNotes }) => {
  const handleDeleteNote = () => {
    deleteNote(id).then(() => {
      console.log('One note was deleted');
      getRefreshedNotes();
    });
  };
  const dropNote = (event) => {
    event.target.style.left = `${event.pageX - 50}px`;
    event.target.style.top = `${event.pageY - 50}px`;
  };

  return (
    <div
      className="note"
      draggable="true"
      onDragEnd={dropNote}
      style={{
        transform: `rotate(${rotate}deg)`,
        background: `${background} `
      }}
    >
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
