const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'library',
    password: 'postgres',
    port: 5432,
});

// Получить авторов
async function getAuthors(req, res) {
    try {
        const result = await pool.query('SELECT * FROM authors');
        res.json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении авторов:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
}

// Добавить автора
async function addAuthor(req, res) {
    const { name } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO authors (name) VALUES ($1)',
            [name]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Ошибка при добавлении автора:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
}

// Изменить автора
async function updateAuthor(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const result = await pool.query(
            'UPDATE authors SET name = $1 WHERE author_id = $2 RETURNING *',
            [name, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Автор не найден' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Ошибка при обновлении автора:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
}

// Удалить автора
async function deleteAuthor(req, res) {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM authors WHERE author_id = $1',
            [id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Автор не найден' });
        }
        res.json({ message: 'Автор успешно удален' });
    } catch (error) {
        console.error('Ошибка при удалении автора:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
}

module.exports = {getAuthors, addAuthor, deleteAuthor, updateAuthor};
