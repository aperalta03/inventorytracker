// PieChart.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale } from 'chart.js';
import { fetchInventory } from "../../dataPage/inventory/inventoryLogic";
import styles from './piechart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Category Distribution',
      data: [],
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57', '#5733FF', '#33FFF2', '#F2FF33'
      ]
    }]
  });

  const chartOptions = {
    plugins: {
      legend: {
        display: false // Set this to false to hide the legend
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      const inventory = await fetchInventory();
      const categories = inventory.reduce((acc, item) => {
        const category = item.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      setChartData({
        labels: Object.keys(categories),
        datasets: [{
          label: 'Category Distribution',
          data: Object.values(categories),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57', '#5733FF', '#33FFF2', '#F2FF33'
          ]
        }]
      });
    };
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Category Distribution</h2>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieChart;
