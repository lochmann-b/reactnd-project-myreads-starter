import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom'

class BookShelves extends Component {
    render() {
        const { shelves, books } = this.props

        return (
            <div>
                <div className="list-books-content">
                    {shelves.map(
                        shelf => (<BookShelf key={shelf.key} shelf={shelf} shelves={shelves} books={books.filter(book => book.shelf === shelf.key)} />)
                    )}
                </div>
                <Link className="open-search" to="/search">
                    <button className="open-search">Add a book</button>
                </Link>
            </div>
        );
    }
}

BookShelves.propTypes = {
    shelves: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired
}

export default BookShelves