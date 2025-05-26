import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ onLogin, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:3000/api/login', {
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
                <h2>Вход</h2>
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
                        <button type="submit">Войти</button>
                        <button type="button" onClick={onClose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
