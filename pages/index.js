// pages/index.js
"use client";
import { Box } from "@mui/material";
import styles from './index.module.css';
import LoginPage from "../app/components/loginPage/contentLogin";
import Footer from '../app/components/footer/footer';

export default function Index() {
  return (
    <Box className={styles.page}>
      <LoginPage />
      <Footer />
    </Box>
  );
}
