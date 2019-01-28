import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelves from './BookShelves';
import BookSearchPage from './BookSearchPage';



class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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
        {this.state.showSearchPage ? (
          <BookSearchPage shelves={this.shelves} />
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <BookShelves shelves={this.shelves} books={this.state.books} />
              
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

//target shelf when moving books to none
export const BOOKSHELF_NONE = { key: 'none', title: 'None' }

//used to display the search result
export const BOOKSHELF_SEARCH_RESULT = { key: 'none', title: 'Search result' }

export default BooksApp
