// TotalCalories.js
import React, { useEffect, useState } from 'react';
import { fetchInventory } from "../../dataPage/inventory/inventoryLogic";
import styles from './total.module.css';

const TotalCalories = () => {
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const inventory = await fetchInventory();
      const calories = inventory.reduce((acc, item) => acc + (item.calories || 0), 0);
      setTotalCalories(calories);
    };
    getData();
  }, []);

  const formatCalories = (calories) => {
    if (calories >= 1e6) return `${(calories / 1e6).toFixed(1)} MCal`;
    if (calories >= 1e3) return `${(calories / 1e3).toFixed(1)} kCal`;
    return `${calories} Cal`;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Total Calories</h2>
      <p className={styles.calories}>{formatCalories(totalCalories)}</p>
    </div>
  );
};

export default TotalCalories;
