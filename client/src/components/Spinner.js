import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: '40%',
    left: '50%',
    zIndex: 5550,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  }
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size={150} />
    </div>
  );
}
