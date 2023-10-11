const express = require('express');
const UsersControllers = require('../controllers/users.controller')
const router = express.Router();
const {checkSchema} = require('express-validator');
const { registerSchema } = require('../helpers/valid');

//signup
router.post('/signup', checkSchema (registerSchema ), UsersControllers.signupUser)

//login
router.post('/login', checkSchema( registerSchema ), UsersControllers.loginUser);

module.exports = router;
