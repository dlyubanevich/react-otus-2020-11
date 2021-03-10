import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BookAddForm from "../book-add-form";
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

export default function AppHeader (props){

    const classes = useStyles();

    const [openDialog, setValue] = React.useState(false);
    const {onAddBook} = props;

    const hideAddBookDialog = () => {
        setValue(false);
    }
    const showAddBookDialog = () => {
        setValue(true);
    }

    return (
        <div className={classes.root}>
            <AppBar position="relative">
                <Toolbar>
                    <Typography className={classes.title} variant="h4" color="inherit">
                        My library
                    </Typography>
                    <Button variant={"outlined"} color="inherit" onClick={showAddBookDialog}>
                        Add book
                    </Button>
                </Toolbar>
            </AppBar>
            <BookAddForm
                show={openDialog}
                onClose={hideAddBookDialog}
                onAddBook={onAddBook}
            />
        </div>
    )
}
