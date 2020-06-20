// from https://www.gitmemory.com/issue/mui-org/material-ui/16037/508840004


// Wrapper around the actual Stripe <*Element>, so that it can be used as `inputComponent`
// for Material UI's <Input>. Also adds some styling.

import React, {forwardRef, useRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, responsiveFontSizes, useTheme } from '@material-ui/core';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     padding: '6px 0 7px',
//     cursor: 'text',
//     marginTop: '25px'
//   },
//   base: {
//     fontSize: `${theme.typography.fontSize}px`,
//     fontFamily: theme.typography.fontFamily,
//     color: '#000000de'
//   }
// }));

const StripeInputF = (
     { component: Component, inputRef, ...props }
) => {
     const elementRef = useRef();
     useImperativeHandle(inputRef, () => ({
          focus: () => elementRef.current.focus
     }));
     return (
          <Component
               onReady={element => (elementRef.current = element)}     
               {...props}
          />
     )
}

// const StripeInputF(props) => {
//   const classes = useStyles();
//   const {
//     component: Component,
//     inputRef,
//     id,
//     className,
//     disabled,
//     onFocus,
//     onBlur,
//     onChange,
//     placeholder,
//     value
//   } = props;

//   const theme = useTheme();
//   const [mountNode, setMountNode] = React.useState(null);

//   React.useImperativeHandle(
//     inputRef,
//     () => ({
//       focus: () => mountNode.focus()
//     }),
//     [mountNode]
//   );
  
//   return (
//     <Component
//       onReady={setMountNode}
//       className={classes.root}
//       ref={ref}
//       onFocus={onFocus}
//       onBlur={onBlur}
//       onChange={onChange}
//       placeholder=''
//       style={{
//         base: {
//           color: theme.palette.text.primary,
//           fontSize: `${theme.typography.fontSize}px`,
//           fontFamily: theme.typography.fontFamily,
//           "::placeholder": {
//             color: fade(theme.palette.text.primary, 0.42)
//           }
//         },
//         invalid: {
//           color: theme.palette.text.primary
//         }
//       }}
//     />
//   );
// };

// StripeInputF.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
//   component: PropTypes.func.isRequired,
//   onBlur: PropTypes.func,
//   onFocus: PropTypes.func,
//   onChange: PropTypes.func
// };

// StripeInputF.defaultProps = {
//   onFocus: () => {},
//   onBlur: () => {},
//   onChange: () => {}
// };

StripeInputF.displayName = 'StripeInputF';

export default StripeInputF;
