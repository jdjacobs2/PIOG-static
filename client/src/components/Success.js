import React from 'react';

import 'fontsource-roboto/latin-ext.css';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '600px',
    fontFamily: 'Roboto',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
  }
}));

function Success() {
  const classes = useStyles();
  return (
    <div>
      <h1 className={classes.root}>SUCCESS</h1>
    </div>
  );
}

export default Success;
