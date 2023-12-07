import React, { useState, useEffect} from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function Dashboard() {
  

  const [userData, setUserData] = useState([{}]);
  const [userCount, setUserCount] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [dailyUsers, setDailyUsers] = useState(0);
  
  const history = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/getUsers')
      .then((response) => {
        setUserData(response.data);
        setUserCount(response.data.length);
        console.log(response.data.length)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  , []);
  useEffect(() => {
    axios.get('http://localhost:8000/newUsers')
      .then((response) => {
        console.log(response.data.result.length);
        setNewUsers(response.data.result.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  , []);

  useEffect(() => {
    axios.get('http://localhost:8000/dailyUsers')
      .then((response) => {
        console.log(response.data.result.length);
        setDailyUsers(response.data.result.length);
      })
      .catch((error) => {
        console.log(error);
      });
  } , []);
  

  


  // Logout function (you can implement the actual logout logic here)
  const handleLogout = () => {
    history('/');
    console.log('Logout clicked');
  };
  const gotoUsers = () => {
    history('/managementApp');
    console.log('Users clicked');
  };

  return (
    <>
      {/* Navigation Side Bar */}
      <div>
        <div className="logo">
          <div className='text-center'>
            <h1>LOGO Here</h1>
            <p>Admin Area</p>
          </div>
          {/* Navigation Options */}
        </div>
        <div className="navigation-menu">
          {/* Add your navigation menu items here */}
        </div>
        {/* Logout Button */}
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="container-fluid bg-white mt-4">
          <button className='btn btn-primary' onClick={gotoUsers} >Users</button>
      </div>
        {/* Dashboard */}
      <div className="dashboard">
        <h3> DASHBOARD</h3>
        {/* Dashboard Cards Static */}
        <div className="cards">
          <div className="card">
            <h2>Total User Count</h2>
            <p>{userCount}</p>
          </div>
          <div className="card">
            <h2>New Monthly Users</h2>
            <p>{newUsers}</p>
          </div>
          <div className="card">
            <h2>Daily Active User</h2>
            <p>{dailyUsers}</p>
          </div>
        </div>
      </div>

    </>
  );
}

export default Dashboard;
