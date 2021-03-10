import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Grid,
    Typography,
    IconButton,
    Container,
    CardMedia,
    Divider,
    Box
} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddCommentIcon from '@material-ui/icons/AddComment';
import CommentIcon from '@material-ui/icons/Comment';
import {makeStyles} from '@material-ui/core/styles';
import imageBook from './book.jpg';
import CommentAddForm from "../comment-add-form";

const useStyles = makeStyles(() => ({
    container:{
        maxWidth: '32%',
        margin: '5px'
    },
    cardMedia: {
        padding: '37%',

    },
    actions:{
        justifyContent: 'space-between'
    },
}));

export default function BookListItem (props){

    const [openDialog, setValue] = React.useState(false);

    const classes = useStyles();
    const {id, name, authors} = props.book;
    const {onDeleteBook, showComments, addComment} = props;

    const showAddCommentDialog = () => {
        setValue(true);
    }
    const hideAddCommentDialog = () => {
        setValue(false);
    }
    const handleAddComment = (bookId, text) => {
        addComment(bookId, text);
        hideAddCommentDialog();
    }

    return (
        <Container className={classes.container}>
            <Grid item>
                <Card>
                    <CardContent>
                        <CardMedia
                            className={classes.cardMedia}
                            image={imageBook}
                        />
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Typography>
                            {authors}
                        </Typography>
                    </CardContent>
                    <Divider/>
                    <CardActions className={classes.actions}>
                        <IconButton size="small" color="secondary" onClick={() => onDeleteBook(id)}>
                            <DeleteForeverIcon/>
                        </IconButton>
                        <IconButton size="small" color="default" onClick={() => showComments(id)}>
                            <CommentIcon/>
                        </IconButton>
                        <IconButton size="small" color="primary" onClick={showAddCommentDialog}>
                            <AddCommentIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
            <Box>
                <CommentAddForm
                    open={openDialog}
                    bookId={id}
                    addComment={handleAddComment}
                    onCancel={hideAddCommentDialog}/>
            </Box>
        </Container>
    );
}