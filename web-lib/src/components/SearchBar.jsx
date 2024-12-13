import React from 'react';

const SearchBar = ({ setSearchQuery }) => {
    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <input
            className="search-bar"
            type="text"
            placeholder="Поиск по названию..."
            onChange={handleChange}
        />
    );
};

export default SearchBar;