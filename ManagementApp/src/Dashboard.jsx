import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  // State to store user data from the API
  const [userData, setUserData] = useState([]);
  
  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('your-api-endpoint-for-user-data');
        setUserData(response.data); // Assuming the API returns an array of user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  // Logout function (you can implement the actual logout logic here)
  const handleLogout = () => {
    // Add your logout logic here, such as clearing authentication tokens, etc.
    console.log('Logout clicked');
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
        <div className="logout-btn" onClick={handleLogout}>
          Logout
        </div>
      </div>

      {/* Dashboard */}
      <div className="dashboard">
        <h3> DASHBOARD</h3>
        {/* Dashboard Cards Static */}
        <div className="cards">
          <div className="card">
            <h2>Total User Count</h2>
            <p>New</p>
          </div>
          <div className="card">
            <h2>New Monthly Users</h2>
            <p>136</p>
          </div>
          <div className="card">
            <h2>Daily Active User</h2>
            <p>120</p>
          </div>
        </div>
        <h3>LATEST ACTIVITIES</h3>
        <div className="user-cards">
          {/* Render user cards dynamically based on API data */}
          {/* {userData.map((user) => (
            <div key={user.id} className="user-card">
              <h4>{user.name}</h4>
              <p>Email: {user.email}</p>
              <p>Last Login: {user.lastLogin}</p>
              <button onClick={() => handleDeleteAccount(user.id)}>Delete Account</button>
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
