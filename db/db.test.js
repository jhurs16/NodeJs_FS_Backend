const { connect, disconnect, saveUser, findUser } = require('./db')
const User = require('../models/userModel');
const mongoose = require('mongoose');

jest.mock('./db')
beforeAll(async ()=> {
    return await connect();
})
describe("User Test Suite", () => {
    test("As a user I want to save a user to the database", async ()=>{
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            firstName: "Jhurs",
            lastName: "Magsayo",
            address: "Iba",
            city: "Iba",
            state: "Zambales",
            zipCode: "2201",
            email: "jhurs@gmmail.com",
            password: "123",
        })
        const user = await saveUser(newUser);
        expect(user.firstName).toEqual('Jhurs');
        expect(user.lastName).toEqual('Magsayo');
        expect(user.address).toEqual('Iba');
        expect(user.city).toEqual('Iba');
        expect(user.state).toEqual('Zambales');
        expect(user.zipCode).toEqual('2201');
        expect(user.email).toEqual('jhurs@gmmail.com');
        expect(user.password).toEqual('123');
    });

    test("As a user I want to check if there is an existing data in the db", async () => {
        const obj = {firstName: "Jhurs"};
        await findUser(obj).then( user => {
            expect(user.firstName).toBe("Jhurs");
            expect(user.firstName).toEqual('Jhurs');
        }).catch((err, req, res)=> {
            res.status(500).json({
                error: {
                    message: err.message,
                    status: err.status
                }
            })
        });
    })
});

afterAll(async () => {
    return await disconnect();
})