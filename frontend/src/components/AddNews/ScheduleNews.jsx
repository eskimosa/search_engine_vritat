import React, { useState } from 'react';
import axios from 'axios';

const ScheduleNews = () => {
  const [frequency, setFrequency] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!frequency) {
      alert('Please select a frequency');
      return;
    }

    try {
      // Send frequency to backend
      await axios.post('http://localhost:8000/api/update_frequency', { frequency });
      alert('Frequency updated successfully!');
    } catch (error) {
      console.error('Error updating frequency:', error);
      alert('An error occurred while updating frequency.');
    }
  };

  return (
    <div>
      <h2>Update Frequency</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select update frequency:
          <select value={frequency} onChange={(event) => setFrequency(event.target.value)}>
            <option value="">Select</option>
            <option value="2">Every 2 hours</option>
            <option value="8">Every 8 hours</option>
            <option value="12">Every 12 hours</option>
            <option value="24">Every 24 hours</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ScheduleNews;



