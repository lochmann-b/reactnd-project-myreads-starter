import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelves from './BookShelves';
import BookSearchPage from './BookSearchPage';
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

  moveBookToShelf = (book, shelfKey) => {
    BooksAPI.update(book, shelfKey).then(shelves => this.setState(
      (prevState) => {
        if (Array.isArray(shelves[shelfKey]) && shelves[shelfKey].filter(bookKey => bookKey === book.key)) { //update worked
          book.shelf = shelfKey
          return [...prevState.books.filter(currentBook => currentBook.id !== book.id), book]
        }
        return prevState.books //update didn't work
      }
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
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Route path="/search" render={() => (<BookSearchPage shelves={this.shelves} onMoveBookToShelf={this.moveBookToShelf} />)} />
          <Route exact path="/" render={() => (<BookShelves shelves={this.shelves} books={this.state.books} onMoveBookToShelf={this.moveBookToShelf} />)} />
        </div>
      </div>
    )
  }
}

//target shelf when moving books to none
export const BOOKSHELF_NONE = { key: 'none', title: 'None' }

//used to display the search result
export const BOOKSHELF_SEARCH_RESULT = { key: 'none', title: 'Search result' }

export default BooksApp
