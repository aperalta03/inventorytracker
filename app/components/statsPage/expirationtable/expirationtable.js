// ExpirationTable.js
import React, { useEffect, useState } from 'react';
import { fetchInventory } from "../../dataPage/inventory/inventoryLogic";
import styles from './expirationtable.module.css';

const ExpirationTable = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const inventoryList = await fetchInventory();
      const sortedInventory = inventoryList.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));
      setInventory(sortedInventory);
    };
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Items by Expiration Date</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr className={styles.row} key={index}>
              <td>{item.name}</td>
              <td>{item.expirationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpirationTable;
