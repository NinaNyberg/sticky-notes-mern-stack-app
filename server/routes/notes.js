'use strict';

const express = require('express');
const router = express.Router();
// const routeGuard = require('./../middleware/route-guard');
const Note = require('../models/note');

// search
router.get('/search', (req, res, next) => {
  const { term } = req.query;
  /*
    MongoDB $regex operator documentation
    https://www.mongodb.com/docs/manual/reference/operator/query/regex/
    */
  Note.find({ text: { $regex: `^${term}.*`, $options: 'i' } })
    .then((notes) => {
      res.json({ notes: notes });
    })
    .catch((error) => {
      next(error);
    });
});

// - GET - '/notes' - get all notes
router.get('/', (req, res, next) => {
  Note.find()
    .sort({ createdAt: -1 })
    .then((notes) => {
      console.log(notes);
      res.json({ notes });
    })
    .catch((error) => {
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

module.exports = router;
