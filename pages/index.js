"use client";
import { Box } from "@mui/material";
import Navbar from "../app/components/navbar/navbar";
import DataPage from "../app/components/dataPage/contentData";
import styles from './index.module.css';

export default function Data() {
  return (
    <Box className={styles.page}>
      <Navbar />
      <DataPage />
    </Box>
  );
}
