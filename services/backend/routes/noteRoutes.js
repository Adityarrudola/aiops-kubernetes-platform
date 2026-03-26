const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fs = require('fs');

// Logging function (Filebeat will read this)
const log = (message) => {
  const logMessage = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync('/var/log/app/app.log', logMessage);
};

// GET all notes
router.get('/', async (req, res) => {
  log("API HIT - GET /api/notes");

  try {
    const notes = await Note.find();
    log("DATA: " + JSON.stringify(notes));
    res.json(notes);
  } catch (err) {
    log("ERROR: " + err.message);
    res.status(500).json({ error: err.message });
  }
});

// ADD note
router.post('/', async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();

    log("NOTE CREATED: " + JSON.stringify(note));
    res.json(note);
  } catch (err) {
    log("ERROR: " + err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE note
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);

    if (!deleted) {
      log("DELETE FAILED: Note not found");
      return res.status(404).json({ message: 'Note not found' });
    }

    log("NOTE DELETED: " + req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    log("ERROR: " + err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;