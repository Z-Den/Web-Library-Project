import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ onLogin, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
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
                onClose();
            } else {
                setError(data.message);
            }
        } catch {
            setError('Ошибка сервера');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
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
                    {error && <div className="error">{error}</div>}
                    <div className="button-row">
                        <button type="submit">{isRegistering ? 'Зарегистрироваться' : 'Войти'}</button>
                        <button type="button" onClick={onClose}>Отмена</button>
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
        </div>
    );
};

export default LoginModal;