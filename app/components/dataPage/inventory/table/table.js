"use client";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import styles from './table.module.css';

const InventoryTable = ({ inventory = [], removeItem }) => {
  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table aria-label="simple table">
        {/* Table Header */}
        <TableHead>
          <TableRow className={styles.tableHeader}>
            <TableCell className={styles.tableHeaderCell}>Item Name</TableCell>
            <TableCell className={styles.tableHeaderCell} align="right">Quantity</TableCell>
            <TableCell className={styles.tableHeaderCell} align="right">Expiration Date</TableCell>
            <TableCell className={styles.tableHeaderCell} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        {/* Table Body */}
        <TableBody>
          {inventory.length > 0 ? (
            inventory.map(({ name, count, expirationDate }) => (
              <TableRow key={name} className={styles.tableRow}>
                <TableCell component="th" scope="row" className={styles.tableCell}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </TableCell>
                <TableCell align="right" className={styles.tableCell}>{count}</TableCell>
                <TableCell align="right" className={styles.tableCell}>{expirationDate}</TableCell>
                <TableCell align="right" className={styles.tableCell}>
                  <Button variant="contained" className={styles.removeButton} onClick={() => removeItem(name)}>REMOVE</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">No items found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
