import React from 'react';

const ForecastContainer = () => {
  // Create an array of months for the next 6 months
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const today = new Date();
  const nextSixMonths = Array.from({ length: 6 }, (_, i) => monthNames[(today.getMonth() + i) % 12]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', border: '1px solid #ddd', borderRadius: '8px', width: '20%' }}>
      <h2>Monthly Forecast</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <div><strong>Month</strong></div>
        <div><strong>Forecast</strong></div>
        {nextSixMonths.map((month, index) => (
          <React.Fragment key={index}>
            <div>{month}</div>
            <div>{/* Forecast Value Here */}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ForecastContainer;
