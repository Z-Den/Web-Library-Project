import React, { useState, useEffect } from 'react';
import SearchBar from "../searchBar/SearchBar.jsx";

const AuthorSection = () => {
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState('');
    const [editingAuthor, setEditingAuthor] = useState(null);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAuthors = authors
        .filter (a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));

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

    const handleAddAuthor = async () => {
        if (!newAuthor.trim()) return;

        try {
            const response = await fetch('http://localhost:3000/api/authors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newAuthor })
            });

            if (!response.ok) throw new Error('Ошибка добавления');
            await fetchAuthors();
            setNewAuthor('');

        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateAuthor = async () => {
        if (!editingAuthor || !editingAuthor.name.trim()) return;

        try {
            const response = await fetch(`http://localhost:3000/api/authors/:${editingAuthor.author_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editingAuthor.name })
            });

            if (!response.ok) throw new Error('Ошибка обновления');

            const updatedAuthors =
                authors.map(a => a.author_id === editingAuthor.author_id ? editingAuthor : a);
            setAuthors(updatedAuthors);
            setEditingAuthor(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteAuthor = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/authors/:${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Ошибка удаления');
            setAuthors(authors.filter(a => a.author_id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    return (
        <div className="section">
            <h2>Управление авторами</h2>

            <SearchBar
                setSearchQuery={setSearchQuery}
                genres={[]}
            />

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
                {filteredAuthors.map(author => (
                    <div key={author.author_id} className="item">
                        <span>{author.author_id}.</span>
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

export default AuthorSection;
