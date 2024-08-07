"use client";
import { Box } from "@mui/material";
import styles from './stats.module.css';
import Navbar from "../app/components/navbar/navbar";
import StatsPage from "../app/components/statsPage/contentStats";
import Footer from '../app/components/footer/footer';

export default function Stats() {
  return (
    <Box className={styles.page}>
      <Navbar />
      <StatsPage />
      <Footer />
    </Box>
  );
}
