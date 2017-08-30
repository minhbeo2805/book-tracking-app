import React from 'react'
import './App.css'
import PropTypes from 'prop-types';

class Book extends React.Component {

    book = this.props.book;

    changeShelf(event) {
        if (event.target.value !== 'none') {
            this.props.changeShelf(this.book, event.target.value);
        }
    }

    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        {this.book.imageLinks ? (<div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: 'url(' + this.book.imageLinks.smallThumbnail + ')'
                        }}></div>) : ('')}

                        <div className="book-shelf-changer">
                            <select value={this.props.book.shelf} onChange={this.changeShelf.bind(this)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    {this.book.title ? (<div className="book-title">{this.book.title}</div>) : ('')}
                    {this.book.authors ? this.book.authors.map((author) => (
                        <div key={author} className="book-authors">{author}</div>)) : ('')}

                </div>
            </li>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
}

export default Book
