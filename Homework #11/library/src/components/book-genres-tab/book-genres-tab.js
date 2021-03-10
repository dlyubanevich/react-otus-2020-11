import React from "react";
import BookData from '../book-data';
import {AppBar, Tabs, Tab, Box} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function currentTabProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        width: '100%'
    },
}));

function getAllGenres(books){
    const genres = [];
    for (let i = 0; i < books.length; i++) {
        books[i].genres.forEach((genre) => {
            if (!genres.includes(genre)){
                genres.push(genre);
            }
        });
    }
    return genres;
}

function booksByGenres(books, genres){
    const booksByGenre = [];
    genres.forEach((genre) => {
        const bookArray = [];
        books.forEach((book) => {
            if (book.genres.includes(genre)){
                bookArray.push(book);
            }
        });
        booksByGenre.push(bookArray)
    });
    return booksByGenre;
}

export default function BookGenresTab(props) {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const {books, onDeleteBook} = props;

    const genres = getAllGenres(books);
    const booksByGenre = booksByGenres(books, genres);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {genres.map((name, i) => (
                        <Tab key={i} label={name} {...currentTabProps(i)} />
                    ))}
                </Tabs>
            </AppBar>
            {genres.map((name, i) => (
                <TabPanel value={value} index={i} key={i}>
                    <BookData key={i}
                        books={booksByGenre[value]}
                        onDeleteBook={onDeleteBook}/>
                </TabPanel>
            ))}
        </Box>
    );
}
