// A Wrapper for the <FormControl>, <InputLabel>, <Error> and the Stripe <*Element>.
// Similar to Material UI's <TextField>. Handles focused, empty and error state
// to correctly show the floating label and error messages etc.

import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import { Input, InputLabel, TextField } from '@material-ui/core';

import StripeInputF from './StripeInputF';
import Error from './Error';
import StripeElementWrapper from './StripeElementWrapperF';

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
      <TextField
        label={label}
        name='ccnumber'
        variant='outlined'
        required
        fullWidth
        InputLabelProps={{ shrink: true }}
        InputProps={{
          inputComponent: StripeInputF,
          inputProps: {
            component: { component }
          }
        }}
      />

      {/* <Error /> */}
    </div>
  );
};

// StripeElementWrapper.propTypes = {
//   component: PropTypes.func.isRequired,
//   label: PropTypes.string.isRequired
// };

StripeElementWrapperF.displayName = 'StripeElementWrapperF';

export default StripeElementWrapperF;

      {/* <FormControl fullWidth margin='normal'>
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
      </FormControl> */}