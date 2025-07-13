import './BookList.css';

//TODO: create a booklist component with search functionality

//TODO: move books from library and book section to booklist

const BookList = ({ books, searchQuery, selectedGenre, userRole, handleEditClick, handleDeleteBook}) => {
    const filteredBooks = books
        .filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase())
             || book.author_name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(book => !selectedGenre || book.genre_name === selectedGenre);

    return (
        <div className="book-list">
            {filteredBooks.length === 0 && <span>По вашему запросу ничего не нашлось.<br/>
                                                 Попробуйте поискать что-то ещё!</span>}
            {filteredBooks.map(book => {
                //TODO: create a book component and move it there
                return (
                    <div key={book.book_id} className="book-item">
                        <div className="book-info">
                            <h3>{book.title}</h3>
                            <p>Автор: <b>{book.author_name}</b></p>
                            <p>Жанр: <b>{book.genre_name}</b></p>
                            <p>Язык оригинала: <b>{book.language}</b></p>
                            <p>Наличие: <b>{book.in_stock ? 'Да' : 'Нет'}</b></p>
                        </div>
                        {userRole === 'admin' && (
                                <div className="book-actions">
                                    <button onClick={() => handleEditClick(book)}>✏️</button>
                                    <button onClick={() => handleDeleteBook(book.book_id)}>🗑️</button>
                                </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default BookList;
