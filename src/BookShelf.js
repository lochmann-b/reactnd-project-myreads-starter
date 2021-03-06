import React from 'react'
import PropTypes from 'prop-types'
import BookTile from './BookTile'

const BookShelf = (props) => {
    const { shelf, shelves, books, onMoveBookToShelf } = props
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => (
                        <BookTile key={book.id} book={book} shelves={shelves} onMoveBookToShelf={onMoveBookToShelf} />
                    ))
                    }
                </ol>
            </div>
        </div>
    )
}


BookShelf.propTypes = {
    shelf: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    onMoveBookToShelf: PropTypes.func.isRequired
}

export default BookShelf