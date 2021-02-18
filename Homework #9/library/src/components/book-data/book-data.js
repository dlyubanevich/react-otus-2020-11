import React from 'react';
import BookList from "../book-list";
import {Grid} from "@material-ui/core";
import CommentList from "../comment-list";
import LibraryService from "../../services/libraryService";

const libraryService = new LibraryService();

export default function BookData(props){

    const [comments, setComments] = React.useState([]);
    const {books, onDeleteBook} = props;

    const showComments = (bookId) => {
        libraryService.getComments(bookId)
            .then((comments) =>{
                setComments(comments)
            });
    }

    const addComment = (bookId, text) =>{
        const comment = {
            bookId:bookId,
            text:text
        };
        libraryService.addComment(comment)
            .then((newComment) => {
                const newComments = [...comments, newComment];
                setComments(newComments);
            });
    }

    return (
        <Grid>
            <BookList
                books={books}
                onDeleteBook={onDeleteBook}
                showComments={showComments}
                addComment={addComment}/>
            <CommentList
                comments={comments}
            />
        </Grid>
    );

}