import React from 'react';
import {
  makeStyles,
  Typography,
  Box,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    body1: {
      fontSize: '1.3rem',
      fontWeight: 400
    }
  }
});

function Intro() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box m={28}>
          <Typography variant='body1' gutterBottom>
            A glass bottle half filled with diesel and some cotton stuffed in
            the top as a wick, then lit, is what rural children here use as a
            lamp while trying to study in the toxic fumes. One stumble against a
            wobbly table and there is flaming fuel pouring over a child’s
            clothes. Severe burns are a common injury for children in Guatemala
            most of whom live hours from a hospital.
          </Typography>
          <Typography variant='body1' gutterBottom >
            There is a simple, quick fix for this problem, A SOLAR LANTERN. £15,
            $18, Q130 is all it takes to make a family safe from this hazard.
            Click the ‘donate button’ now to make this happen.
          </Typography>
          <Typography variant='body1' gutterBottom>
            A glass bottle half filled with diesel and some cotton stuffed in
            the top as a wick, then lit, is what rural children here use as a
            lamp while trying to study in the toxic fumes. One stumble against a
            wobbly table and there is flaming fuel pouring over a child’s
            clothes. Severe burns are a common injury for children in Guatemala
            most of whom live hours from a hospital.
          </Typography>
          <Typography variant='body1' gutterBottom>
            There is a simple, quick fix for this problem, A SOLAR LANTERN. £15,
            $18, Q130 is all it takes to make a family safe from this hazard.
            Click the ‘donate button’ now to make this happen.
          </Typography>
          <Typography variant='body1' gutterBottom>
            Apart from the solar panel systems everything else that you see on
            this web site, from the washing machine to the scholarships, from
            the training to the medical help, ALL are the result of your help.
            Please join our face book group (Pass It On Rio Dulce) and follow
            along with us week by week and come and visit if you can. You’ll
            find our door open and we will take you to see the smiles and feel
            the hugs of gratitude for yourself. We welcome visitors with open
            arms.
          </Typography>
        </Box>
      </ThemeProvider>


HELP us reach our goal: 500 Lanterns

Pass It On Guatemala
Employer ID # 81-3454988
1616 MCGEE ROAD
LAVOINA, GA 30553-0000


    </div>


    
    
    
    
  );
}

export default Intro;
