// account.js
const express = require("express")
const controller = express.Router();
const fs = require('fs');
const userDb = './account.json' // path to our JSON file

// util functions
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(userDb, stringifyData)
}
const getUserData = () => {
    const jsonData = fs.readFileSync(userDb)
    return JSON.parse(jsonData)
}

// get all 
const routesHelp = ({
    note: 'The following should guide you in testing',
    get: '/user/list',
    put: '/user/:id',
    delete: '/user/delete/:id',
    post:'/user/addUser',
});
const routesParameters = ({
    postBody: 'username, password',
    putBody: 'username, password',
})
controller.get('/', (req, res) => {
    res.status(200).json({routesHelp, routesParameters})
})
controller.get('/user/list', (req, res) => {
    const accounts = getUserData()
    res.send(accounts)
})

// Update - using Put method
controller.put('/user/:id', (req, res) => {
    var existingUser = getUserData()
    console.log(req.body);
    fs.readFile(userDb, 'utf8', (err, data) => {
        const userId = req.params['id'];
        existingUser[userId] = req.body;
        saveUserData(existingUser);
        res.send(`user with id ${userId} has been updated`)
    }, true);
});


// delete - using delete method
controller.delete('/user/delete/:id', (req, res) => {
    console.log(req.params.id);
    fs.readFile(userDb, 'utf8', (err, data) => {
        var existingUser = getUserData()
        const userId = req.params['id'];
        delete existingUser[userId];
        saveUserData(existingUser);
        res.send(`user with id ${userId} has been deleted`);
    }, true);
});


// using post method to add a user
controller.post('/user/addUser', (req, res) => {

    var existingUser = getUserData()
    const newUserId = Math.floor(100000 + Math.random() * 900000)
    existingUser[newUserId] = req.body
    console.log(existingUser);
    saveUserData(existingUser);
    res.send({ success: true, msg: 'account added successfully' })
})
module.exports = controller