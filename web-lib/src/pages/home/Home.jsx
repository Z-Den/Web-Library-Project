import './Home.css';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <h1>Добро пожаловать в <br/> Библиотечный архив</h1>
                <p>Здесь собраны лучшие произведения мировой литературы. Ищите, читайте, сохраняйте!</p>
                <Link to={'/library'}>Перейти к библиотеке</Link>
            </section>

            <section className="features">
                <div className="feature-card">
                    <h3>📚 Обширная коллекция</h3>
                    <p>Тысячи книг разных жанров и эпох</p>
                </div>
                <div className="feature-card">
                    <h3>🔍 Удобный поиск</h3>
                    <p>Находите книги по названию, автору или жанру</p>
                </div>
                <div className="feature-card">
                    <h3>💾 Сохранение в избранное (скоро)</h3>
                    <p>Создавайте свою личную коллекцию</p>
                </div>
            </section>

            <section className="popular-books">
                <h2>Популярные книги</h2>
                <div className="book-grid">
                    <div className="book-card">
                        <h4>"Отцы и дети"</h4>
                        <p>И.С. Тургенев</p>
                    </div>
                    <div className="book-card">
                        <h4>"Евгений Онегин"</h4>
                        <p>А.С. Пушкин</p>
                    </div>
                    <div className="book-card">
                        <h4>"Бородино"</h4>
                        <p>М.Ю. Лермонтов</p>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default Home;