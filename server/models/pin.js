'use strict';

const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
  note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
    required: true
  }
});

const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;
