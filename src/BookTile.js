import React from 'react'
import BookShelfChanger from './BookShelfChanger'
import PropTypes from 'prop-types'
import { BOOKSHELF_NONE } from './App.js'

const BookTile = (props) => {

    const { book, shelves, onMoveBookToShelf } = props

    // destructure with default values as not all properties are set
    const {
        shelf = BOOKSHELF_NONE.key,
        title = 'Unknown',
        authors = ['Unknown'],
        imageLinks = { smallThumbnail: '' } //todo: add url to default image?
    } = book

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
                <BookShelfChanger shelves={shelves} currentShelfKey={shelf} onMoveBookToShelf={(shelfId) => onMoveBookToShelf(book, shelfId)} />
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors}</div>
        </div>
    )
}

BookTile.propTypes = {
    book: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    onMoveBookToShelf: PropTypes.func.isRequired
}


export default BookTile