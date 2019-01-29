import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'

const BookSearchBar = (props) => {
    const { searchTerm = '', onSearchTermChanged } = props
    return (
        <div className="search-books-bar">
            <Link className="close-search" to="/">
                <button className="close-search" >Close</button>
            </Link>
            <div className="search-books-input-wrapper">
                <DebounceInput
                    minLength={0}
                    debounceTimeout={300}
                    type="text"
                    value={searchTerm}
                    placeholder="Search by title or author"
                    onChange={(e) => onSearchTermChanged(e.target.value)}
                />
            </div>
            {props.searching && <div className="searching">Searching...</div>}
        </div>
    )
}

BookSearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchTermChanged: PropTypes.func.isRequired,
    searching: PropTypes.bool //optional
}

export default BookSearchBar