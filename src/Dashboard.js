import React from 'react'
import './App.css'
import BookShelf from './BookShelf';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

class DashBoard extends React.Component {

    render() {
        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <BookShelf title={'Currently read'} bookList={this.props['currentlyReading']}
                                       changeShelf={this.props.changeShelf}/>
                            <BookShelf title={'Want to Read'} bookList={this.props['wantToRead']}
                                       changeShelf={this.props.changeShelf}/>
                            <BookShelf title={'Read'} bookList={this.props['read']}
                                       changeShelf={this.props.changeShelf}/>
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to='/search'>Add a book</Link>
                    </div>
                </div>
            </div>
        )
    }
}

DashBoard.propTypes = {
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
}

export default DashBoard
