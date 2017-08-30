import React from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom";
import Search from "./Search";
import Dashboard from "./Dashboard";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        currentlyReading: [],
        wantToRead: [],
        read: [],
        none: []
    }

    componentDidMount() {
        this.getAllBook();
    }

    async changeShelf(book, shelf) {
        await BooksAPI.update(book, shelf);
        this.getAllBook()
    }

    getAllBook() {
        const newState = {
            currentlyReading: [],
            wantToRead: [],
            read: [],
        }
        BooksAPI.getAll().then((books) => {
            books.forEach((book) => {
                newState[book.shelf].push(book);
            })

            this.setState(newState)
        });
    }

    render() {
        return (
            <Routes>
                <Route path='/' element={<Dashboard currentlyReading={this.state.currentlyReading}
                                                    wantToRead={this.state.wantToRead} read={this.state.read}
                                                    changeShelf={this.changeShelf.bind(this)}/>}/>
                <Route path='/search' element={<Search currentlyReading={this.state.currentlyReading}
                                                       wantToRead={this.state.wantToRead} read={this.state.read}
                                                       changeShelf={this.changeShelf.bind(this)}/>}/>
            </Routes>

        )
    }
}

export default BooksApp
