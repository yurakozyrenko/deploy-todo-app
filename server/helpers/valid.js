registerSchema = {
    email: {
        isEmail: true,
        errorMessage: 'Укажите корректный email (example@example.com)',
    },
    password: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'Password должен быть минимум 6 cимволов',
        },
    },
};

titleSchema = {
    title: {
        notEmpty: true,
        errorMessage: 'Task not empty!',
    },
};

module.exports = { registerSchema, titleSchema };
