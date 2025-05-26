const express = require('express');
const cors = require('cors');
const {
    getSystemInfo, getFileInfo
} = require('./system-func.cjs');
const {
    getBooks, addBook, deleteBook, updateBook, getBookStats, getGenres
} = require('./book-func.cjs');

const {
    userLogin
} = require ('./login.cjs');

const app = express();
const port = 3000;

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"]
}));
app.use(express.json());

// Маршруты для системы
app.get('/api/system-info', getSystemInfo);
app.get('/api/file-info', getFileInfo);

// Маршруты для книг
app.get('/api/books', getBooks);
app.post('/api/books', addBook);
app.delete('/api/books/:id', deleteBook);
app.put('/api/books/:id', updateBook);
app.get('/api/stats', getBookStats);

// Авторизация пользователя
app.post('/api/login', userLogin);

//Запрос жанров для фильтрации
app.get('/api/genres', getGenres);



app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
