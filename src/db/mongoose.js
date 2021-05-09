const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [7, 'password must contain at least 7 of length'],
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password can\'t contain "password"')
            }
        }
    }, 
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        } 
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
})

// const me = new User({
//     name: 'Mike  ',
//     email: ' test@test.com ',
//     password: 'thisisatest '
// });

// me.save()
//     .then(user => console.log(user))
//     .catch(err => console.error(err));

const task = new Task({
    description: ' Create another task   ',
    // completed: true
});

task.save()
    .then(task => console.log(task))
    .catch(err => console.error(err));