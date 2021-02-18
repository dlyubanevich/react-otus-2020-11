import React from 'react';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box} from '@material-ui/core';

export default function CommentAddForm(props) {

    const [text, setText] = React.useState(null);
    const {open, bookId, addComment, onCancel} = props;

    const onTextChange = ({target}) => {
        setText(target.value);
    }

    return (
        <Box>
            <Dialog open={open} onClose={() => onCancel}
                    aria-labelledby="form-dialog-title"
                    fullWidth>
                <DialogTitle id="form-dialog-title">New comment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Comment"
                        type="text"
                        fullWidth
                        onChange={onTextChange}
                        onSubmit={() => addComment(bookId, text)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" variant={"outlined"} onClick={() => onCancel()}>
                        Cancel
                    </Button>
                    <Button color="primary" variant={"contained"} onClick={() => addComment(bookId, text)}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );

}

