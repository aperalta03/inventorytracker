import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { firestore, auth } from '../../../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import styles from './classification.module.css';

const ClassifiedImage = ({ image, label, clearClassifiedImage }) => {
  const handleAccept = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }
      const userId = user.uid;

      const itemRef = doc(firestore, `users/${userId}/inventory`, label.toLowerCase());
      const itemSnap = await getDoc(itemRef);

      if (itemSnap.exists()) {
        const currentData = itemSnap.data();
        await setDoc(itemRef, {
          name: label,
          count: currentData.count + 1,
          expirationDate: 3,
          category: 'Uncategorized',
          calories: 0,
        });
      } else {
        await setDoc(itemRef, {
          name: label,
          count: 1,
          expirationDate: 3,
          category: 'Uncategorized',
          calories: 0,
        });
      }
      clearClassifiedImage();
    } catch (error) {
      console.error('Error adding item to inventory:', error);
    }
  };

  const handleDeny = () => {
    clearClassifiedImage();
  };

  return (
    <Box className={styles.classificationContainer}>
      <Typography className={styles.title}>Classification</Typography>
      {image && (
        <>
          <Box component="img" src={image} alt="Classified photo" className={styles.image} />
          <Typography className={styles.label}>
            {label}?
          </Typography>
          <Box className={styles.buttonContainer}>
            <Button variant="contained" color="success" className={styles.button} onClick={handleAccept}>Accept</Button>
            <Button variant="contained" color="error" className={styles.button} onClick={handleDeny}>Deny</Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ClassifiedImage;
