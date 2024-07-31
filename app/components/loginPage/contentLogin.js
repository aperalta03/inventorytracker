// app/components/loginPage/contentLogin.js
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import { auth, provider, signInWithPopup } from '../../../firebase'; // Adjust the path if needed
import styles from './contentLogin.module.css';

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
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
