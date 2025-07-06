import React, { useState } from 'react';
import './BookList.css';

const BookList = ({ books, searchQuery, selectedGenre}) => {
    const filteredBooks = books
        .filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase())
             || book.author_name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(book => !selectedGenre || book.genre_name === selectedGenre);

    return (
        <div className="book-list">
            {filteredBooks.map(book => (
                <div className="book-item" key={book.book_id}>

                    <h2>{book.title}</h2>
                    <p>Автор: <b>{book.author_name}</b></p>
                    <p>Жанр: <b>{book.genre_name}</b></p>
                    <p>Язык оригинала: <b>{book.language}</b></p>
                    <p>В наличии: <b>{book.in_stock ? 'Да' : 'Нет'}</b></p>
                </div>
            ))}
        </div>
    );
};

export default BookList;
