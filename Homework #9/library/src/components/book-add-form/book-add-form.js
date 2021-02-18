import React from 'react';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

const fields = [
        {label: 'Name', id: 'name', autoFocus: true},
        {label: 'Author first name', id: 'authorFirstName', autoFocus: false},
        {label: 'Author last name', id: 'authorLastName', autoFocus: false},
        {label: 'Genre', id: 'genre', autoFocus: false}
    ];

export default function BookAddForm(props) {

    const [data, setData] = React.useState({
        name: '',
        authorFirstName: '',
        authorLastName: '',
        genre: ''
    });
    const {show, onClose, onAddBook} = props;

    const onTextChange = ({target}) =>{
        setData({...data, [target.id]:target.value});
    }

    const handleAddBook = (onAddBook) => {

        const author = {
            firstName:data.authorFirstName,
            lastName:data.authorLastName
        }
        const genre ={
            name:data.genre
        }

        const authors = [author];
        const genres = [genre]
        const book = {
            name: data.name,
            authors: authors,
            genres: genres
        }

        onAddBook(book);
        onClose();
    }

    return (
        <Dialog open={show} aria-labelledby="form-dialog-title" onClose={() => onClose}>
            <DialogTitle>New book</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Book properties:
                </DialogContentText>
                {fields.map((field) => (
                    <TextField
                        key={field.id}
                        autoFocus={field.autoFocus}
                        label={field.label}
                        required
                        id={field.id}
                        type="text"
                        fullWidth
                        onChange={onTextChange}
                    />
                ))}
                <DialogActions>
                    <Button color="secondary" variant={"outlined"} onClick={() => onClose()}>
                        Cancel
                    </Button>
                    <Button color="primary" variant={"contained"} onClick={() => handleAddBook(onAddBook)}>
                        Add
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}