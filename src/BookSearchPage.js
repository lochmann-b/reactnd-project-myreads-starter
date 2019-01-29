import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf';
import BookSearchBar from './BookSearchBar'
import { BOOKSHELF_SEARCH_RESULT } from './App.js'
import { search } from './BooksAPI';

class BookSearchPage extends Component {

    state = {
        searchTerm: '',
        books: []
    }

    addShelveKeysToBooks = (books) => {
        const bookId2Shelf = new Map()
        this.props.books.forEach(book => bookId2Shelf.set(book.id, book.shelf))

        books.forEach(book => book.shelf = bookId2Shelf.has(book.id) ? bookId2Shelf.get(book.id) : BOOKSHELF_SEARCH_RESULT.key)
        return books
    }

    onSearchTermChanged = (searchTerm) => {
        this.setState({
            searchTerm: searchTerm,
        }, () => search(searchTerm).then(
            (books) => {
                this.setState({
                    books: Array.isArray(books) ? this.addShelveKeysToBooks(books) : []
                })
            }
        ).catch(error => {
            alert(`An error happened: ${error}`)
        }))
    }

    render() {
        const { shelves, onMoveBookToShelf } = this.props;
        return (
            <div className="search-books">
                <BookSearchBar searchTerm={this.state.searchTerm} onSearchTermChanged={this.onSearchTermChanged} />
                <div className="search-books-results">
                    <BookShelf shelf={BOOKSHELF_SEARCH_RESULT} shelves={shelves} books={this.state.books} onMoveBookToShelf={onMoveBookToShelf} />
                </div>
            </div>
        )
    }
}

BookSearchPage.propTypes = {
    shelves: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    onMoveBookToShelf: PropTypes.func.isRequired
}

export default BookSearchPage