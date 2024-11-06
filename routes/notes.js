const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route to fetch all notes of a user
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route to add a new note
router.post('/addnote', fetchuser, [
    body('title').isLength({ min: 3 }).withMessage('Enter a valid Note title'),
    body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters')
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        });

        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        console.error(error.message); // Corrected 'error.Message' to 'error.message'
        res.status(500).send("Internal Server Error");
    }
});


//Router for updating the notes 
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    // const note = Note.findByIdAndUpdate()
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Note not found.");
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized.");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({note: note})

});


router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Note not found.");
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized.");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({note: note})

});



module.exports = router;
