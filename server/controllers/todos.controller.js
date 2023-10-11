const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const ToDosService = require('../servers/todos.service');

class ToDosControllers {
    //get all todos
    async getAllToDo(req, res) {
        try {
            const { userEmail } = req.params;
            const todos = await ToDosService.getAllToDo(userEmail);
            return res.json(todos.rows);
        } catch (err) {
            return res.json({ detail: err.message });
        }
    }

    //create a new todo
    async createTodo(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ detail: errors.array()[0].msg });
            }
            const { user_email, title, progress, date } = req.body;
            const id = uuidv4();
            const newToDo = await ToDosService.createToDo(
                id,
                user_email,
                title,
                progress,
                date
            );
            return res.json(newToDo);
        } catch (err) {
            return res.json({ detail: err.message });
        }
    }

    //edit a new todo
    async updateTodo(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ detail: errors.array()[0].msg });
            }
            const { id } = req.params;
            const { user_email, title, progress, date } = req.body;
            const editToDo = await ToDosService.updateToDo(
                user_email,
                title,
                progress,
                date,
                id
            );
            return res.json(editToDo);
        } catch (err) {
            return res.json({ detail: err.message });
        }
    }

    //delete a todo
    async deleteToDo(req, res) {
        const { id } = req.params;
        try {
            const deleteToDo = await ToDosService.deleteToDo(id);
            return res.json(deleteToDo);
        } catch (err) {
            return res.json({ detail: err.message });
        }
    }
}

module.exports = new ToDosControllers();
