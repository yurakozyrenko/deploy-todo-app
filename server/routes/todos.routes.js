const express = require('express');
const router = express.Router();
const ToDosControllers = require('../controllers/todos.controller');
const { checkSchema } = require('express-validator');
const { titleSchema } = require('../helpers/valid');

//get all todos
router.get('/:userEmail', ToDosControllers.getAllToDo);

//create a new todo
router.post('/', checkSchema(titleSchema), ToDosControllers.createTodo);

//edit a new todo
router.put('/:id', checkSchema(titleSchema), ToDosControllers.updateTodo);

//delete a todo
router.delete('/:id', ToDosControllers.deleteToDo);

module.exports = router;
