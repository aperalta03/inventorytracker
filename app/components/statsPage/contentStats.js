// contentStats.js
import React from 'react';
import { Box, Typography } from "@mui/material";
import styles from './contentStats.module.css';
import PieChart from './piechart/piechart';
import ExpirationTable from './expirationtable/expirationtable';
import TotalCalories from './totalcal/totalcal';
import TotalValue from './totalvalue/totalvalue';
import CapacityBar from './capacity/capacity';

const StatsPage = () => {
  return (
    <Box className={styles.page}>
      <Box className={styles.row}>
        <Box className={styles.pieandtotal}>
          <PieChart />
          <TotalCalories />
          <TotalValue />
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
