'use strict';

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true
    },
    rotate: {
      type: Number,
      default: function genRandom() {
        return Math.floor(Math.random() * 21) - 10;
      }
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
