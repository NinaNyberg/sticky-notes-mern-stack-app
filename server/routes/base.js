'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const Note = require('../models/note');
const Pin = require('./../models/pin');

// router.get('/', (req, res, next) => {
//   res.json({ type: 'success', data: { title: 'Hello World' } });
// });

// router.get('/private', routeGuard, (req, res, next) => {
//   res.json({});
// });

// search
router.get('/search', (req, res, next) => {
  const { term } = req.query;
  /*
    MongoDB $regex operator documentation
    https://www.mongodb.com/docs/manual/reference/operator/query/regex/
    */
  Note.find({ text: { $regex: `^${term}.*`, $options: 'i' } })
    .sort({ createdAt: -1 })
    .then((notes) => {
      res.json({ notes: notes });
    })
    .catch((error) => {
      next(error);
    });
});

// - GET - '/' - get all notes
router.get('/', (req, res, next) => {
  Note.find()
    .sort({ createdAt: -1 })
    .then((notes) => {
      res.json({ notes });
    })
    .catch((error) => {
      next(error);
    });
});

// list all pins
router.get('/pinned', (req, res, next) => {
  const noteId = req.params._id;
  Pin.find({ note: noteId })
    .then((pins) => {
      const notes = pins.map((pin) => {
        if (pin.note) console.log(pin.note);
        return pin.note;
        // return String(
        //   bookmark.pet._id +
        //     ' ' +
        //     bookmark.pet.name +
        //     ' ' +
        //     bookmark.pet.picture
        // );
      });
      // const pets = bookmarks.map((bookmark) => bookmark.pet);
      res.json({ notes });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

// delete a note
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  Note.findByIdAndDelete(id)
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      next(error);
    });
});

// edit a note
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  // const owner = req.user._id;
  Note.findByIdAndUpdate({ _id: id }, { text }, { new: true })
    .then((note) => {
      res.json({ note });
    })
    .catch((error) => {
      next(error);
    });
});

// create a single note
router.post('/', (req, res, next) => {
  const { text } = req.body;
  console.log(text);
  Note.create({ text })
    .then((note) => {
      res.json({ note });
      //   res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

// set a pin
router.post('/pin/:id', (req, res, next) => {
  const { id } = req.params;
  Pin.findOne({ note: id })
    .then((note) => {
      if (!note) {
        return Pin.create({ note: id });
      }
    })
    .then((pin) => {
      res.json({ pin });
    })
    .catch((error) => {
      next(error);
    });
});

// delete a pin
router.delete('/pin/:id', (req, res, next) => {
  const { id } = req.params;
  Pin.findOneAndDelete({ note: id })
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
