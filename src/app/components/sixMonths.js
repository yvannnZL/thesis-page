import React from 'react';

const ForecastContainer = () => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const today = new Date();
  const nextSixMonths = Array.from({ length: 6 }, (_, i) => monthNames[(today.getMonth() + i) % 12]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', border: '1px solid #ddd', borderRadius: '8px', height: '300px' }}>
      <h2 style={{ fontSize: '1rem', marginBottom: '8px' }}>Monthly Forecast</h2>
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
