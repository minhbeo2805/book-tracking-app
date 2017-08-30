import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import {Link} from "react-router-dom";
import Book from "./Book";
import PropTypes from "prop-types";

class Search extends React.Component {
    state = {
        searchResult: []
    }

    handleSearch(event) {
        BooksAPI.search(event.target.value).then(books => {
            const searchResult = [];
            if (Array.isArray(books)) {
                books.forEach((book) => {
                    const isCurrentlyReading = this.props.currentlyReading.find((e) => e.id === book.id)
                    const isWantToRead = this.props.wantToRead.find((e) => e.id === book.id)
                    const isRead = this.props.read.find((e) => e.id === book.id)

                    if (isCurrentlyReading) {
                        book.shelf = 'currentlyReading';
                    } else if (isWantToRead) {
                        book.shelf = 'wantToRead';
                    } else if (isRead) {
                        book.shelf = 'read';
                    } else {
                        book.shelf = 'none';
                    }
                    searchResult.push(book);
                })
            }

            this.setState({
                searchResult
            })
        })
    }

    changeShelf(updateBook, shelf) {
        this.props.changeShelf(updateBook, shelf);
        this.setState((prev) => {
            const newState = prev;

            const updateIndex = newState.searchResult.findIndex((book) => {
                    return book.id === updateBook.id
                }
            )
            newState.searchResult[updateIndex].shelf = shelf;
            return newState
        })
    }

    render() {
        return (
            <div className="app">
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to='/'
                        >Close
                        </Link>
                        <div className="search-books-input-wrapper">
                            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                            <input type="text" onChange={this.handleSearch.bind(this)}
                                   placeholder="Search by title or author"/>

                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {this.state.searchResult.map((book) =>
                                (
                                    <Book key={book.id} book={book} changeShelf={this.changeShelf.bind(this)}/>
                                )
                            )}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}


Search.propTypes = {
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
}

export default Search
