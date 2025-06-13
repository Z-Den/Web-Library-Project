import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <h1>Добро пожаловать в Библиотечный архив</h1>
                <p>Здесь собраны лучшие произведения мировой литературы. Ищите, читайте, сохраняйте!</p>
                <button>Перейти к библиотеке</button>
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
                    <h3>💾 Сохранение в избранное</h3>
                    <p>Создавайте свою личную коллекцию</p>
                </div>
            </section>

            <section className="popular-books">
                <h2>Популярные книги</h2>
                <div className="book-grid">
                    {/* Будет динамический список книг */}
                    <div className="book-card">
                        <h4>Название книги</h4>
                        <p>Автор</p>
                    </div>
                    <div className="book-card">
                        <h4>Название книги</h4>
                        <p>Автор</p>
                    </div>
                    <div className="book-card">
                        <h4>Название книги</h4>
                        <p>Автор</p>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default Home;