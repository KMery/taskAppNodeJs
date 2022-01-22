const express = require('express');
const app = express();
const port = process.env.PORT;

require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// app.use((req, res, next) => {
//     res.status(503).send('Server under maintenance!. We go back shortly');
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

//Run server
app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});

const jwt = require('jsonwebtoken');


