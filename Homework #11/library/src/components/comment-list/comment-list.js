import {Container, Typography} from "@material-ui/core";
import React from "react";
import CommentListItem from "../comment-list-item";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    header:{
        width: 'auto',
        marginBottom: '20px',
        textAlign: 'center'
    },
    container:{
        maxWidth: '950px',
        padding: '20px',
    },
    item:{
        margin: '20px'
    }
}));

export default function CommentList (props){

    const classes = useStyles();
    const {comments} = props;

    if (comments == null || comments.length === 0){
        return null;
    }

    return(
        <Container className={classes.container}>
            <Typography className={classes.header} variant="h6" >
                Comments:
            </Typography>
            {comments.map((comment, i) => (
                <CommentListItem
                    key={i}
                    text={comment.text}>
                </CommentListItem>
            ))}
        </Container>
    );

}