// app/components/loginPage/contentLogin.js
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import { auth, provider, signInWithPopup } from '../../../firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import styles from './contentLogin.module.css';

const LoginPage = () => {
  const router = useRouter();
  const firestore = getFirestore();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create or update user document in Firestore
      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      }, { merge: true });

      // Redirect to data page after login
      router.push('/data');
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  return (
    <Box className={styles.page}>
      <Typography className={styles.title}> Inventory Tracker </Typography>
      <Button className={styles.button} variant="contained" onClick={handleLogin}>
        Login with Google
      </Button>
      <Box className={styles.blurOne}></Box>
      <Box className={styles.blurTwo}></Box>
    </Box>
  );
};

export default LoginPage;
