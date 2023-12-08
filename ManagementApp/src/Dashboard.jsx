import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './assets/tigum_logos/logo-big.png';


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
  }, []);





  const handleLogout = () => {
    history('/');
    console.log('Logout clicked');
  };
  const gotoUsers = () => {
    history('/managementApp');
    console.log('Users clicked');
  };

  const gotoDashboard = () => {
    history('/dashboard');
    console.log('Users clicked');
  };

  return (
    <>
      {/* Navigation Side Bar */}
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <div className="bg-dark text-light d-flex flex-column justify-content-between p-4" style={{ width: "250px", minHeight: "100vh" }}>
          <div>
            <div className="logo text-center mb-4">
              <img src={logo} style={{ width: '150px' }} />
              <p>Admin Area</p>
            </div>
            <div className="navigation-menu">
              {/* Add your navigation menu items here */}
              <ul className="list-group">
                <li className="list-group-item mb-2 btn" onClick={gotoUsers}>Users</li>
                <li className="list-group-item mb-2 btn" onClick={gotoDashboard}>Dashboard</li>
                {/* Add more menu items as needed */}
              </ul>
            </div>
          </div>
          {/* Logout Button */}
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Main content */}
        <div className="container-fluid bg-white mt-4">
          <div className="container mt-4">
            <h1 className="text-center mb-4">Dashboard</h1>

            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Total User Count</h5>
                    <p className="card-text fs-1 text-center">{userCount}</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">New Monthly Users</h5>
                    <p className="card-text fs-1 text-center">{newUsers}</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Daily Active Users</h5>
                    <p className="card-text fs-1 text-center">{dailyUsers}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Dashboard;
