import React, { useState, useEffect } from 'react';
import GenreSection from '../../components/genreSection/genreSection.jsx';
import AuthorSection from '../../components/authorSection/authorSection.jsx';
import BookSection from '../../components/bookSection/bookSection.jsx';
import './AdminPanel.css';

const AdminPanel = () => {
    const [activeSection, setActiveSection] = useState('genres');

    return (
        <div className="admin-panel">
            <h1>Административная панель</h1>

            <div className="admin-navigation">
                <button onClick={() => setActiveSection('genres')}>Жанры</button>
                <button onClick={() => setActiveSection('authors')}>Авторы</button>
                <button onClick={() => setActiveSection('books')}>Книги</button>
            </div>

            <div className="admin-content">
                {activeSection === 'genres' && <GenreSection />}
                {activeSection === 'authors' && <AuthorSection />}
                {activeSection === 'books' && <BookSection />}
            </div>
        </div>
    );
};

export default AdminPanel;
