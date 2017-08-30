import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types';
import Book from './Book';

class BooksShelf extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
    }

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.props.bookList.map((book)=>
                            (
                                <Book key={book.id} book={book} changeShelf={this.props.changeShelf}/>
                            )
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

BooksShelf.propTypes = {
    title: PropTypes.string.isRequired,
    bookList: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
}


export default BooksShelf
