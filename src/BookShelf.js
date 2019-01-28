import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookTile from './BookTile'

class BookShelf extends Component {
    render() {
        const { shelf, shelves, books } = this.props
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book => (
                            <BookTile key={book.id} book={book} shelves={shelves} />
                        ))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

BookShelf.propTypes = {
    shelf: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired
}

export default BookShelf;