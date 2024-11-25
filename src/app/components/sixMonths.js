import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaucet } from '@fortawesome/free-solid-svg-icons';

const ForecastContainer = ({ selectedYear }) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] ;

  const [forecasts, setForecasts] = useState([]);
  const [selectedType, setSelectedType] = useState('Total');

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        // Fetch historical data
        const historicalResponse = await fetch(`/api/historical/byYear?year=${selectedYear}`);
        const historicalData = await historicalResponse.json();

        let predictedData = [];
        if (selectedYear === 2023) {
          // Fetch predicted data for 2023
          const predictedResponse = await fetch('/api/prediction');
          predictedData = await predictedResponse.json();

          // Filter for 2023 and limit to February–December
          predictedData = predictedData
            .filter((item) => new Date(item.date).getFullYear() === 2023)
            .slice(0, 12);
        }

        // Type mapping
        const typeMap = {
          Residential: 'residential_monthly_average',
          Commercial: 'commercial_monthly_average',
          Government: 'government_monthly_average',
          Total: 'total_monthly_average',
        };
        const predictedTypeMap = {
          Residential: 'predicted_residential_monthly_average',
          Commercial: 'predicted_commercial_monthly_average',
          Government: 'predicted_government_monthly_average',
          Total: 'predicted_monthly_consumption',
        };

        const typeKey = typeMap[selectedType];
        const predictedTypeKey = predictedTypeMap[selectedType];

        // Process historical data
        const historicalMonthlyData = Array(12).fill(0);
        historicalData.forEach((item) => {
          const month = new Date(item.date).getMonth(); // 0-11
          historicalMonthlyData[month] = item[typeKey] || 0;
        });

        // Process predicted data
        const predictedMonthlyData = Array(12).fill(null);
        predictedData.forEach((item) => {
          const month = new Date(item.date).getMonth(); // 0-11
          predictedMonthlyData[month] = item[predictedTypeKey] || 0;
        });

        // Combine data
        const combinedMonthlyData = historicalMonthlyData.map((value, index) =>
          index < 1 ? value : predictedMonthlyData[index] || value
        );

        setForecasts(combinedMonthlyData);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };

    fetchForecastData();
  }, [selectedYear, selectedType]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '16px',
        paddingLeft: '32px',
        paddingRight: '32px',
        paddingBottom : '32px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#395a7f',
        height: '100vh',
        position: 'fixed',
        right: 0,
        width: '300px',
        overflowY: 'auto',
      }}
    >
      <FontAwesomeIcon icon={faFaucet} style={{ fontSize: '50px', color: '#e9ecee', marginBottom: '8px' }} />


      <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#e9ecee' }}>Monthly Water Consumption for {selectedYear} </h2>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="type-select" style={{ display: 'block', marginBottom: '8px', color: '#e9ecee' }}>
          Select Type:
        </label>
        <select
          id="type-select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{ width: '100%', padding: '8px', fontSize: '1rem', color: 'black' }}
        >
          <option value="Total">Total</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Government">Government</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', color: '#e9ecee' }}>
        <div><strong>Month</strong></div>
        <div><strong>Consumption</strong></div>
        {monthNames.map((month, index) => (
          <React.Fragment key={index}>
            <div>{month}</div>
            <div>
              {forecasts[index] !== null 
                ? `${new Intl.NumberFormat().format(forecasts[index])} m³`
                : 'N/A'}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ForecastContainer;
