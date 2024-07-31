"use client";
import { Box } from "@mui/material";
import styles from './index.module.css';
import Navbar from "../app/components/navbar/navbar";
import DataPage from "../app/components/dataPage/contentData";
import Footer from '../app/components/footer/footer';

export default function Data() {
  return (
    <Box className={styles.page}>
      <Navbar />
      <DataPage />
      <Footer />
    </Box>
  );
}
