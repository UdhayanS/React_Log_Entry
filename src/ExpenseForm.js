// ExpenseForm.js
import React, { useState } from 'react';
import { addShiftLog } from './firebase'; // Ensure this is the correct path to your Firebase functions

const ExpenseForm = ({ onShiftLogAdded }) => {
  const [operatorName, setOperatorName] = useState('');
  const [supervisorName, setSupervisorName] = useState('');
  const [shiftDate, setShiftDate] = useState('');
  const [shiftDetails, setShiftDetails] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const shiftLog = {
        operatorName,
        supervisorName,
        shiftDate,
        shiftDetails,
      };
      await addShiftLog(shiftLog);
      setOperatorName('');
      setSupervisorName('');
      setShiftDate('');
      setShiftDetails('');
      if (onShiftLogAdded) {
        onShiftLogAdded(); // Call the callback to refresh the list
      }
    } catch (error) {
      console.error('Error adding shift log: ', error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Add Shift Log</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="operatorName" className="form-label">Operator Name</label>
            <input
              type="text"
              className="form-control"
              id="operatorName"
              value={operatorName}
              onChange={(e) => setOperatorName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="supervisorName" className="form-label">Supervisor Name</label>
            <input
              type="text"
              className="form-control"
              id="supervisorName"
              value={supervisorName}
              onChange={(e) => setSupervisorName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="shiftDate" className="form-label">Shift Date</label>
            <input
              type="date"
              className="form-control"
              id="shiftDate"
              value={shiftDate}
              onChange={(e) => setShiftDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="shiftDetails" className="form-label">Shift Details</label>
            <textarea
              className="form-control"
              id="shiftDetails"
              rows="3"
              value={shiftDetails}
              onChange={(e) => setShiftDetails(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Add Shift Log</button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
