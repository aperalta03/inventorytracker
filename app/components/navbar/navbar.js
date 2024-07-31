// navbar.js
import React from 'react';
import Link from 'next/link';
import { Box, Tabs, Tab, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import styles from './navbar.module.css';

const Navbar = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <Box className={styles.navbar}>
      <Box className={styles.titleContainer}>
        <Typography variant="h5" className={styles.title}>Inventory Tracker</Typography>
      </Box>
      <Button className={styles.logoutButton} onClick={handleLogout}>
        LOGOUT
      </Button>
      <Box className={styles.pagesContainer}>
        <Tabs
          className={styles.tabs} 
          value={currentPath} 
          textColor="inherit" 
          TabIndicatorProps={{
            className: styles.customIndicator,
          }}
        >
          <Tab 
            label="Data" 
            value="/data" 
            component={Link} 
            href="/data" 
            className={styles.tab} 
          />
          <Tab 
            label="Statistics" 
            value="/stats" 
            component={Link} 
            href="/stats" 
            className={styles.tab} 
          />
          <Tab 
            label="Camera" 
            value="/camera" 
            component={Link} 
            href="/camera" 
            className={styles.tab} 
          />
        </Tabs>
      </Box>
    </Box>
  );
};

export default Navbar;
