import React, { useState, useRef } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Camera } from 'react-camera-pro';
import axios from 'axios';
import styles from './cameracomp.module.css';

const CameraComponent = ({ addImage, setClassifiedImage }) => {
  const camera = useRef(null);

  const handleTakePhoto = async () => {
    const newImage = camera.current.takePhoto();
    addImage(newImage);

    // Convert image to base64 string
    const base64Image = newImage.split(',')[1];

    try {
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${process.env.NEXT_PUBLIC_GOOGLE_VISION_API_KEY}`,
        {
          requests: [
            {
              image: {
                content: base64Image
              },
              features: [
                {
                  type: 'LABEL_DETECTION',
                  maxResults: 1
                }
              ]
            }
          ]
        }
      );

      const label = response.data.responses[0].labelAnnotations[0].description;
      setClassifiedImage({ image: newImage, label });
    } catch (error) {
      console.error('Error classifying the image:', error);
    }
  };

  return (
    <Paper className={styles.container} elevation={1}>
      <Typography className={styles.title}>Camera</Typography>
      <Box className={styles.camera}>
        <Camera ref={camera} aspectRatio={4 / 3} />
      </Box>
      <Button 
        variant="contained"
        className={styles.button}
        onClick={handleTakePhoto}
      >
        Take Photo
      </Button>
    </Paper>
  );
};

export default CameraComponent;
