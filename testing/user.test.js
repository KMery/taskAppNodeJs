const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, populateDatabase } = require('./fixtures/db')

beforeEach(populateDatabase);

describe('User signup', () => {
    test('Should signup a new user', async () => {
        const data = {
            name: 'test',
            email: 'test@mail.com',
            password: 'unit-test'
        };
        const response = await request(app)
            .post('/users')
            .send(data)
            .expect(201);
        //Assert thath the database was changed correctly
        const user = await User.findById(response.body.user._id);
        expect(user).not.toBeNull();
        //Assertions about the response
        expect(response.body.user).toHaveProperty('_id');
        expect(response.body.user).toHaveProperty('name');
        expect(response.body.user).toHaveProperty('email');
    });
});

describe('User login', () => {    
    test('Should login existing user', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                email: userOne.email,
                password: userOne.password
            })
            .expect(200);

        //Validate token is saved
        const user = await User.findById(userOneId);
        expect(response.body.token).toBe(user.tokens[1].token);
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

describe('User information', () => {
    test('Should get profile for user', async () => {
        await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200);
    });

    test('Should not get profile for unauthenticated user', async () => {
        await request(app)
            .get('/users/me')
            .send()
            .expect(401);
    });
});

describe('User deletion', () => {
    test('Should delete account for user', async () => {
        await request(app)
            .delete('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200);
        //Validate user is removed
        const user = await User.findById(userOneId);
        expect(user).toBeNull();
    });

    test('Should not delete account for unauthenticated user', async () => {
        await request(app)
            .delete('/users/me')
            .send()
            .expect(401);
    });
});

describe('Avatar', () => {
    test('Should upload avatar image', async () => {
        await request(app)
            .post('/users/me/avatar')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .attach('avatar', 'testing/fixtures/profile-pic.jpg')
            .expect(200);
        const user = await User.findById(userOneId);
        expect(user.avatar).toEqual(expect.any(Buffer));
    });
});

describe('User update', () => {
    test('Should update valid user fields', async () => {
        await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({
                age: 25
            })
            .expect(200);
        //Validate age was updated
        const user = await User.findById(userOneId);
        expect(user.age).toBe(25);
    });

    test('Should not update invalid user fields', async () => {
        await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({
                location: 'Formosa'
            })
            .expect(400);
    });

    test('Should not update for unauthenticated user', async () => {
        await request(app)
            .patch('/users/me')
            .send({
                age: 25
            })
            .expect(401);
    });
});