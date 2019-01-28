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

    onSearchTermChanged = (searchTerm) => {
        this.setState({
            searchTerm: searchTerm,
        }, () => search(searchTerm).then(
            (books) => {
                console.log(books)
                this.setState({
                    books: Array.isArray(books) ? books : []
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
    onMoveBookToShelf: PropTypes.func.isRequired
}

export default BookSearchPage