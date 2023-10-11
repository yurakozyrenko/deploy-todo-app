const pool = require('../db');

class UsersService {
    async createUser(email, hashedPassword) {
        const signup = await pool.query(
            `INSERT INTO users (email,hashed_password) VALUES ($1, $2)`,
            [email, hashedPassword]
        );
        return signup;
    }

    async getOneUser(email) {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [
            email,
        ]);
        return user;
    }
}

module.exports = new UsersService();
