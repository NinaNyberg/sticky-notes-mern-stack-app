import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import Moment from 'react-moment';
// import { AiTwotonePushpin } from 'react-icons/ai';
import {
  deleteNote,
  editNote
  // pinAdd,
  // pinRemove,
  // pinList
} from '../services/notes';

const Note = ({
  id,
  text,
  date,
  rotate,
  background,
  getRefreshedNotes
  // pins,
  // setPins
}) => {
  const handleDeleteNote = () => {
    deleteNote(id).then(() => {
      console.log('One note was deleted');
      getRefreshedNotes();
    });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(text);
  // const [pin, setPin] = useState(null);

  const handleEdit = (x) => {
    console.log(x);
    setIsEditing(false);
    editNote(id, x).then((data) => {
      console.log(data);
    });
  };

  const calendarStrings = {
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: '[last] dddd [at] LT',
    nextWeek: 'dddd [at] LT',
    sameElse: 'L'
  };

  // useEffect(() => {
  //   pinList().then((data) => {
  //     setPins(data.notes);
  //   });
  // }, []);

  // const pin = pins && pins.some((item) => item._id === id);
  // console.log(pin);

  // const handleSetPin = () => {
  //   pinAdd(id).then((data) => {
  //     setPin(true);
  //   });
  // };

  // const handleSetPin = () => {
  //   pinAdd(id)
  // .then((data) => {
  //   return pinList();
  // })
  //     .then((data) => {
  //       console.log('kakka ' + data);
  //       setPin(data.pin);
  //     });
  // };

  // const handleRemovePin = () => {
  //   pinRemove(id)
  //     // .then((data) => {
  //     //   return pinList();
  //     // })
  //     .then((data) => {
  //       setPin(null);
  //     });
  // };

  // const handlePin = () => {
  //   console.log();
  // };

  // const handleRemovePin = () => {
  //   pinRemove(id).then((data) => {
  //     setPin(false);
  //   });
  // };

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
            onBlur={() => handleEdit({ text: content })}
          />
        ) : (
          <span onDoubleClick={() => setIsEditing(true)}>{content}</span>
        )}

        {/* <span>{text}</span> */}

        <div className="note-footer">
          <small>
            <Moment calendar={calendarStrings}>{date}</Moment>
          </small>
          <MdDeleteForever
            onClick={() => handleDeleteNote()}
            className="delete-icon"
            size="1.3em"
          />
          {/* <div className="bookmarks"> */}
          {/* {(pin && (
              <AiTwotonePushpin
                className="pinned-note"
                onClick={handleRemovePin}
              />
            )) || (
              <AiTwotonePushpin className="pin-note" onClick={handleSetPin} />
            )} */}
          {/* {!pin ? (
              <AiTwotonePushpin className="pin-note" onClick={handleSetPin} />
            ) : (
              <AiTwotonePushpin
                className="pinned-note"
                onClick={handleRemovePin}
              />
            )}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Note;
