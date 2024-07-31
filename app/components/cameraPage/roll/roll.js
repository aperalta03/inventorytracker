import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from './roll.module.css';

const CameraRoll = ({ images }) => {
  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Typography className={styles.title}>Camera Roll</Typography>
      </Box>
      <Box className={styles.images}>
        {images && images.map((image, index) => (
          <Box key={index} component="img" src={image} alt={`Taken photo ${index}`} className={styles.image} />
        ))}
      </Box>
    </Box>
  );
};

export default CameraRoll;
