import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import BookSearchBar from './BookSearchBar'
import { BOOKSHELF_SEARCH_RESULT } from './App.js'
import { search } from './BooksAPI'

class BookSearchPage extends Component {

    state = {
        searchTerm: '',
        books: [],
        searching: false
    }

    /*
     Books from search result come without the property shelf.
     Therfore, the shelf property has to be copied from the books fetched
     with getAll to ensure that the state on the search page matches the state of the books on the main screen
    */
    addShelveKeysToBooks = (books) => {
        const bookId2Shelf = new Map()
        this.props.books.forEach(book => bookId2Shelf.set(book.id, book.shelf))

        books.forEach(book => book.shelf = bookId2Shelf.has(book.id) ? bookId2Shelf.get(book.id) : BOOKSHELF_SEARCH_RESULT.key)
        return books
    }

    onSearchTermChanged = (searchTerm) => {
        this.setState({
            searchTerm: searchTerm,
            searching: true
        }, () => search(searchTerm).then(
            (books) => {
                this.setState({
                    books: Array.isArray(books) ? this.addShelveKeysToBooks(books) : [],
                    searching: false
                })
            }
        ).catch(error => {
            this.setState({
                searching: false
            })
            alert(`An error happened: ${error}`)
        }))
    }

    render() {
        const { shelves, onMoveBookToShelf } = this.props
        const { searchTerm } = this.state
        return (
            <div className="search-books">
                <BookSearchBar searchTerm={this.state.searchTerm} onSearchTermChanged={this.onSearchTermChanged} searching={this.state.searching} />            
                { searchTerm.length > 0 && <div className="search-books-results">
                    <BookShelf shelf={BOOKSHELF_SEARCH_RESULT} shelves={shelves} books={this.state.books} onMoveBookToShelf={onMoveBookToShelf} />
                </div>}
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