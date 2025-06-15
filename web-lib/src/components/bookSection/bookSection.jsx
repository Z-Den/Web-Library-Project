import React, { useState, useEffect } from 'react';
import SearchBar from "../searchBar/SearchBar.jsx";

const BookSection = () => {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Форма для добавления/редактирования
    const [formData, setFormData] = useState({
        author_id: '',
        genre_id: '',
        title: '',
        description: '',
        language: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBooks = books
        .filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase())
            || book.author_name.toLowerCase().includes(searchQuery.toLowerCase()));

    const fetchData = async () => {
        setLoading(true);
        try {
            const [booksRes, authorsRes, genresRes] = await Promise.all([
                fetch('http://localhost:3000/api/books'),
                fetch('http://localhost:3000/api/authors'),
                fetch('http://localhost:3000/api/genres')
            ]);

            if (!booksRes.ok || !authorsRes.ok || !genresRes.ok) {
                throw new Error('Ошибка загрузки данных');
            }

            setBooks(await booksRes.json());
            setAuthors(await authorsRes.json());
            setGenres(await genresRes.json());
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Обработчики CRUD операций
    const handleAddBook = async () => {
        if (!formData.title || !formData.language || !formData.author_id || !formData.genre_id) {
            setError('Заполните все поля');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Ошибка добавления');

            await fetchData();
            resetForm();

        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateBook = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/books/:${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Ошибка обновления');

            const updatedBook = await response.json();
            setBooks(books.map(b => b.book_id === editingId ? updatedBook : b));
            resetForm();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/books/:${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Ошибка удаления');

            setBooks(books.filter(b => b.book_id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditClick = (book) => {
        setFormData({
            title: book.title,
            language: book.language,
            author_id: book.author_id,
            genre_id: book.genre_id,
            description: book.description
        });
        setEditingId(book.book_id);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            language: '',
            author_id: '',
            genre_id: '',
            description: ''
        });
        setEditingId(null);
        setError('');
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="book-management">
            <h2>Управление книгами</h2>

            <SearchBar
                setSearchQuery={setSearchQuery}
                genres={[]}
            />

            {error && <div className="error-message">{error}</div>}
            {loading && <div className="loading">Загрузка...</div>}

            <div className="book-form">
                <input
                    type="text"
                    placeholder="Название книги"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                />

                <select
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                >
                    <option value="">Выберите язык</option>
                    <option value="RU">Русский</option>
                    <option value="EN">Английский</option>
                    <option value="DE">Немецкий</option>
                    <option value="FR">Французский</option>
                    <option value="IT">Итальянский</option>
                    <option value="ES">Испанский</option>
                    <option value="PT">Португальский</option>
                    <option value="JA">Японский</option>
                    <option value="KO">Корейский</option>
                    <option value="ZH">Китайский</option>
                </select>

                <select
                    value={formData.author_id}
                    onChange={(e) => setFormData({...formData, author_id: e.target.value})}
                >
                    <option value="">Выберите автора</option>
                    {authors.map(author => (
                        <option key={author.author_id} value={author.author_id}>
                            {author.name}
                        </option>
                    ))}
                </select>

                <select
                    value={formData.genre_id}
                    onChange={(e) => setFormData({...formData, genre_id: e.target.value})}
                >
                    <option value="">Выберите жанр</option>
                    {genres.map(genre => (
                        <option key={genre.genre_id} value={genre.genre_id}>
                            {genre.name}
                        </option>
                    ))}
                </select>

                <input
                    type={"text"}
                    className={"description"}
                    placeholder={"Описание"}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                />

                <div className="form-actions">
                    {editingId ? (
                        <>
                            <button onClick={handleUpdateBook}>Сохранить</button>
                            <button onClick={resetForm}>Отмена</button>
                        </>
                    ) : (
                        <button onClick={handleAddBook}>Добавить</button>
                    )}
                </div>
            </div>



            <div className="book-list">
                {filteredBooks.map(book => {
                    const author = authors.find(a => a.author_id === book.author_id)?.name || 'Неизвестен';
                    const genre = genres.find(g => g.genre_id === book.genre_id)?.name || 'Не указан';

                    return (
                        <div key={book.book_id} className="book-item">
                            <div className="book-info">
                                <h3>{book.title}</h3>
                                <p>Автор: <b>{author}</b></p>
                                <p>Жанр: <b>{genre}</b></p>
                                <p>Язык: <b>{book.language}</b></p>
                            </div>
                            <div className="book-actions">
                                <button onClick={() => handleEditClick(book)}>✏️</button>
                                <button onClick={() => handleDeleteBook(book.book_id)}>🗑️</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BookSection;
