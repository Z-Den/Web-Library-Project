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
            'SELECT username FROM users WHERE username = $1 AND password = $2',
            [username, password]
        );

        if (result.rows.length > 0) {
            res.json({ success: true, name: result.rows[0].username });
        } else {
            res.status(401).json({ success: false, message: 'Неверный логин или пароль' });
        }
    } catch (error) {
        console.error('Ошибка авторизации:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
}

module.exports = { userLogin };