// App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleShiftLogAdded = () => {
    setRefresh(!refresh); // Toggle refresh state to trigger reload
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">Shift Log Management</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#form">Add Shift Log</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#list">View Shift Logs</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="form" className="container mt-5">
        <ExpenseForm onShiftLogAdded={handleShiftLogAdded} />
      </div>

      <div id="list" className="container mt-5">
        <ExpenseList key={refresh} /> {/* Use refresh state to force re-render */}
      </div>
    </div>
  );
};

export default App;
