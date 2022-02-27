const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

//This user is created to verify login
const userOne = {
    name: 'user1',
    email: 'user1@mail.com',
    password: 'userpass1'
};

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

describe('User signup', () => {
    test('Should signup a new user', async () => {
        const data = {
            name: 'test',
            email: 'test@mail.com',
            password: 'unit-test'
        };
        await request(app)
            .post('/users')
            .send(data)
            .expect(201);
    });
});

describe('User login', () => {    
    test('Should login existing user', async () => {
        await request(app)
            .post('/users/login')
            .send({
                email: userOne.email,
                password: userOne.password
            });
    });
    
    test('Should not login with an non existent user', async () => {
        await request(app)
            .post('/users/login')
            .send({
                email: 'email@email.com',
                password: 'thisisunittest'
            }).expect(400);
    });
});