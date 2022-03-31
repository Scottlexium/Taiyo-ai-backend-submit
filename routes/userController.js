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
  })
module.exports = controller