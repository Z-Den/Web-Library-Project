import React, { useState } from 'react';

const BookList = ({ books, searchQuery, onDeleteBook, onEditBook }) => {
    const [editingBook, setEditingBook] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        author_id: '',
        genre_id: '',
        language: ''
    });

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEditClick = (book) => {
        setEditingBook(book.book_id);
        setFormData({
            title: book.title,
            description: book.description,
            author_id: book.author_id,
            genre_id: book.genre_id,
            language: book.language
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        onEditBook(editingBook, formData);
        setEditingBook(null);
    };

    const handleCancel = () => {
        setEditingBook(null);
    };

    return (
        <div className="book-list">
            {filteredBooks.map(book => (
                <div className="book-item" key={book.book_id}>
                    {editingBook === book.book_id ? (
                        <div className="edit-form">
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
                            <button className="button" onClick={handleSave}>Сохранить</button>
                            <button className="button" onClick={handleCancel}>Отмена</button>
                        </div>
                    ) : (
                        <>
                            <h2>{book.title}</h2>
                            <p>Описание: {book.description}</p>
                            <p>Автор: {book.author_id}</p>
                            <p>Жанр: {book.genre_id}</p>
                            <p>Язык: {book.language}</p>
                            <button className="button edit-button" onClick={() => handleEditClick(book)}>Изменить</button>
                            <button className="button delete-button" onClick={() => onDeleteBook(book.book_id)}>Удалить</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default BookList;
