"use client";
import { Box } from "@mui/material";
import Navbar from "../app/components/navbar/navbar";
import CameraPage from "../app/components/cameraPage/contentCamera";
import styles from './camera.module.css';

export default function Home() {
    return (
      <Box className={styles.page}>
        <Navbar />
        <CameraPage />
      </Box>
    );
  }