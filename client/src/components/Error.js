import React from 'react';
import { FormHelperText } from '@material-ui/core';

const Error = (error) => {
  return (error &&
    <FormHelperText error>
      {error.message}
    </FormHelperText>);
}

export default Error;