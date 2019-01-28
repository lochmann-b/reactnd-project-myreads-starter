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

  componentDidMount() {
    BooksAPI.getAll().then(
      (books) => {
        this.setState(() => ({ books }))
      }
    )
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Route path="/search" render={() => (<BookSearchPage shelves={this.shelves} />)} />
          <Route exact path="/" render={() => (<BookShelves shelves={this.shelves} books={this.state.books} />)} />
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
