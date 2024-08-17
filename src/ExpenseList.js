// ExpenseList.js
import React, { useEffect, useState } from 'react';
import { fetchShiftLogs, deleteShiftLog } from './firebase';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ShiftLogList = () => {
  const [shiftLogs, setShiftLogs] = useState([]);

  useEffect(() => {
    fetchShiftLogs((data) => {
      const logList = [];
      for (let id in data) {
        logList.push({ id, ...data[id] });
      }
      setShiftLogs(logList);
    });
  }, []); // Empty dependency array ensures this runs only on component mount

  const handleDelete = async (id) => {
    try {
      await deleteShiftLog(id);
      setShiftLogs(shiftLogs.filter((log) => log.id !== id));
    } catch (error) {
      console.error('Error deleting shift log: ', error);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Shift Log List', 20, 10);
    doc.autoTable({
      head: [['Operator Name', 'Supervisor Name', 'Shift Date', 'Shift Details']],
      body: shiftLogs.map((log) => [
        log.operatorName,
        log.supervisorName,
        new Date(log.shiftDate).toLocaleDateString(),
        log.shiftDetails,
      ]),
    });
    doc.save('shift_logs.pdf');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0 text-center">Shift Log List</h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>Operator Name</th>
                      <th>Supervisor Name</th>
                      <th>Shift Date</th>
                      <th>Shift Details</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shiftLogs.map((log) => (
                      <tr key={log.id}>
                        <td>{log.operatorName}</td>
                        <td>{log.supervisorName}</td>
                        <td>{new Date(log.shiftDate).toLocaleDateString()}</td>
                        <td>{log.shiftDetails}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(log.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-success" onClick={downloadPDF}>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftLogList;
