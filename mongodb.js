const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// useNewURLParser: true, 
MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.error('Unable to connect to database!');
    }

    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     name: 'KMery',
    //     age: 28
    // }, (error, result) => {
    //     if (error) {
    //         return console.error('Unable to insert user');
    //     }
    //     console.log(result.ops)
    // });

    db.collection('users').insertMany([
        {
            name: 'Jane',
            age: 27
        }, {
            name: 'Doe',
            age: 25
        }
    ], (error, result) => {
        if (error) {
            console.error('Unable to insert documents!');
        }

        console.log(result.ops);
    })
});