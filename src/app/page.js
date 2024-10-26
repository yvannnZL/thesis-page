"use client"; // Keep this line

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
    <div style={{ textAlign: 'left', marginTop: '50px' }}>
      <h1 style={{ fontSize: '2rem' }}>Water Consumption Forecast for {date}</h1>
      <ForecastContainer />
      <WeeklyForecast />
    </div>
  );
};

export default Home;
