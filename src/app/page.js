"use client"; 

import { useEffect, useState } from 'react';
import ForecastContainer from './components/sixMonths';
import WeeklyForecast from './components/weeklyForecast';

const Home = () => {
  const [date, setDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setDate(today.toLocaleDateString(undefined, options));
  }, []);

  return (
    <div style={{ textAlign: 'left', marginTop: '50px', padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Water Consumption Forecast for {date}</h1>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <ForecastContainer />
        </div>

        <div style={{ flex: '4', minWidth: '400px' }}>
          <WeeklyForecast />
        </div>
      </div>
    </div>
  );
};

export default Home;
