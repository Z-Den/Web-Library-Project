import './Library.css';
import {useEffect, useState} from 'react';
import BookList from '../../components/bookList/BookList.jsx';
import SearchBar from '../../components/searchBar/SearchBar.jsx';
import Stats from "../../components/stats/Stats.jsx";
import SystemInfo from "../../components/systemInfo/SystemInfo.jsx";

const API_URL = 'http://localhost:3000/api/books/';

const Library = ({userRole}) => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false); // Индикатор загрузки
    const [error, setError] = useState(null); // Ошибка выполнения

    const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Ошибка при загрузке книг:', error);
            setError('Не удалось загрузить книги.');
        } finally {
            setTimeout(() => setLoading(false), 750);
        }
    };

    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');

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
        fetchBooks();
        fetchGenres();
    }, []);

    return (
        <div className="Library">
            <h1>Библиотека</h1>

            {/* Сообщение о статусе выполнения запросов */}
            {loading && <p className="status-loading">Загрузка...</p>}
            {error && <p className="status-error">{error}</p>}

            <SearchBar
                setSearchQuery={setSearchQuery}
                setSelectedGenre={setSelectedGenre}
                selectedGenre={selectedGenre}
                genres={genres}
            />

            <BookList
                books={books}
                searchQuery={searchQuery}
                selectedGenre={selectedGenre}
            />

            {/*{userRole === 'admin' && (*/}
            {/*    <SystemInfo/>*/}
            {/*)}*/}

            <Stats/>
        </div>

    );
};

export default Library
