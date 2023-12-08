import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './assets/white_tigum_logos/1whiteLog.svg';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardHeader, CardBody } from "react-bootstrap";

function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [dailyUsers, setDailyUsers] = useState(0);

  const history = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/getUsers')
      .then((response) => {
        setUserData(response.data);
        setUserCount(response.data.length);
        console.log(response.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/newUsers')
      .then((response) => {
        setNewUsers(response.data.result.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/dailyUsers')
      .then((response) => {
        setDailyUsers(response.data.result.length);
      })
      .catch((error) => {
        console.error(error);
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
    console.log('Dashboard clicked');
  };

  const logoStyles = {
    width: '150px',
    shadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
    paddingTop: '10%' ,
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <div className="text-light d-flex flex-column justify-content-between p-4" style={{ width: '250px', minHeight: '100vh', backgroundColor: 'rgb(162, 188, 210)' }}>
        <div>
          <div className="logo text-center mb-4" style={{padding: '70%,10%'}}>
            <img src={logo} style={logoStyles} alt="Logo" />
            <p>Admin Area</p>
          </div>
          <div className="navigation-menu">
            <ul className="list-group">
              <li className="list-group-item mb-2 btn" onClick={gotoUsers}>
                Users
              </li>
              <li className="list-group-item mb-2 btn" onClick={gotoDashboard}>
                Dashboard
              </li>
            </ul>
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleLogout} style={{background: '#87A8D0'}}>
          Logout
        </button>
      </div>

      <div className="container-fluid bg-white mt-4">
        <div className="container mt-3">
        <div>
          <h1 className="text-center mb-1"
            style={{
              color: '#6484AA',
              fontSize: 68,
              fontWeight: 700,
              wordWrap: 'break-word',
              paddingBottom: '0',
            }}>
            Dashboard
          </h1>
          <p style={{fontSize: 20, wordWrap: 'break-word', paddingBottom: '2%'}} >Welcome, <a style={{fontWeight: 700}}>Admin!</a> 
            This is your centralized hub for managing and overseeing the operations of your platform. 
            Here, you'll find a comprehensive overview of key metrics, Total Users, Monthly New Users, and Daily Active Users.
          </p>
        </div>
        

        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Total User Count</h5>
                <p className="card-text fs-1 text-center ">{userCount}</p>
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
  );
}

export default Dashboard;
