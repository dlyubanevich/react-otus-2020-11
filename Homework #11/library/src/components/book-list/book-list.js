import React from 'react';
import BookListItem from "../book-list-item";
import {Container, Grid, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    paper: {
        height: 'auto',
        padding: '3%',
        backgroundColor: '#FAEBD7'
    }
}));

export default function BookList(props) {

    const classes = useStyles();
    const {books, onDeleteBook, showComments, addComment} = props;

    return (
        <Container>
            <Paper className={classes.paper}>
                <Grid container>
                    {books.map((book) => (
                        <BookListItem
                            key={book.id}
                            book={book}
                            showComments={showComments}
                            onDeleteBook={onDeleteBook}
                            addComment={addComment}/>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
}
