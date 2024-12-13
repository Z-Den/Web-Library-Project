import React, { useState } from 'react';

const BookForm = ({ onAddBook }) => {
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

    return (
        <form className="book-form" onSubmit={handleSubmit}>
            <input name="title" placeholder="Название" value={formData.title} onChange={handleChange} required />
            <input name="description" placeholder="Описание" value={formData.description} onChange={handleChange} />
            <input name="author_id" placeholder="ID автора" value={formData.author_id} onChange={handleChange} required />
            <input name="genre_id" placeholder="ID жанра" value={formData.genre_id} onChange={handleChange} />
            <input name="language" placeholder="Язык" value={formData.language} onChange={handleChange} />
            <button type="submit">Добавить</button>
        </form>
    );
};

export default BookForm;
