import React from 'react';
import './SearchBar.css';

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
            {genres.length > 0 && (
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
            )}
        </div>
    );
};

export default SearchBar;