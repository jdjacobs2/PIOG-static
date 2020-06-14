// Wrapper around the actual Stripe <*Element>, so that it can be used as `inputComponent`
// for Material UI's <Input>. Also adds some styling.

import React, { Component, setState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';
import { makeStyles } from '@material-ui/core';
import StripeElementWrapper from './StripeElementWrapperF';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '6px 0 7px',
    cursor: 'text',
    marginTop: '25px'
  },
  base: {
    fontSize: `${theme.typography.fontSize}px`,
    fontFamily: theme.typography.fontFamily,
    color: '#000000de'
  }
}));

// @withStyles(styles, { withTheme: true })
const StripeInputF = props => {
  const classes = useStyles();

  const {
    classes: c,
    theme,
    component: Component,
    onFocus,
    onBlur,
    onChange
  } = props;

  return (
    <Component
      className={classes.root}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      placeholder=''
      style={ classes.base }
        // base: {
        //   fontSize: `${theme.typography.fontSize}px`,
        //   fontFamily: theme.typography.fontFamily,
        //   color: '#000000de'
        // }
      // }}
    />
  );
};

StripeInputF.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func
};

StripeInputF.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {}
};

StripeInputF.displayName = 'StripeInput';

export default StripeInputF;
