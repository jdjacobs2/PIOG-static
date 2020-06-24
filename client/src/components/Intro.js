import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Typography,
  Box,
  createMuiTheme,
  ThemeProvider,
  Grid,
  Paper,
  Button
} from '@material-ui/core';
import clsx from 'clsx';
import houseFire from '../assets/house-fire-dawid-labno-Wd-wYJ9PFy8-unsplash.jpg';
import molotov from '../assets/molotov_cocktail.jpg';
import lampWChild from '../assets/child_with_light-e1475612856320.jpg';

const theme = createMuiTheme({
  typography: {
    body1: {
      fontSize: '1.3rem',
      fontWeight: 400
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    // transition: 'tranform 5s',
    width: '600px',
    height: '120px',
    position: 'relative',
    dipslay: 'absolute',
    fontSize: '5rem',
    color: 'yellow'
    // '&:hover': {
    // transform: 'rotate(45deg)'

    // }
  },

  ani: {
    display: 'block',
    position: 'fixed',
    animation: '$slideInTopLeft 5s forwards .5s 1'
  },

  '@keyframes slideInTopLeft': {
    '0%': {
      top: '10vh',
      left: '0vw'
    },
    '100%': {
      top: '75vh',
      left: '50vw'
    }
  }
}));

function Intro() {
  const classes = useStyles();

  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true));
  console.log(classes.root);
  const totalClasses = clsx(classes.root, loaded && classes.ani);
  console.log(`totalClasses: ${totalClasses};`);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box mx={28} mt={17} mb={10}>
          <Grid container>
            <Grid item sm={6} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='body1'>
                A glass bottle half filled with diesel and some cotton stuffed
                in the top as a wick, then lit, is what rural children here use
                as a lamp while trying to study in the toxic fumes.
              </Typography>
            </Grid>
            <Grid
              item
              sm={6}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Paper elevation={3}>
                <img src={molotov} height='200px' alt='molotov cocktail' />
              </Paper>
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              item
              sm={6}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Paper elevation={5}>
                <img src={houseFire} width='200px' height='250px' alt='' />
              </Paper>
            </Grid>
            <Grid item sm={6} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='body1'>
                One stumble against a wobbly table and there is flaming fuel
                pouring over a child’s clothes. Severe burns are a common injury
                for children in Guatemala most of whom live hours from a
                hospital.
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={6} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='body1'>
                There is a simple, quick fix for this problem, A SOLAR LANTERN.
                £15, $18, Q130 is all it takes to make a family safe from this
                hazard. Click the ‘donate button’ now to make this happen.
              </Typography>
            </Grid>
            <Grid
              item
              sm={6}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Paper elevation={3}>
                <img src={lampWChild} height='200px' alt='molotov cocktail' />
              </Paper>
            </Grid>
          </Grid>
          <Box mt={4}>
            <Typography variant='body1' mt={2} gutterBottom id='bottom'>
              Apart from the solar lanterns and panel systems everything else
              that you see on this web site, from the washing machine to the
              scholarships, from the training to the medical help, ALL are the
              result of your help. Please join our face book group (Pass It On
              Rio Dulce) and follow along with us week by week and come and
              visit if you can. You’ll find our door open and we will take you
              to see the smiles and feel the hugs of gratitude for yourself. We
              welcome visitors with open arms.
            </Typography>
          </Box>
          <Grid
            container
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Grid item sm={4}>
              <Typography variant='subtitle1'>
                Pass It On Guatemala
                <br />
                Employer ID # 81-3454988
                <br />
                1616 MCGEE ROAD LAVOINA, GA 30553-0000
              </Typography>
            </Grid>
          </Grid>
          <Button
            size='large'
            // className={classes.sizeLarge && classes.textSizeLarge}
            className={totalClasses}
            variant='contained'
            color='primary'
          >
            DONATE
          </Button>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default Intro;
