const express = require('express');
const router = express.Router();

const todosRoutes = require('./todos.routes');
const usersRoutes = require('./users.routes');

router.use('/todos', todosRoutes);
router.use('/users', usersRoutes);

module.exports = router;
