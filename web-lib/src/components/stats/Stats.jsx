import {useState, useEffect} from  "react";

export const Stats = () => {

    const [stats, setStats] = useState({ books: 0, authors: 0, genres: 0 }); // Состояние для статистики

    const fetchStats = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/stats');
            const data = await response.json();
            setStats(data); // Устанавливаем статистику в состояние
        } catch (error) {
            console.error('Ошибка при загрузке статистики:', error);
        }
    };

    useEffect(() => {
        fetchStats();
    });

    return (
        <div className="stats">
            <p>Книг: {stats.books}</p>
            <p>Авторов: {stats.authors}</p>
            <p>Жанров: {stats.genres}</p>
        </div>
    )
}