// TotalCalories.js
import React from 'react';
import styles from './totalvalue.module.css';

const TotalValue = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Total Value</h2>
      <p className={styles.value}>$1000</p>
    </div>
  );
};

export default TotalValue;
