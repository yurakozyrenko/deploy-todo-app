const pool = require('../db');

class ToDosService {
    async createToDo(id, user_email, title, progress, date) {
        const newToDo = await pool.query(
            `INSERT INTO todos(id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5) `,
            [id, user_email, title, progress, date]
        );
        return newToDo;
    }

    async getAllToDo(userEmail) {
        const todos = await pool.query(
            'SELECT * FROM todos WHERE user_email = $1',
            [userEmail]
        );
        return todos;
    }

    async updateToDo(user_email, title, progress, date, id) {
        const editToDo = await pool.query(
            'UPDATE todos SET user_email = $1, title = $2, progress =$3, date = $4 WHERE id = $5',
            [user_email, title, progress, date, id]
        );
        return editToDo;
    }

    async deleteToDo(id) {
        const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1', [
            id,
        ]);
        return deleteToDo;
    }
}

module.exports = new ToDosService();
