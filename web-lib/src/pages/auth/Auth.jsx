import React, { useState } from 'react';
import './Auth.css';
import {Link} from "react-router-dom";

const Auth = ({onLogin}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const endpoint = isRegistering ? 'register' : 'login';
            const res = await fetch(`http://localhost:3000/api/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            if (data.success) {
                onLogin(data.name, data.role);
                setMessage(`Добро пожаловать в систему, ${username}!`);
                setIsLoggedIn(true);
            } else {
                setMessage(data.message);
            }
        } catch (e){
            setMessage(`Ошибка сервера: ${e.message}`);
        }
    };

    const handleExit = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
        setMessage('Вы вышли из системы');
        onLogin('', '');
    }

    return (
        <>
            {message && <div className="message">{message}</div>}
            {isLoggedIn && (
                <div className="exit-button">
                    <button onClick={handleExit}>Выйти</button>
                </div>
            )}
            {!isLoggedIn && (
                <div className="auth">
                    <h2>{isRegistering ? 'Регистрация' : 'Вход'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Логин"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="button-row">
                            <button type="submit">{isRegistering ? 'Зарегистрироваться' : 'Войти'}</button>
                            <Link to={'/'}>Отмена</Link>
                        </div>
                        <div className="toggle-mode">
                            <button
                                type="button"
                                onClick={() => setIsRegistering(!isRegistering)}
                                className="toggle-button"
                            >
                                {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Auth;