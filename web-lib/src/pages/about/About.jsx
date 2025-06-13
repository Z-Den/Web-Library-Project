import './About.css';

const About = () => {
    return (
        <div className="about">
            <section className="about-hero">
                <h1>О Библиотечном архиве</h1>
                <p>Наша миссия — сохранять и распространять знания через литературу.</p>
            </section>

            <section className="history">
                <h2>📜 История проекта</h2>
                <p>Библиотечный архив был основан в 2023 году с целью создания открытой коллекции классической и современной литературы.</p>
            </section>

            <section className="team">
                <h2>👥 Наша команда</h2>
                <div className="team-grid">
                    <div className="team-member">
                        <h4>Иван Иванов</h4>
                        <p>Основатель</p>
                    </div>
                    <div className="team-member">
                        <h4>Анна Петрова</h4>
                        <p>Главный редактор</p>
                    </div>
                </div>
            </section>

            <section className="contact">
                <h2>📩 Свяжитесь с нами</h2>
                <p>Есть вопросы или предложения? Напишите нам!</p>
                <button>Написать</button>
            </section>
        </div>
    );
};
export default About;