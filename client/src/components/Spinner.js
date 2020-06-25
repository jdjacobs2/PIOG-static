import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    // top: '50%',
    // left: '50%',
    // height: '100%',
    width: '100%',
    zIndex: 150,
    display: 'flex',
    marginLeft: theme.spacing(2),
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: '200px'
  }
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper>
        <CircularProgress size='3rem' />
        {/* <CircularProgress color='secondary' /> */}
      </Paper>
    </div>
  );
}
