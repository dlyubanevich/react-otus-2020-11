import React, {useState, useEffect} from "react";
import AppHeader from "../app-header";
import BookGenresTabs from "../book-genres-tab";
import LibraryService from "../../services/libraryService";

const libraryService = new LibraryService();

export default function HomePage(){

    const [books, setBooks] = useState([]);

    useEffect(() => {
        libraryService.getAllBooks()
            .then(books => setBooks(books));
    }, []);

    const onAddBook = (book) => {
        libraryService.addBook(book)
            .then((newBook) => {
                setBooks([...books, newBook]);
            });
    }

    const onDeleteBook = (id) => {
        const ok = libraryService.deleteBook(id);
        if (!ok){
            throw new Error(`Could not delete the book by id:${id}`);
        }
        const index = books.findIndex(elem => elem.id === id);
        const before = books.slice(0, index);
        const after = books.slice(index + 1);
        setBooks([...before, ...after]);
    }

    return (
        <div>
            <AppHeader
                onAddBook={onAddBook}/>
            <BookGenresTabs
                books={books}
                onDeleteBook={onDeleteBook}/>
        </div>
    );
}