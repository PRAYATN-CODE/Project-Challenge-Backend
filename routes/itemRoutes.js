const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const moment = require('moment');

// Get all items for a specific user
router.get('/get-user-items', async (req, res) => {
    try {
        const { id: userId } = req.user;
        const items = await Item.find({ userId });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching items', error: err.message });
    }
});

// Add a new item
router.post('/add-item', async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { name, dob } = req.body;
        const newItem = new Item({ userId, name, dob });
        await newItem.save();
        res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (err) {
        res.status(500).json({ message: 'Error adding item', error: err.message });
    }
});

// Edit an item
router.put('/edit-item/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { id: userId } = req.user;
        const { name, dob } = req.body;
        const updatedItem = await Item.findOneAndUpdate(
            { _id: id, userId },
            { $set: { name, dob } },
            { new: true }
        );

        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item updated successfully', item: updatedItem });
    } catch (err) {
        res.status(500).json({ message: 'Error updating item', error: err.message });
    }
});

// Delete an item
router.delete('/delete-item/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { id: userId } = req.user;
        const deletedItem = await Item.findOneAndDelete({ _id: id, userId });
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting item', error: err.message });
    }
});

// Populate dummy data
router.get('/populate/dummy-item', async (req, res) => {
    try {
        const { id: userId } = req.user;
        const dummyData = Array.from({ length: 20 }, (_, i) => ({
            userId,
            name: `Person ${i + 1}`,
            dob: moment().subtract(20 + i, 'years').toDate(),
        }));
        await Item.insertMany(dummyData);
        res.json({ message: 'Database populated with dummy data' });
    } catch (err) {
        res.status(500).json({ message: 'Error populating database', error: err.message });
    }
});

module.exports = router;
