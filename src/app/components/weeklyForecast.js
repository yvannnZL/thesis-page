import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const YearlyForecast = ({ selectedYear, setSelectedYear }) => {
  const [selectedType, setSelectedType] = useState('Total');
  const [chartData, setChartData] = useState({ historical: [], predicted: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const historicalResponse = await fetch(`/api/historical/byYear?year=${selectedYear}`);
        const historicalData = await historicalResponse.json();
      
        let predictedData = [];
        if (selectedYear === 2023) {
          const predictedResponse = await fetch('/api/prediction');
          predictedData = await predictedResponse.json();
          
          predictedData = predictedData
            .filter((item) => new Date(item.date).getFullYear() === 2023)
            .slice(0, 12);
          console.log('Data after limiting to February–December:', predictedData);
        }
      
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
      
        const historicalMonthlyData = Array(12).fill(0);
        historicalData.forEach((item) => {
          const month = new Date(item.date).getMonth(); 
          historicalMonthlyData[month] = item[typeKey] || 0;
        });
      
        const predictedMonthlyData = Array(12).fill(null); 
        predictedData.forEach((item) => {
          const month = new Date(item.date).getMonth();
          predictedMonthlyData[month] = item[predictedTypeKey] || 0;
        });
      
        const combinedMonthlyData = historicalMonthlyData.map((value, index) =>
          index < 1 ? value : predictedMonthlyData[index] || value
        );
      
        setChartData({
          historical: historicalMonthlyData,
          predicted: predictedMonthlyData,
          combined: combinedMonthlyData, 
        });
      
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear, selectedType]);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 
    datasets: [
      {
        label: `${selectedType} (Historical Data)`,
        data: chartData.historical,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)', 
        tension: 0.4,
      },
      ...(selectedYear === 2023
        ? [
            {
              label: `${selectedType} (Predicted Data)`,
              data: chartData.predicted,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              tension: 0.4,
            },
          ]
        : []),
    ],
  };

  const options = {
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
        padding: '32px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#e9ecee',
        height: '500px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <label style={{ marginRight: '8px' }}>Select Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            {Array.from({ length: 14 }, (_, i) => 2010 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ marginRight: '8px' }}>Select Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Government">Government</option>
            <option value="Total">Total</option>
          </select>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ height: '400px' }}>
          <Line data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default YearlyForecast;