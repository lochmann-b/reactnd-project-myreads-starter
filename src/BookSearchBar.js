import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'

class BookSearchBar extends Component {

    render() {
        const { searchTerm = '', onSearchTermChanged } = this.props
        return (
            <div className="search-books-bar">
                <Link className="close-search" to="/">
                    <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
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
                {this.props.searching && <div className="searching">Searching...</div>}
            </div>
        )
    }
}

BookSearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchTermChanged: PropTypes.func.isRequired,
    searching: PropTypes.bool //optional
}

export default BookSearchBar