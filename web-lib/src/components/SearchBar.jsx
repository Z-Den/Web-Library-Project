import React from 'react';

const SearchBar = ({ setSearchQuery, selectedGenre, setSelectedGenre, genres }) => {
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handlePickChange = (e) => {
        setSelectedGenre(e.target.value);
    }

    return (
        <div className="filter-controls">
            <input
                className="search-bar"
                type="text"
                placeholder="Поиск по названию или автору..."
                onChange={handleSearchChange}
            />
            <label htmlFor="genreSelect">Фильтр по жанру:</label>
            <select
                id="genreSelect"
                value={selectedGenre}
                onChange={handlePickChange}
            >
                <option value="">Все жанры</option>
                {genres.map((genre) => (
                    <option key={genre.genre_id} value={genre.name}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SearchBar;