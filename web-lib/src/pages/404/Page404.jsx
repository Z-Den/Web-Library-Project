import './Page404.css';
import {Link} from "react-router-dom";

const pageNotFound = () => {
    return(
        <div className="not-found">
            <div className="error-content">
                <h1>404</h1>
                <h2>Ой! Страница потерялась в книгах...</h2>
                <p>Похоже, такой страницы не существует. Возможно, она была удалена или перемещена.</p>

                <div className="book-animation">
                    {/* Анимация летающих книг (можно сделать через CSS) */}
                    <div className="flying-book">📖</div>
                    <div className="flying-book">📚</div>
                    <div className="flying-book">🖋️</div>
                </div>

                <Link to={'/'}>Вернуться на главную</Link>
            </div>
        </div>
    )
}

export default pageNotFound;