import { Box, Typography } from '@mui/material';
import React from 'react';

const styles = {
  main: {
    display: 'flex',
    width: '50%',
    justifyContent: 'space-between',
    mt: 2,
  },
  words: {
    bgcolor: '#9bd0cb',
    color: '#006D77',
    margin: '5px 0',
    padding: '10px',
    width: '100%',
    cursor: 'pointer',
    transition: '150ms',
    textAlign: 'center',
    borderRadius: '5px',
    "&:hover": {
      bgcolor: '#93c7c2',
    }
  },
  wordsContainer: {
    width: '42%',
  }
}

const data = ['lorem some', 'words', 'have to', 'get'];
const dataSecond = ['thing', 'are so strong', 'dooo', 'a girl'];

const ContinueSentence = ({taskBox}) => {
  return (
    <>
      <Box sx={taskBox}>
        <Typography variant="h6" color="secondary">Упражнение № 4</Typography>
        <Box sx={styles.main}>
          <Box sx={styles.wordsContainer}>
            {
              data.map((item) => (
                <Typography sx={styles.words}>{item}</Typography>
              ))
            }
          </Box>
          <Box sx={styles.wordsContainer}>
            {
              dataSecond.map((item) => (
                <Typography sx={styles.words}>{item}</Typography>
              ))
            }
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ContinueSentence;