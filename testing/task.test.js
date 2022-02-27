const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { taskOne, userTwo, userOne, populateDatabase } = require('./fixtures/db')

beforeEach(populateDatabase);

describe('Task creation', () => {
    test('Should create task for user', async () => {
        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({
                description: 'From unit test'
            })
            .expect(201);
        //Validate task was create
        const task = await Task.findById(response.body._id);
        expect(task).not.toBeNull();
        expect(task.completed).toEqual(false);
    });

    test('Should not allow enter wrong data in a field', async () => {
        await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({
                completed: 'From unit test'
            })
            .expect(400);
    });

    test('Should not allow create a task for unauthenticated user', async () => {
        await request(app)
            .post('/tasks')
            .send({
                description: 'From unit test'
            })
            .expect(401);
    });
});

describe('Fetch all tasks', () => {
    test('Should get all the tasks for the owner', async () => {
        const response = await request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200);
        expect(response.body).toHaveLength(2);
    });

    test('Should not return tasks for unauthenticated user', async () => {
        await request(app)
            .get('/tasks')
            .send()
            .expect(401);
    });
});

describe('Tasks deletions', () => {
    test('Should not allow task deletion if is not owner', async () => {
        await request(app)
            .delete(`/tasks/${taskOne._id}`)
            .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
            .send()
            .expect(404);
        const task = await Task.findById(taskOne._id);
        expect(task).not.toBeNull();
    });

    test('Should not delete task for unauthenticated user', async () => {
        await request(app)
            .delete(`/tasks/${taskOne._id}`)
            .send()
            .expect(401);
    });
});

describe('Task update', () => {
    test('Should allow update', async () => {
        await request(app)
            .patch(`/tasks/${taskOne._id}`)
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({
                description: 'From unit test update'
            })
            .expect(200);
    });

    test('Should not allow enter wrong data in a field', async () => {
        await request(app)
            .patch(`/tasks/${taskOne._id}`)
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({
                completed: 'From unit test'
            })
            .expect(400);
    });

    test('Should not allow update task for unauthenticated user', async () => {
        await request(app)
            .patch(`/tasks/${taskOne._id}`)
            .send({
                description: 'From unit test'
            })
            .expect(401);
    });
});