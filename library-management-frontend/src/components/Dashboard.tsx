import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; 

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1>Library Management Dashboard</h1>
      <div className="dashboard-buttons">
        <button onClick={() => navigate('/view')}>View Books</button>
        <button onClick={() => navigate('/create')}>Create Book</button>
        <button onClick={() => navigate('/update/1')}>Update Book</button>
        <button onClick={() => navigate('/delete/1')}>Delete Book</button>
      </div>
    </div>
  );
};

export default Dashboard;
