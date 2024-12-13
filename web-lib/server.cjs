const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');
const os = require('os');
const fs = require('fs');
const path = require('path'); // Модуль для работы с путями

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'library',
    password: 'postgres',
    port: 5432,
});

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"]
}))
app.use(express.json());

// Маршрут для получения информации об операционной системе
app.get('/api/system-info', (req, res) => {
    try {
        const systemInfo = {
            platform: os.platform(), // Операционная система
            architecture: os.arch(), // Архитектура процессора
            cpus: os.cpus().map(cpu => cpu.model), // Список процессоров
            totalMemory: os.totalmem(), // Общее количество памяти
            freeMemory: os.freemem(), // Доступная память
            uptime: os.uptime() // Время работы системы
        };

        res.json(systemInfo); // Возвращаем информацию в формате JSON
    } catch (error) {
        console.error('Ошибка получения информации о системе:', error);
        res.status(500).json({ error: 'Не удалось получить информацию о системе' });
    }
});

// Маршрут для чтения информации из файла
app.get('/api/file-info', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'info.txt'); // Путь к вашему файлу

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла:', err);
            return res.status(500).json({ error: 'Не удалось прочитать файл' });
        }

        res.json({ content: data }); // Возвращаем содержимое файла в формате JSON
    });
});

app.get('/api/stats', async (req, res) => {
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
});


// CRUD маршруты для книг
app.get('/api/books', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books ORDER BY title');
        res.json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении книг:', error);
        res.status(500).json({error: 'Ошибка сервера'});
    }
});

app.options('/api/books', cors())
app.post('/api/books', async (req, res) => {
    const {author_id, genre_id, title, description, language} = req.body;
    try {
        await pool.query(
            'INSERT INTO books (author_id, genre_id, title, description, language) VALUES ($1, $2, $3, $4, $5)',
            [author_id, genre_id, title, description, language]
        );
        res.status(201).send('Книга добавлена.');
    } catch (error) {
        console.error('Ошибка при добавлении книги:', error);
        res.status(500).json({error: 'Ошибка сервера'});
    }
});

app.delete('/api/books/:id', async (req, res) => {
    const {id} = req.params;
    let idStr = String(id).substr(1, id.length - 1);

    try {
        await pool.query('DELETE FROM books WHERE book_id = $1', [Number(idStr)]);
        res.status(200).send('Книга удалена.');
    } catch (error) {
        console.error('Ошибка при удалении книги:', error);
        res.status(500).json({error: 'Ошибка сервера'});
    }
});

// PUT /api/books/:id
app.put('/api/books/:id', async (req, res) => {
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
});


app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
