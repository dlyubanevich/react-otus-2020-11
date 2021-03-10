import React from "react";
import {useHistory} from 'react-router-dom';
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Container,
    TextField, Paper
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import LibraryService from "../../services/libraryService";

const libraryService = new LibraryService();

const fields = [
    {label: 'Username', id: 'login', autoFocus: true, type: 'text'},
    {label: 'Password', id: 'password', autoFocus: false, type: 'password'}
];

const useStyles = makeStyles(() => ({
    container:{
        maxWidth: '24%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10%'
    },
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    actions:{
        justifyContent: 'center'
    },
    paper: {
        padding: '10%',
        backgroundColor: '#FAEBD7'
    },

}));

export default function LoginPage(){

    const [data, setData] = React.useState({
        login: '',
        password: ''
    });
   const [unauthorized, setUnauthorized] = React.useState(false);

    const history = useHistory();

    const onTextChange = ({target}) =>{
        setData({...data, [target.id]:target.value});
    }

    const onLogin = () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        libraryService.authorize(requestOptions)
            .then(status => {
                if (status === 200){
                    history.push('/home');
                }else{
                    setUnauthorized(true);
                }
            });
    }

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                <Card>
                    <CardContent>
                        <Typography variant={"h5"}>Login to library</Typography>
                        {fields.map((field) => (
                            <TextField
                                key={field.id}
                                autoFocus={field.autoFocus}
                                label={field.label}
                                required
                                id={field.id}
                                type={field.type}
                                fullWidth
                                error={unauthorized}
                                onChange={onTextChange}
                            />
                        ))}
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button className={classes.button} onClick={() => onLogin()}>
                            GET STARTED
                        </Button>
                    </CardActions>
                </Card>
            </Paper>
        </Container>
    );
}
