"use client";
import { Box } from "@mui/material";
import styles from './camera.module.css';
import Navbar from "../app/components/navbar/navbar";
import CameraPage from "../app/components/cameraPage/contentCamera";
import Footer from '../app/components/footer/footer';

export default function Home() {
    return (
      <Box className={styles.page}>
        <Navbar />
        <CameraPage />
        <Footer />
      </Box>
    );
  }