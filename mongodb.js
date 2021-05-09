const { MongoClient, ObjectID, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// useNewURLParser: true, 
MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.error('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    db.collection('tasks').deleteOne({
        "_id" : new ObjectId("6097122bd77b2a6aea6f6bd7")
    }).then((result) => console.log(result))
    .catch((err) => console.error(err));
});