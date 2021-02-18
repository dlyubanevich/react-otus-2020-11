import React from 'react';
import AppHeader from '../app-header';
import BookGenresTabs from "../book-genres-tab";
import LibraryService from "../../services/libraryService";

const libraryService = new LibraryService();

export default class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            books:[]
        };
        this.onDeleteBook = this.onDeleteBook.bind(this);
        this.onAddBook = this.onAddBook.bind(this);
    }

    componentDidMount() {
        libraryService.getAllBooks()
            .then(books => this.setState({books}));
    }

    onAddBook(book){
        libraryService.addBook(book)
            .then((newBook) => {
                const books = [...this.state.books, newBook];
                this.setState({books:books});
            });
    }

    onDeleteBook(id){
        const ok = libraryService.deleteBook(id);
        if (!ok){
            throw new Error(`Could not delete the book by id:${id}`);
        }
        this.setState(({books}) => {
            const index = books.findIndex(elem => elem.id === id);
            const before = books.slice(0, index);
            const after = books.slice(index+1);
            const newArray = [...before, ...after];
            return {books:newArray};
        });
    }

    render(){
        return (
            <div>
                <AppHeader
                    onAddBook={this.onAddBook}/>
               <BookGenresTabs
                    books={this.state.books}
                    onDeleteBook={this.onDeleteBook}/>
            </div>
        );
    }

}