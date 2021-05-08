const { MongoClient, ObjectID, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectId();
// console.log(id);
// console.log(id.getTimestamp());

// useNewURLParser: true, 
MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.error('Unable to connect to database!');
    }

    // const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Maria',
    //     age: 27
    // }, (error, result) => {
    //     if (error) {
    //         return console.error('Unable to insert user');
    //     }
    //     console.log(result.ops)
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jane',
    //         age: 27
    //     }, {
    //         name: 'Doe',
    //         age: 25
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         console.error('Unable to insert documents!');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Study',
    //         status: true
    //     }, {
    //         description: 'Wash the dishes ',
    //         status: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.error('Unable to insert documents!');
    //     }

    //     console.log(result.ops);
    // });
});