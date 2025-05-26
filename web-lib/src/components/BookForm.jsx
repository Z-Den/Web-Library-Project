import React, { useState } from 'react';

const BookForm = ({ onAddBook, userRole }) => {
    const [formData, setFormData] = useState({
        author_id: '',
        genre_id: '',
        title: '',
        description: '',
        language: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddBook(formData);
        setFormData({author_id: '', genre_id: '', title: '', description: '', language: '' });
    };

    if (!userRole || userRole === 'admin') {
        return (
            <div>
                <h3>Для добавления книг необходимо войти в систему в роли админа.</h3>
            </div>
        );
    }

    return (
        <form className="book-form" onSubmit={handleSubmit}>
            <input className="book-input" name="title" placeholder="Название" value={formData.title} onChange={handleChange} maxLength={255} required />
            <input className="book-input" name="description" placeholder="Описание" value={formData.description} onChange={handleChange} maxLength={255} />
            <input className="book-input" name="author_id" placeholder="ID автора" value={formData.author_id} onChange={handleChange} type={"number"} required />
            <input className="book-input" name="genre_id" placeholder="ID жанра" value={formData.genre_id} onChange={handleChange} type={"number"} />
            <input className="book-input" name="language" placeholder="Язык" value={formData.language} onChange={handleChange} maxLength={2} />
            <button className="submit-button" type="submit">Добавить</button>
        </form>
    );
};

export default BookForm;
