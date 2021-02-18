import React from 'react';
import {Typography, Paper, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    item:{
        margin: '10px',
        padding: '20px',
        backgroundColor: '#FAEBD7',
    }
}));

export default function CommentListItem (props){

    const {text} = props;
    const classes = useStyles();

    return (
        <Paper elevation={1} className={classes.item}>
            <Box>
                <Typography>
                    {text}
                </Typography>
            </Box>
        </Paper>
    );

}