import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'chart.js/auto';

const WeeklyForecast = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [xAxisLabels, setXAxisLabels] = useState([]);

  // Update the x-axis labels whenever the selected date changes
  useEffect(() => {
    const labels = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + i);
      return date.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit' });
    });
    setXAxisLabels(labels);
  }, [selectedDate]);

  // Dummy data for the graph with empty values for now
  const data = {
    labels: xAxisLabels,
    datasets: [
      {
        label: 'Water Consumption',
        data: Array(7).fill(null), // Empty data array
        fill: true,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };

  // Styling options for the chart
  const options = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: false },
      x: { beginAtZero: false },
    },
  };

  return (
    <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0 }}>Forecast Graph</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label>Select Date </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            className="datepicker"
          />
        </div>
        <div>
          {`${selectedDate.toLocaleDateString()} - ${
            new Date(selectedDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()
          }`}
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeeklyForecast;
