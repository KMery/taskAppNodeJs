const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

app.use(express.json());

//User creation endpoint
app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save()
        .then(() => res.status(201).send(user))
        .catch(err => res.status(400).send(err));
});

//Get ALL the users
app.get('/users', (req, res) => {
    User.find({})
        .then((users) => res.send(users))
        .catch(err => res.status(500).send(err));
});


//Get user by Id
app.get('/users/:id', (req, res) => {
    let _id = req.params.id;
    User.findById(_id)
        .then((user) => {
            if (!user) {
                return res.status(404).send();
            }
            res.send(user);
        })
        .catch(err => res.status(500).send());
})

//Task creation endpoint
app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save()
        .then(() => res.status(201).send(task))
        .catch(err => res.status(400).send(err));
});

//Get ALL the tasks created
app.get('/tasks', (req, res) => {
    Task.find({})
        .then((tasks) => res.send(tasks))
        .catch(err => res.status(500).send())  
});

//Get task by id
app.get('/tasks/:id', (req, res) => {
    let _id = req.params.id;
    Task.findById(_id)
        .then((user) => {
            if (!user) {
                return res.status(404).send();
            }
            res.send(user);
        })
        .catch(err => res.status(500).send());
})

//Run server
app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});