import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { BOOKSHELF_NONE } from './App.js'

class BookShelfChanger extends Component {
    render() {
        const { shelves, currentShelfKey } = this.props
        const move = {key:'move', title:'Move to...', disabled: true}
        
        return (
            //todo: maybe make a component to replace the option tags?
            <div className="book-shelf-changer">
                <select value={currentShelfKey}>
                   {[move, ...shelves, BOOKSHELF_NONE].map(shelf => (<option disabled={shelf.disabled} key={shelf.key} value={shelf.key}>{shelf.title}</option>))}
                </select>
            </div>
        );
    }
}

BookShelfChanger.propTypes = {
    shelves: PropTypes.array.isRequired,
    currentShelfKey: PropTypes.string.isRequired
}

export default BookShelfChanger;