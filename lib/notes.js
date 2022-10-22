const fs = require("fs");
const path = require("path");

// function to create a new note
function createNewNote(body, notesArray) {
    const note = body;
  
    notesArray.push(note);
  
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
  
    return note;
  };

  // function to delete a note 
  function deleteNote(notesArray, id) {
    let idOfNote = parseInt(id);
    notesArray.splice(idOfNote, 1);
  
    // This loop will assign new indexes for the remaining notes in array.
    for (let i = idOfNote; i < notesArray.length; i++) {
        notesArray[i].id = i.toString();
    }
  
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    )
  }

  module.exports = {
    createNewNote,
    deleteNote
  };