import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
    const [activeSection, setActiveSection] = useState('genres');

    return (
        <div className="admin-panel">
            <h1>Административная панель</h1>

            <div className="admin-navigation">
                <button onClick={() => setActiveSection('genres')}>Жанры</button>
                <button onClick={() => setActiveSection('authors')}>Авторы</button>
                <button disabled>Книги (скоро)</button>
            </div>

            <div className="admin-content">
                {activeSection === 'genres' && <GenreSection />}
                {activeSection === 'authors' && <AuthorSection />}
                {activeSection === 'books' && (
                    <div className="coming-soon">Раздел в разработке</div>
                )}
            </div>
        </div>
    );
};

// Компонент для работы с жанрами
const GenreSection = () => {
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState('');
    const [editingGenre, setEditingGenre] = useState(null);
    const [error, setError] = useState('');

    // Загрузка жанров
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/genres');
                if (!response.ok) throw new Error('Ошибка загрузки');
                const data = await response.json();
                setGenres(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchGenres();
    }, []);

    // Добавление жанра
    const handleAddGenre = async () => {
        if (!newGenre.trim()) return;

        try {
            const response = await fetch('http://localhost:3000/api/genres', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newGenre })
            });

            if (!response.ok) throw new Error('Ошибка добавления');

            const addedGenre = await response.json();
            setGenres([...genres, addedGenre]);
            setNewGenre('');
        } catch (err) {
            setError(err.message);
        }
    };

    // Редактирование жанра
    const handleUpdateGenre = async () => {
        if (!editingGenre || !editingGenre.name.trim()) return;

        try {
            const response = await fetch(`http://localhost:3000/api/genres/${editingGenre.genre_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editingGenre.name })
            });

            if (!response.ok) throw new Error('Ошибка обновления');

            const updatedGenre = await response.json();
            setGenres(genres.map(g => g.genre_id === updatedGenre.genre_id ? updatedGenre : g));
            setEditingGenre(null);
        } catch (err) {
            setError(err.message);
        }
    };

    // Удаление жанра
    const handleDeleteGenre = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/genres/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Ошибка удаления');

            setGenres(genres.filter(g => g.genre_id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="section">
            <h2>Управление жанрами</h2>

            {error && <div className="error">{error}</div>}

            <div className="form">
                <input
                    type="text"
                    value={editingGenre ? editingGenre.name : newGenre}
                    onChange={(e) => editingGenre
                        ? setEditingGenre({...editingGenre, name: e.target.value})
                        : setNewGenre(e.target.value)
                    }
                    placeholder="Название жанра"
                />

                {editingGenre ? (
                    <>
                        <button onClick={handleUpdateGenre}>Сохранить</button>
                        <button onClick={() => setEditingGenre(null)}>Отмена</button>
                    </>
                ) : (
                    <button onClick={handleAddGenre}>Добавить</button>
                )}
            </div>

            <div className="list">
                {genres.map(genre => (
                    <div key={genre.genre_id} className="item">
                        <span>{genre.name}</span>
                        <div>
                            <button onClick={() => setEditingGenre(genre)}>✏️</button>
                            <button onClick={() => handleDeleteGenre(genre.genre_id)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Компонент для работы с авторами (аналогично жанрам)
const AuthorSection = () => {
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState('');
    const [editingAuthor, setEditingAuthor] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/authors');
                if (!response.ok) throw new Error('Ошибка загрузки');
                const data = await response.json();
                setAuthors(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchAuthors();
    }, []);

    const handleAddAuthor = async () => {
        if (!newAuthor.trim()) return;

        try {
            const response = await fetch('http://localhost:3000/api/authors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newAuthor })
            });

            if (!response.ok) throw new Error('Ошибка добавления');

            const addedAuthor = await response.json();
            setAuthors([...authors, addedAuthor]);
            setNewAuthor('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateAuthor = async () => {
        if (!editingAuthor || !editingAuthor.name.trim()) return;

        try {
            const response = await fetch(`http://localhost:3000/api/authors/${editingAuthor.author_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editingAuthor.name })
            });

            if (!response.ok) throw new Error('Ошибка обновления');

            const updatedAuthor = await response.json();
            setAuthors(authors.map(a => a.author_id === updatedAuthor.author_id ? updatedAuthor : a));
            setEditingAuthor(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteAuthor = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/authors/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Ошибка удаления');

            setAuthors(authors.filter(a => a.author_id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="section">
            <h2>Управление авторами</h2>

            {error && <div className="error">{error}</div>}

            <div className="form">
                <input
                    type="text"
                    value={editingAuthor ? editingAuthor.name : newAuthor}
                    onChange={(e) => editingAuthor
                        ? setEditingAuthor({...editingAuthor, name: e.target.value})
                        : setNewAuthor(e.target.value)
                    }
                    placeholder="Имя автора"
                />

                {editingAuthor ? (
                    <>
                        <button onClick={handleUpdateAuthor}>Сохранить</button>
                        <button onClick={() => setEditingAuthor(null)}>Отмена</button>
                    </>
                ) : (
                    <button onClick={handleAddAuthor}>Добавить</button>
                )}
            </div>

            <div className="list">
                {authors.map(author => (
                    <div key={author.author_id} className="item">
                        <span>{author.name}</span>
                        <div>
                            <button onClick={() => setEditingAuthor(author)}>✏️</button>
                            <button onClick={() => handleDeleteAuthor(author.author_id)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;