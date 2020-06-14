// A Wrapper for the <FormControl>, <InputLabel>, <Error> and the Stripe <*Element>.
// Similar to Material UI's <TextField>. Handles focused, empty and error state
// to correctly show the floating label and error messages etc.

import React, { makeStyles, useState } from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import { Input, InputLabel } from '@material-ui/core';

import StripeInputF from './StripeInputF';
import Error from './Error';
import StripeElementWrapper from './xStripeElementWrapper';

const StripeElementWrapperF = props => {
  const { component, label } = props;

  const [focused, setFocused] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState(false);

  const handleBlur = () => {
    setFocused(false);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleChange = changeObj => {
    setError(changeObj.error);
    setEmpty(changeObj.empty);
  };

  return (
    <div>
      <FormControl fullWidth margin='normal'>
        <InputLabel
          focused={focused}
          shrink={focused || !empty}
          error={!!error}
        >
          {label}
        </InputLabel>
        <Input
          fullWidth
          inputComponent={StripeInputF}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          inputProps={{ component }}
          // margin={{marginTop:'25px'}}
        />
      </FormControl>
      <Error />
    </div>
  );
};

StripeElementWrapper.propTypes = {
  component: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

StripeElementWrapper.displayName = 'StripeElementWrapper';

export default StripeElementWrapperF;
