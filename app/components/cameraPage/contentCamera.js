import React, { useState } from 'react';
import { Box } from '@mui/material';
import styles from './contentCamera.module.css';
import CameraComponent from "./camera/cameracomp";
import ClassifiedImage from "./classification/classification";
import CameraRoll from "./roll/roll";

const CameraPage = () => {
    const [images, setImages] = useState([]);
    const [classifiedImage, setClassifiedImage] = useState(null);

    const addImage = (newImage) => {
        setImages(prevImages => {
            const updatedImages = [...prevImages, newImage];
            if (updatedImages.length > 30) {
                updatedImages.shift(); // Remove the oldest image if limit is exceeded
            }
            return updatedImages;
        });
    };

    const clearClassifiedImage = () => {
        setClassifiedImage(null);
    };

    return (
        <Box className={styles.page}>
            <Box className={styles.column}>
                <CameraComponent addImage={addImage} setClassifiedImage={setClassifiedImage} />
                <ClassifiedImage 
                    image={classifiedImage?.image} 
                    label={classifiedImage?.label} 
                    clearClassifiedImage={clearClassifiedImage}
                />
            </Box>
            <Box className={styles.column}>
                <CameraRoll images={images} />
            </Box>
        </Box>
    );
};

export default CameraPage;
