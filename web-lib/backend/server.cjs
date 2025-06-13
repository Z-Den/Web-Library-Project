const express = require('express');
const cors = require('cors');

//Системные функции
const {
    getSystemInfo,
    getFileInfo
} = require('./system-func.cjs');

//Функции для книг
const {
    getBooks,
    addBook,
    deleteBook,
    updateBook,
    getBookStats,
} = require('./book-func.cjs');

//Функции для жанров
const {
    getGenres,
    addGenre,
    deleteGenre,
    updateGenre,
} = require('./genre-func.cjs');

//Функции для авторов
const {
    getAuthors,
    addAuthor,
    deleteAuthor,
    updateAuthor,
} = require('./author-func.cjs');

//Функции авторизации
const {
    userLogin,
    userRegister,
} = require ('./login.cjs');

//Функции заявок
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

//Маршруты для жанров
app.get('/api/genres', getGenres);
app.post('/api/genres', addGenre);
app.delete('/api/genres/:id', deleteGenre);
app.put('/api/genres/:id', updateGenre);

//Маршруты для авторов
app.get('/api/authors', getAuthors);
app.post('/api/authors', addAuthor);
app.delete('/api/authors/:id', deleteAuthor);
app.put('/api/authors/:id', updateAuthor);

// Авторизация пользователя
app.post('/api/login', userLogin);
app.post('/api/register', userRegister);

// Маршруты для заявлений пользователей
app.get('/api/request', getApplications);
app.post('/api/request', sentApplication);

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
