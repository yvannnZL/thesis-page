"use client"; 

import { useEffect, useState } from 'react';
import ForecastContainer from './components/sixMonths';
import WeeklyForecast from './components/weeklyForecast';

const Home = () => {
  const [date, setDate] = useState('');
  const [selectedYear, setSelectedYear] = useState(2023); // Shared state for the selected year

  useEffect(() => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setDate(today.toLocaleDateString(undefined, options));
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#d6dad9'}}>
      <div style={{ textAlign: 'left', padding: '50px', }}>
        <strong>
          <h1 style={{ fontSize: '2.5rem'}}>Water Consumption History and Forecast in Davao City</h1>
          
        </strong>
        <h4 style={{ marginBottom: '20px' }}>{date}</h4>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <ForecastContainer selectedYear={selectedYear} />
          </div>

          <div style={{ flex: '2', minWidth: '400px' }}>
            <WeeklyForecast selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
