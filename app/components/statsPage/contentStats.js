// contentStats.js
import React from 'react';
import { Box, Typography } from "@mui/material";
import styles from './contentStats.module.css';
import PieChart from './piechart/piechart';
import ExpirationTable from './expirationtable/expirationtable';
import TotalCalories from './total/total';
import CapacityBar from './capacity/capacity'; // Ensure this import points to the updated CapacityBar component

const StatsPage = () => {
  return (
    <Box className={styles.page}>
      <Box className={styles.row}>
        <Box className={styles.pieandtotal}>
          <PieChart />
          <TotalCalories />
          <TotalCalories />
        </Box>
        <Box className={styles.expirationtable}>
          <ExpirationTable />
        </Box>
        <Box className={styles.capacity}>
          <CapacityBar />
        </Box>
      </Box>
    </Box>
  );
}

export default StatsPage;
