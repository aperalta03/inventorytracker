// CapacityBar.js
import React, { useEffect, useState } from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';
import { fetchInventory } from "../../dataPage/inventory/inventoryLogic";
import styles from './capacity.module.css';

const CapacityBar = () => {
  const [currentCapacity, setCurrentCapacity] = useState(0);

  //# CHANGE MAX CAPACITY IF NEEDED
  const maxCapacity = 50;
  //# CHANGE MAX CAPACITY IF NEEDED

  useEffect(() => {
    const getData = async () => {
      const inventory = await fetchInventory();
      const totalItemCount = inventory.reduce((acc, item) => acc + item.count, 0);
      setCurrentCapacity(totalItemCount);
    };
    getData();
  }, []);

  return (
    <Box className={styles.container}>
      <Typography className={styles.title} variant='none'>Inventory Capacity</Typography>
      <Box className={styles.progressContainer}>
        <LinearProgress 
          className={styles.progressBar}
          variant="determinate" 
          value={(currentCapacity / maxCapacity) * 100} 
          orientation="vertical"
        />
        <Box className={styles.progressLabel}>
          {currentCapacity} / {maxCapacity}
        </Box>
      </Box>
    </Box>
  );
};

export default CapacityBar;
