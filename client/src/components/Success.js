import React from 'react';
import 'fontsource-roboto/latin-ext.css';
import {
  makeStyles,
  Typography,
  Paper,
  Dialog,
  DialogContentText,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: '20vh',
    left: '3vw',
    zIndex: 100,
    height: '300px',
    width: '400px',
    fontFamily: 'Roboto',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  }
}));

function Success(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Dialog open={props.open} PaperProps={{ elevation: 3 }} >
          <Paper elevation={4}>
            <Typography align='center' variant='h1'>
              Success
            </Typography>
            <Typography align='center' variant='body1'>
              Congratulation on your donation to <br />
              Pass It On Guatemala
            </Typography>
          </Paper>
      </Dialog>
    </div>
  );
}

export default Success;
