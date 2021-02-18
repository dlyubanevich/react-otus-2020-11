
export default class LibraryService {

    async getAllBooks(){
        const res = await this._getData(`/api/book`);
        return res.map(this._transformBook);
    }

    async deleteBook(bookId){
        return await this._deleteData(`/api/book?bookId=${bookId}`);
    }

    async addBook(book){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        };
        const newBook = await this._handleData(`/api/book`, requestOptions);
        return this._transformBook(newBook);
    }

    async getComments(bookId){
        const res = await this._getData(`/api/comments?bookId=${bookId}`);
        return res.map(this._transformComment);
    }

    async addComment(comment){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)
        };
        const newComment = await this._handleData(`/api/comments`, requestOptions);
        return this._transformComment(newComment);
    }

    async _getData(url) {
        const res = await fetch(url);
        if (!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    async _handleData(url, requestOptions) {
        const res = await fetch(url, requestOptions);
        if (!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    async _deleteData(url) {
        const res = await fetch(url, {method: 'DELETE'});
        return res.ok;
    }

    _transformBook(book){
        return {
            id: book.id,
            name: book.name,
            authors: book.authors,
            genres: book.genres
        };
    }

    _transformComment(comment){
        return {
            id: comment.id,
            bookId: comment.bookId,
            text: comment.text
        };
    }
}