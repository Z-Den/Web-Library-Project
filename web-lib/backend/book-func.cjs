const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'library',
    password: 'postgres',
    port: 5432,
});

// Получить список книг
async function getBooks(req, res) {
    try {
        const bookQuery = "SELECT \n" +
            "    books.book_id,\n" +
            "    books.title,\n" +
            "    books.description,\n" +
            "    books.language,\n" +
            "    authors.author_id,\n" +
            "    authors.name AS author_name,\n" +
            "    genres.genre_id,\n" +
            "    genres.name AS genre_name\n" +
            "FROM books\n" +
            "INNER JOIN authors USING(author_id)\n" +
            "INNER JOIN genres USING(genre_id)\n" +
            "ORDER BY books.title;\n";
        const result = await pool.query(bookQuery);
        res.json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении книг:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
}

// Добавить книгу
async function addBook(req, res) {
    const { author_id, genre_id, title, description, language } = req.body;
    try {
        await pool.query(
            'INSERT INTO books (author_id, genre_id, title, description, language) VALUES ($1, $2, $3, $4, $5)',
            [author_id, genre_id, title, description, language]
        );
        res.status(201).send('Книга добавлена.');
    } catch (error) {
        console.error('Ошибка при добавлении книги:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
}

// Удалить книгу
async function deleteBook(req, res) {
    const { id } = req.params;
    let idStr = String(id).substr(1, id.length - 1);

    try {
        await pool.query('DELETE FROM books WHERE book_id = $1', [Number(idStr)]);
        res.status(200).send('Книга удалена.');
    } catch (error) {
        console.error('Ошибка при удалении книги:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
}

// Обновить информацию о книге
async function updateBook(req, res) {
    const { id } = req.params;
    const { title, author_id, genre_id, language } = req.body;

    try {
        const result = await pool.query(
            'UPDATE books SET title = $1, author_id = $2, genre_id = $3, language = $4 WHERE book_id = $5 RETURNING *',
            [title, author_id, genre_id, language, Number(String(id).substr(1, id.length - 1))]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Книга не найдена' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Ошибка при изменении книги:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
}

// Получить статистику книг
async function getBookStats(req, res) {
    try {
        const booksCountResult = await pool.query('SELECT COUNT(*) AS count FROM books');
        const authorsCountResult = await pool.query('SELECT COUNT(DISTINCT author_id) AS count FROM books');
        const genresCountResult = await pool.query('SELECT COUNT(DISTINCT genre_id) AS count FROM books');

        const stats = {
            books: parseInt(booksCountResult.rows[0].count, 10),
            authors: parseInt(authorsCountResult.rows[0].count, 10),
            genres: parseInt(genresCountResult.rows[0].count, 10),
        };

        res.json(stats);
    } catch (error) {
        console.error('Ошибка при подсчете статистики:', error);
        res.status(500).json({ error: 'Не удалось получить статистику' });
    }
}

module.exports = { getBooks: getBooks, addBook, deleteBook, updateBook, getBookStats };
