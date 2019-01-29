import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelves from './BookShelves'
import BookSearchPage from './BookSearchPage'
import { Route } from 'react-router-dom'




class BooksApp extends React.Component {
  state = {
    books: []
  }

  shelves = [
    {
      key: 'currentlyReading',
      title: 'Currently Reading'
    },
    {
      key: 'wantToRead',
      title: 'Want to Read'
    },
    {
      key: 'read',
      title: 'Read'
    },
  ]

  handleUpdateResponse = (currentBooks, response, movedBook, shelfKeyMovedTo) => {
    //book deleted from shelves
    if (shelfKeyMovedTo === BOOKSHELF_NONE.key) {
      return currentBooks.filter(currentBook => currentBook.id !== movedBook.id)
    }

    //check if the shelf from the response contains the moved book. if so, assume that the update worked.
    if (Array.isArray(response[shelfKeyMovedTo]) && response[shelfKeyMovedTo].filter(bookKey => bookKey === movedBook.key)) {
      //update worked. update movedBook, copy all other books into a new array and append the updated book
      movedBook.shelf = shelfKeyMovedTo
      return [...currentBooks.filter(currentBook => currentBook.id !== movedBook.id), movedBook]
    }

    //update didn't work. return current books
    return currentBooks
  }

  moveBookToShelf = (book, shelfKey) => {
    BooksAPI.update(book, shelfKey).then(shelves => this.setState(
      (prevState) => ({
        books: this.handleUpdateResponse(prevState.books, shelves, book, shelfKey)
      })
    )).catch(error => {
      alert(`An error happened: ${error}`)
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then(
      (books) => {
        this.setState(() => ({ books }))
      }
    ).catch(error => {
      alert(`An error happened: ${error}`)
    })
  }


  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (<BookSearchPage shelves={this.shelves} books={this.state.books} onMoveBookToShelf={this.moveBookToShelf} />)} />
        <Route exact path="/" render={() => (<BookShelves shelves={this.shelves} books={this.state.books} onMoveBookToShelf={this.moveBookToShelf} />)} />
      </div>
    )
  }
}

//target shelf when moving books to none
export const BOOKSHELF_NONE = { key: 'none', title: 'None' }

//used to display the search result
export const BOOKSHELF_SEARCH_RESULT = { key: 'none', title: 'Search result' }

export default BooksApp
