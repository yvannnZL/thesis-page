import React, { useEffect, useState } from 'react';

const ForecastContainer = ({ selectedYear }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    const fetchForecastData = async () => {
      // fetching data
      try {
        //2010-jan 2023
        const historicalResponse = await fetch(`/api/historical/byYear?year=${selectedYear}`);
        const historicalData = await historicalResponse.json();

        let predictedData = [];
        if (selectedYear === 2023) {
          const predictedResponse = await fetch('/api/prediction');
          predictedData = await predictedResponse.json();

          predictedData = predictedData
            .filter((item) => new Date(item.date).getFullYear() === 2023)
            .slice(0, 12);
        }

        const typeMap = {
          Total: 'total_monthly_average',
        };
        const predictedTypeMap = {
          Total: 'predicted_monthly_consumption',
        };

        const typeKey = typeMap['Total'];
        const predictedTypeKey = predictedTypeMap['Total'];

        const historicalMonthlyData = Array(12).fill(0);
        historicalData.forEach((item) => {
          const month = new Date(item.date).getMonth(); // 0-11
          historicalMonthlyData[month] = item[typeKey] || 0;
        });

        const predictedMonthlyData = Array(12).fill(null);
        predictedData.forEach((item) => {
          const month = new Date(item.date).getMonth(); // 0-11
          predictedMonthlyData[month] = item[predictedTypeKey] || 0;
        });

        const combinedMonthlyData = historicalMonthlyData.map((value, index) =>
          index < 1 ? value : predictedMonthlyData[index] || value
        );

        setForecasts(combinedMonthlyData);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };

    fetchForecastData();
  }, [selectedYear]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '32px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#395a7f',
        height: '500px'
      }}
    >
      <h2 style={{ fontSize: '1rem', marginBottom: '8px', color: '#e9ecee', marginBottom: '16px' }}>
        Monthly Water Consumption Total for {selectedYear}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', color: '#e9ecee' }}>
        <div><strong>Month</strong></div>
        <div><strong>Consumption (Total)</strong></div>
        {monthNames.map((month, index) => (
          <React.Fragment key={index}>
            <div>{month}</div>
            <div>{forecasts[index] !== null ? forecasts[index] : 'N/A'}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ForecastContainer;
