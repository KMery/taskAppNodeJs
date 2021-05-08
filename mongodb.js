const { MongoClient, ObjectID, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// useNewURLParser: true, 
MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.error('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    // db.collection('users').findOne({name: 'Jane'}, (error, user) => {
    //     if (error) {
    //         return console.error('Unable to fetch data');
    //     }

    //     console.log(user);
    // });

    // db.collection('users').find({age: 27}).toArray((error, users) => {
    //     if (error) {
    //         return console.error('Unable to fetch data');
    //     }

    //     console.log(users);
    // });

    db.collection('tasks').findOne({"_id" : new ObjectId("6097122bd77b2a6aea6f6bd8")}, (error, task) => {
        if (error) {
            return console.error('Unable to fetch data');
        }

        console.log(task);
    });

    db.collection('tasks').find({status: true}).toArray((error, tasks) => {
        if (error) {
            return console.error('Unable to fetch data');
        }

        console.log(tasks);
    })
});