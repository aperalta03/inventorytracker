import { Box, Typography } from '@mui/material';
import styles from './footer.module.css';

export default function Footer() {
    return (
        <Box className={styles.page}>
            <Typography className={styles.watermark}> &copy; {new Date().getFullYear()} Alonso Peralta. All rights reserved. </Typography>
        </Box>
    );
}