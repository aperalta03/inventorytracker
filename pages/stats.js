"use client";
import { Box } from "@mui/material";
import Navbar from "../app/components/navbar/navbar";
import StatsPage from "../app/components/statsPage/contentStats";
import styles from './stats.module.css';

export default function Stats() {
  return (
    <Box className={styles.page}>
      <Navbar />
      <StatsPage />
    </Box>
  );
}
