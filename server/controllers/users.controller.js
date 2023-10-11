const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const UsersService = require('../servers/users.service');

class UserControllers {
    //signup
    async signupUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ detail: errors.array()[0].msg });
            }
            const { email, password } = req.body;
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
            const signup = await UsersService.createUser(email, hashedPassword);
            const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
            return res.json({ email, token });
        } catch (err) {
            return res.json({ detail: err.message });
        }
    }

    //login
    async loginUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ detail: errors.array()[0].msg });
            }
            const { email, password } = req.body;
            const user = await UsersService.getOneUser(email);

            if (!user.rows.length) {
                return res.json({ detail: 'User does not register!' });
            }
            const success = await bcrypt.compare(
                password,
                user.rows[0].hashed_password
            );
            const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
            if (success) {
                return res.json({ email: user.rows[0].email, token });
            } else {
                return res.json({ detail: 'Password failed' });
            }
        } catch (err) {
            return res.json({ detail: err.message });
        }
    }
}

module.exports = new UserControllers();
