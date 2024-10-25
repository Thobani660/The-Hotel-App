import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CheckInOut = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);

  const handleCheckInClick = () => {
    setShowCheckInCalendar(!showCheckInCalendar);
  };

  const handleCheckOutClick = () => {
    setShowCheckOutCalendar(!showCheckOutCalendar);
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <button
        onClick={handleCheckInClick}
        style={{
          margin: '10px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Check-In
      </button>

      {showCheckInCalendar && (
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setShowCheckInCalendar(false); // Hide calendar after selection
          }}
          dateFormat="yyyy/MM/dd"
          placeholderText="Select Check-In Date"
          inline
        />
      )}

      <button
        onClick={handleCheckOutClick}
        style={{
          margin: '10px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Check-Out
      </button>

      {showCheckOutCalendar && (
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
            setShowCheckOutCalendar(false); // Hide calendar after selection
          }}
          dateFormat="yyyy/MM/dd"
          placeholderText="Select Check-Out Date"
          inline
        />
      )}
    </div>
  );
};

export default CheckInOut;
