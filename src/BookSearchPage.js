import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf';
import BookSearchBar from './BookSearchBar'
import { BOOKSHELF_SEARCH_RESULT } from './App.js'

class BookSearchPage extends Component {
    render() {
        const { shelves, books = [] } = this.props;
        return (
            <div className="search-books">
                <BookSearchBar />
                <div className="search-books-results">
                    <BookShelf shelf={BOOKSHELF_SEARCH_RESULT} shelves={shelves} books={books} />
                </div>
            </div>
        );
    }
}

BookSearchPage.propTypes = {
    shelves: PropTypes.array.isRequired,
    books: PropTypes.array //optional
};

export default BookSearchPage;