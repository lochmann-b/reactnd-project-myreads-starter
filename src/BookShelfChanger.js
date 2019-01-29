import React from 'react'
import PropTypes from 'prop-types'
import { BOOKSHELF_NONE } from './App.js'

const BookShelfChanger = (props) => {
    const { shelves, onMoveBookToShelf, currentShelfKey } = props
    const move = { key: 'move', title: 'Move to...', disabled: true }

    return (
        <div className="book-shelf-changer">
            <select value={currentShelfKey} onChange={(e) => onMoveBookToShelf(e.target.value)}>
                {[move, ...shelves, BOOKSHELF_NONE].map(shelf => (<option disabled={shelf.disabled} key={shelf.key} value={shelf.key}>{shelf.title}</option>))}
            </select>
        </div>
    )
}


BookShelfChanger.propTypes = {
    shelves: PropTypes.array.isRequired,
    currentShelfKey: PropTypes.string.isRequired,
    onMoveBookToShelf: PropTypes.func.isRequired
}

export default BookShelfChanger