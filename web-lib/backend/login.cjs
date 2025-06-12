const {Pool} = require("pg");
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'library',
    password: 'postgres',
    port: 5432,
});

//Авторизация пользователей
async function userLogin (req, res) {
    const { username, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT username, role FROM users WHERE username = $1 AND password = $2',
            [username, password]
        );

        if (result.rows.length > 0) {
            res.json({ success: true, name: result.rows[0].username, role: result.rows[0].role });
        } else {
            res.status(401).json({ success: false, message: 'Неверный логин или пароль' });
        }
    } catch (error) {
        console.error('Ошибка авторизации:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
}

// регистрация пользователей
async function userRegister (req, res) {
    const {username, password} = req.body;

    try{
        const checkUser = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (checkUser.rows.length > 0) {
            res.status(400).json({ success: false, message: 'Такой пользователь уже существует!' });
        }

        const result = await pool.query(
            'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING username, role',
            [username, password, 'user']
        );

        // Отправляем успешный ответ
        res.json({
            success: true,
            name: result.rows[0].username,
            role: result.rows[0].role,
            message: 'Вы успешно зарегистрировались!'
        });

    } catch (error) {
        console.error('Ошибка авторизации:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
}

module.exports = { userLogin, userRegister };