import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/api/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: formData.name,
                    userEmail: formData.email,
                    userMessage: formData.message
                }),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Попробуйте прочитать тело ошибки
                console.error('Error details:', errorData);
                throw new Error(errorData.message || 'Ошибка сервера');
            }

            setIsSubmitted(true);

        } catch (error) {
            console.error('Ошибка:', error);
            setError(error.message || 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
        }
    };

    const handleNewRequest = () => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
    }

    const isFormValid = formData.name && formData.email && formData.message;

    return (
        <div className="feedback-page">
            <div className="feedback-container">
                <h2>Обратная связь</h2>

                {error && <div className="error-message">{error}</div>}

                {isSubmitted ? (
                    <div className="success-message">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4CAF50" width="48px" height="48px">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <h3>Спасибо за ваше сообщение!</h3>
                        <p>Ваша заявка принята. Мы свяжемся с вами в ближайшее время.</p>
                        <p>Вот ваши данные:</p>
                            <ul className="feedback-data">
                                <li>Имя: <b>{formData.name}</b></li>
                                <li>Email: <b>{formData.email}</b></li>
                                <li>Сообщение: <b>{formData.message}</b></li>
                            </ul>

                        <button
                            className="new-request-btn"
                            onClick={handleNewRequest}
                        >
                            Отправить новое сообщение
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="feedback-form">
                        <div className="form-group">
                            <label htmlFor="name">Ваше имя</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Сообщение</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={!isFormValid}
                        >
                            Отправить
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Feedback;