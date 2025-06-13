import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ userName, userRole }) => {
    return (
        <header className="header">
            <div className="header-container">
                <h1 className="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px"
                         viewBox="0 -960 960 960" fill="#FFFFFF">
                        <path d="M400-400h160v-80H400v80Zm0-120h320v-80H400v80Zm0-120h320v-80H400v80Zm-80
                        400q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0
                        33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33
                        0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/>
                    </svg>
                    <Link to="/">Библиотечный архив</Link>
                </h1>

                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/">Главная</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/library">Библиотека</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about">О нас</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/feedback">Обратная связь</Link>
                        </li>
                        {userRole === 'admin' && (
                            <li className="nav-item">
                                <Link to="/admin">Админка</Link>
                            </li>
                        )}
                    </ul>
                </nav>

                <div className="nav-auth">
                    {userName ? (
                        <span>Привет, {userName}!</span>
                    ) : (
                        <Link to="/auth">Войти</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;