const express = require('express');
const cors = require('cors');
const {
    getSystemInfo,
    getFileInfo
} = require('./system-func.cjs');
const {
    getBooks,
    addBook,
    deleteBook,
    updateBook,
    getBookStats,
    getGenres,
} = require('./book-func.cjs');

const {
    userLogin,
    userRegister,
} = require ('./login.cjs');

const {
    sentApplication,
    getApplications,
} = require ('./requests.cjs');

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
app.post('/api/register', userRegister);

// Запрос жанров для фильтрации
app.get('/api/genres', getGenres);

// Маршруты для заявлений пользователей
app.get('/api/request', getApplications);
app.post('/api/request', sentApplication);

// Маршруты админа


app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
