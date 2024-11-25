import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const PredictedValuesGraph = () => {
  const [predictedData, setPredictedData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPredictedData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/prediction');
        const data = await response.json();
        setPredictedData(data);
      } catch (error) {
        console.error('Error fetching predicted data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictedData();
  }, []);

  // Prepare data for the chart
  const labels = predictedData.map((item) => new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
  const datasets = [
    {
      label: 'Predicted Water Consumption',
      data: predictedData.map((item) => item.predicted_monthly_consumption), // Adjust key based on API
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
      tension: 0.4,
    },
  ];

  const chartOptions = {
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: { beginAtZero: true },
    },
    maintainAspectRatio: false,
  };

  return (
    <div
      style={{
        padding: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#e9ecee',
        height: '350px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>
        Predicted Water Consumption from February 2023 to January 2024
      </h3>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <div style={{ height: '250px' }}>
          <Line data={{ labels, datasets }} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default PredictedValuesGraph;
