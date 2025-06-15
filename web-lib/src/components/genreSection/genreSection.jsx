import React, { useState, useEffect } from 'react';

const GenreSection = () => {
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState('');
    const [editingGenre, setEditingGenre] = useState(null);
    const [error, setError] = useState('');

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

    const handleAddGenre = async () => {
        if (!newGenre.trim()) return;

        try {
            const response = await fetch('http://localhost:3000/api/genres', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newGenre })
            });

            if (!response.ok) throw new Error('Ошибка добавления');

            await fetchGenres();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateGenre = async () => {
        if (!editingGenre || !editingGenre.name.trim()) return;

        try {
            const response = await fetch(`http://localhost:3000/api/genres/:${editingGenre.genre_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editingGenre.name })
            });

            if (!response.ok) throw new Error('Ошибка обновления');

            const updatedGenres =
                genres.map(g => g.genre_id === editingGenre.genre_id ? editingGenre : g);
            setGenres(updatedGenres);
            setEditingGenre(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteGenre = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/genres/:${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Ошибка удаления');

            setGenres(genres.filter(g => g.genre_id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {

        fetchGenres();
    }, []);

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
                        <span>{genre.genre_id}.</span>
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

export default GenreSection;