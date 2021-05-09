const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('./db/mongoose');
const User = require('./models/user')

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save()
        .then(() => res.send(user))
        .catch(err => console.error(err));
});

app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});