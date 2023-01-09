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
        return Math.floor(Math.random() * 11) - 5;
      }
    },
    color: {
      type: String,
      default: function randomColor() {
        let randColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return randColor.toUpperCase();
      }
    }
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
