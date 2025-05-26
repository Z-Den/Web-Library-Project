import {useEffect, useState} from 'react'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import SearchBar from './components/SearchBar'
import LoginModal from "./components/LoginModal";
import './App.css'

const API_URL = 'http://localhost:3000/api/books/'

const App = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false); // Индикатор загрузки
    const [error, setError] = useState(null); // Ошибка выполнения
    const [userName, setUserName] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');


    const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setBooks(data);

            const responseStats = await fetch('http://localhost:3000/api/stats');
            const statsData = await responseStats.json();
            setStats(statsData); // Установка статистики
        } catch (error) {
            console.error('Ошибка при загрузке книг:', error);
            setError('Не удалось загрузить книги.');
        } finally {
            setTimeout(() => setLoading(false), 750);
        }
    };

    const fetchGenres = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/genres');
            const data = await response.json();
            setGenres(data);
        } catch (error) {
            console.error('Ошибка при загрузке жанров:', error);
        }
    };

    useEffect(() => {
        console.log('Книги с сервера:', books);
    }, [books]);


    const handleAddBook = async (book) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book),
            });
            if (response.ok) {
                fetchBooks();
            }
        } catch (error) {
            console.error('Ошибка при добавлении книги:', error);
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            const response = await fetch(`${API_URL}:${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchBooks();
            }
        } catch (error) {
            console.error('Ошибка при удалении книги:', error);
        }
    };

    const handleEditBook = async (id, updatedBook) => {
        try {
            const response = await fetch(`${API_URL}:${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedBook),
            });

            if (response.ok) {
                const updatedBooks = books.map(book =>
                    book.book_id === id ? { ...book, ...updatedBook } : book
                );
                setBooks(updatedBooks);
            }
        } catch (error) {
            console.error('Ошибка при редактировании книги:', error);
        }
    };

    const [systemInfo, setSystemInfo] = useState(null); // Состояние для информации о системе

    const fetchSystemInfo = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/system-info'); // Запрос к серверу
            const data = await response.json();
            setSystemInfo(data); // Устанавливаем данные в состояние
        } catch (error) {
            console.error('Ошибка при получении информации о системе:', error);
        }
    };

    const [fileContent, setFileContent] = useState(null); // Состояние для содержимого файла

    const fetchFileInfo = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/file-info');
            const data = await response.json();
            setFileContent(data.content); // Устанавливаем содержимое файла в состояние
        } catch (error) {
            console.error('Ошибка при получении информации из файла:', error);
        }
    };

    const [stats, setStats] = useState({ books: 0, authors: 0, genres: 0 }); // Состояние для статистики

    const fetchStats = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/stats');
            const data = await response.json();
            setStats(data); // Устанавливаем статистику в состояние
        } catch (error) {
            console.error('Ошибка при загрузке статистики:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
        fetchGenres();
        fetchSystemInfo();
        fetchFileInfo();
        fetchStats();
    }, []);

    return (
        <div className="App">
            <h1>Библиотека</h1>

            <div className="auth-header" style={{ position: 'absolute', top: 10, right: 10, fontSize: '1.3rem' }}>
                {userName ? (
                    <span>Привет, {userName}!</span>
                ) : (
                    <button onClick={() => setShowLogin(true)}>Войти</button>
                )}
            </div>

            {showLogin && (
                <LoginModal
                    onLogin={(name) => {
                        setUserName(name);       // Сохраняем имя
                        setShowLogin(false);     // Закрываем модалку
                    }}
                    onClose={() => setShowLogin(false)}
                />
            )}


            {/* Сообщение о статусе выполнения запросов */}
            {loading && <p className="status-loading">Загрузка...</p>}
            {error && <p className="status-error">{error}</p>}

            <SearchBar setSearchQuery={setSearchQuery} />
            <div className="filter-controls">
                <label htmlFor="genreSelect">Фильтр по жанру:</label>
                <select
                    id="genreSelect"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="">Все жанры</option>
                    {genres.map((genre) => (
                        <option key={genre.genre_id} value={genre.name}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
            <BookForm onAddBook={handleAddBook} userName={userName} />
            <BookList
                books={books}
                userName={userName}
                searchQuery={searchQuery}
                onDeleteBook={handleDeleteBook}
                onEditBook={handleEditBook}
                selectedGenre={selectedGenre}
            />
            {userName === 'admin' && (
            <div className="system-info">
                <h2>Информация о системе</h2>
                {systemInfo ? (
                    <ul>
                        <li>Платформа: {systemInfo.platform}</li>
                        <li>Архитектура: {systemInfo.architecture}</li>
                        <li>Процессоры: {systemInfo.cpus.join(', ')}</li>
                        <li>Общая память: {(systemInfo.totalMemory / (1024 ** 3)).toFixed(2)} GB</li>
                        <li>Свободная память: {(systemInfo.freeMemory / (1024 ** 3)).toFixed(2)} GB</li>
                        <li>Время работы системы: {(systemInfo.uptime / 3600).toFixed(2)} часов</li>
                    </ul>
                ) : (
                    <p>Загрузка информации о системе...</p>
                )}
            </div>
            )}
            {userName === 'admin' && (
            <div className="file-info">
                <h2>Содержимое файла</h2>
                {fileContent ? (
                    <pre>{fileContent}</pre>
                ) : (
                    <p>Загрузка содержимого файла...</p>
                )}
            </div>
            )}
            <div className="stats">
                <p>Книг: {stats.books}</p>
                <p>Авторов: {stats.authors}</p>
                <p>Жанров: {stats.genres}</p>
            </div>
        </div>


);
};

export default App
