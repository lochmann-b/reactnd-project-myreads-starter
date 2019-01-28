import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf';

class BookShelves extends Component {
    render() {
        const { shelves, books } = this.props

        return (
            <div className="list-books-content">
                {shelves.map(
                    shelf => (<BookShelf key={shelf.key} shelf={shelf} shelves={shelves} books={books.filter( book => book.shelf === shelf.key)}/>)
                )}
            </div>
        );
    }
}

BookShelves.propTypes = {
    shelves: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired
}

export default BookShelves;