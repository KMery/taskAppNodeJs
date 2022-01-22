const mongoose = require('mongoose');
// const validator = require('validator');

const connect = async (mongoUri) => {
    return mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true 
    })
        .then(() => console.log('Connected to mongodb'))
        .catch((err) => console.error('Error found trying to connect to mongo', err));

};

connect(process.env.MONGO_URI);