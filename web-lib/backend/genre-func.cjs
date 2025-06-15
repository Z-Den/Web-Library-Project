const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'library',
    password: 'postgres',
    port: 5432,
});

// Получить жанры
async function getGenres(req, res){
    try {
        const result = await pool.query('SELECT * FROM genres');
        res.json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении жанров:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
}

// Добавить жанр
async function addGenre(req, res) {
    const { name } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO genres (name) VALUES ($1)',
            [name]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Ошибка при добавлении жанра:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
}

// Изменить жанр
async function updateGenre(req, res) {
    const { id } = req.params;
    let idStr = String(id).substr(1, id.length - 1);
    const { name } = req.body;
    try {
        const result = await pool.query(
            'UPDATE genres SET name = $1 WHERE genre_id = $2 RETURNING *',
            [name, Number(idStr)]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Жанр не найден' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Ошибка при обновлении жанра:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
}

// Удалить жанр
async function deleteGenre(req, res) {
    const { id } = req.params;
    let idStr = String(id).substr(1, id.length - 1);
    try {
        const result = await pool.query(
            'DELETE FROM genres WHERE genre_id = $1',
            [Number(idStr)]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Жанр не найден' });
        }
        res.json({ message: 'Жанр успешно удален' });
    } catch (error) {
        console.error('Ошибка при удалении жанра:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
}

module.exports = {getGenres, addGenre, deleteGenre, updateGenre};
