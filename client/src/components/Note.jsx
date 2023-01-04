import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { deleteNote, editNote } from '../services/notes';

const Note = ({ id, text, date, rotate, background, getRefreshedNotes }) => {
  const handleDeleteNote = () => {
    deleteNote(id).then(() => {
      console.log('One note was deleted');
      getRefreshedNotes();
    });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(text);

  const handleEdit = (x) => {
    console.log(x);
    setIsEditing(false);
    editNote(id, x).then((data) => {
      console.log(data);
    });
  };

  // const dropNote = (event) => {
  //   event.target.style.left = `${event.pageX - 50}px`;
  //   event.target.style.top = `${event.pageY - 50}px`;
  // };

  return (
    <>
      <div
        className="note"
        // draggable="true"
        // onDragEnd={dropNote}
        style={{
          transform: `rotate(${rotate}deg)`,
          background: `${background} `
        }}
      >
        {isEditing ? (
          <textarea
            autoFocus={true}
            onChange={(e) => {
              setContent(e.target.value);
              console.log(e.target.value);
            }}
            value={content}
            // onMouseUp={setIsEditing(false)}
            onBlur={() => handleEdit({ text: content })}
          />
        ) : (
          <span onDoubleClick={() => setIsEditing(true)}>{content}</span>
        )}

        {/* <span>{text}</span> */}

        <div className="note-footer">
          <small>{date}</small>
          <MdDeleteForever
            onClick={() => handleDeleteNote()}
            className="delete-icon"
            size="1.3em"
          />
        </div>
      </div>
    </>
  );
};

export default Note;
