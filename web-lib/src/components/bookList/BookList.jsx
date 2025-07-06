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
<<<<<<< Updated upstream
                    {editingBook === book.book_id ? (
                        <>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Название"
                                maxLength={255}
                            />
                            <input
                                name="author_id"
                                value={formData.author_id}
                                onChange={handleChange}
                                placeholder="Автор"
                                type={"number"}
                            />
                            <input
                                name="genre_id"
                                value={formData.genre_id}
                                onChange={handleChange}
                                placeholder="Жанр"
                                type={"number"}
                            />
                            <input
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                placeholder="Язык"
                                maxLength={2}
                            />
                            <button className="button save-button" onClick={handleSave}>Сохранить</button>
                            <button className="button cancel-button" onClick={handleCancel}>Отмена</button>
                        </>
                    ) : (
                        <>
                            <h2>{book.title}</h2>
                            <p>Описание: {book.description}</p>
                            <p>Автор: {book.author_name}</p>
                            <p>Жанр: {book.genre_name}</p>
                            <p>Язык оригинала: {book.language}</p>
                            {userRole === "admin" && (
                                <>
                                    <p>ID автора: {book.author_id}</p>
                                    <p>ID жанра: {book.genre_id}</p>
                                    <button className="button edit-button" onClick={() => handleEditClick(book)}>Изменить</button>
                                    <button className="button delete-button" onClick={() => onDeleteBook(book.book_id)}>Удалить</button>
                                </>
                            )}
                        </>
                    )}
=======
                    <h2>{book.title}</h2>
                    <p>Автор: <b>{book.author_name}</b></p>
                    <p>Жанр: <b>{book.genre_name}</b></p>
                    <p>Язык оригинала: <b>{book.language}</b></p>
                    <p>В наличии: <b>{book.in_stock ? 'Да' : 'Нет'}</b></p>
>>>>>>> Stashed changes
                </div>
            ))}
        </div>
    );
};

export default BookList;
