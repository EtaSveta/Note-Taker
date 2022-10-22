const router = require('express').Router();
const { createNewNote, deleteNote } = require('../../lib/notes');

// requires data from the file
const { notes } = require('../../db/db.json');


router.get('/notes', (req, res) => {
    res.json(notes);
  });
  
router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString(); 
    const note = createNewNote(req.body, notes);
    res.json(note);
});

router.delete('/notes/:id', (req, res) => {
deleteNote(notes, req.params.id);
res.json(notes);  
});

module.exports = router;
