// Route.js file
const express = require("express")
const router = express.Router();
const fs = require('fs');
const userRoutes = require('./userController.js') // import account route
router.use(userRoutes) // use account route
module.exports = router;