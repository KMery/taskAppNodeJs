const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/task');

//Task creation endpoint
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    };
});

//Get ALL the tasks created
router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id });
        res.send(tasks);
    } catch (error) {
        res.status(500).send();
    }; 
});

//Get task by id
router.get('/tasks/:id', auth, async (req, res) => {
    let _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send();
        }
        
        res.send(task);
    } catch (error) {
        res.status(500).send();
    };
});

//Update an existing id
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        
        if (!task) {
            return res.status(404).send();
        }
        updates.forEach(update => task[update] = req.body[update]);
        await task.save();

        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

//Delete task by id
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});


module.exports = router;