'use strict';

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true
    }
    // date: {
    //   type: Date,
    //   default: Date.now()
    // }
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
