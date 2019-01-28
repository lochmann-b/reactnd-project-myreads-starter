import React, { Component } from 'react';
import BookShelfChanger from './BookShelfChanger'
import PropTypes from 'prop-types'

class BookTile extends Component {
    render() {
        const { book, shelves } = this.props
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                    <BookShelfChanger shelves={shelves} currentShelfKey={book.shelf}/>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors.join()}</div>
            </div>
        );
    }
}

BookTile.propTypes = {
    book: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired
}


export default BookTile;