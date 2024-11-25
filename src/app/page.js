"use client";

import { useEffect, useState } from 'react';
import ForecastContainer from './components/sixMonths';
import WeeklyForecast from './components/weeklyForecast';
import PredictedValuesGraph from './components/predictionMonths';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
  const [date, setDate] = useState('');
  const [selectedYear, setSelectedYear] = useState(2023);

  useEffect(() => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setDate(today.toLocaleDateString(undefined, options));
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#d6dad9', display: 'flex', flexDirection: 'row' }}>
      {/* Main Content */}
      <div style={{ flex: '1', padding: '50px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f5f5f5',
            padding: '20px 30px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px',
          }}
        >
          <div style={{ maxWidth: '70%' }}>
            <h1
              style={{
                fontSize: '2.5rem',
                marginBottom: '10px',
                color: '#395a7f',
                fontWeight: 'bold',
                lineHeight: '1.2',
              }}
            >
              Water Consumption History and Forecast in Davao City
            </h1>
            <h2
              style={{
                fontSize: '1.25rem',
                marginBottom: '15px',
                color: '#395a7f',
                fontWeight: '500',
              }}
            >
              Data gathered from Davao City Water District
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FontAwesomeIcon icon={faCalendar} style={{ fontSize: '15px', color: '#395a7f', marginBottom: '8px' }} />
              <h4
                style={{
                  fontSize: '1rem',
                  color: '#7f8c8d',
                }}
              >
                {date}
              </h4>
            </div>
    </div>

    {/* Logo Section */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <img
        src="/assets/DCWD.png"
        alt="Logo 1"
        style={{
          height: '100px',
          width: 'auto',
          objectFit: 'contain',
        }}
      />
      <img
        src="assets\ADDU.png"
        alt="Logo 2"
        style={{
          height: '100px',
          width: 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  </div>


        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
          <WeeklyForecast selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <PredictedValuesGraph />
        </div>
      </div>

      <div style={{ width: '300px', backgroundColor: '#f5f5f5', borderLeft: '1px solid #ccc', padding: '20px' }}>
        <ForecastContainer selectedYear={selectedYear} />
      </div>
    </div>
  );
};

export default Home;
