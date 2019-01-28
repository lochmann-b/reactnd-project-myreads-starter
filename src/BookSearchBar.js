import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class BookSearchBar extends Component {
    render() {
        return (
            <div className="search-books-bar">
                <Link class="close-search" to="/">
                    <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
                </Link>

                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" />
                </div>
            </div>
        );
    }
}

BookSearchBar.propTypes = {

}

export default BookSearchBar