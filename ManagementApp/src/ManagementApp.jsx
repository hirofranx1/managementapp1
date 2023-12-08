import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './assets/tigum_logos/logo-big.png';

const YourComponent = () => {
  const [userData, setUserData] = useState([{}]);

  const [user, setUser] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [userId, setUserId] = useState('');

  const history = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/getUsers')
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  async function deleteUser() {
    axios.put('http://localhost:8000/deleteUser', {
      id: userId,
    }).then((response) => {
      console.log(response);
      window.location.reload();
    }
    ).catch((error) => {
      console.log(error);
    });
  }

  const isActivityOld = (latestActivity) => {
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    return new Date(latestActivity) < oneYearAgo;
  };

  console.log(userData);



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
        <div className="d-flex flex-column pt-4" style={{ width: "100%" }}>
          {/* Header blue card */}
          <div className="container-fluid rounded-4 mb-4">
            <div className="container px-0">
              <nav className="navbar bg-primary border rounded-4 d-flex justify-content-between align-items-center m-0 px-3">
                <p className="display-6 mb-0 text-light">Welcome, Admin</p>
              </nav>
            </div>
          </div>
          {/* End of header blue card */}

          {/* table of users */}
          <div className="container-fluid bg-white py-4">
            <div className="container">
              <table className="table">
                <thead>
                  <tr>
                    <th scope='col'>First Name</th>
                    <th scope='col'>Last Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Latest Activity</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, index) => (

                    <tr key={index}>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.email}</td>
                      <td>{new Date(user.latest_activity).toLocaleDateString()}</td>
                      <td>
                        {isActivityOld(user.latest_activity) ? (
                          <button
                            onClick={() => {
                              setShowDelete(true);
                              setUser(user);
                              setUserId(user.user_id);
                            }}
                            className="btn btn-danger"
                          >
                            Delete User
                          </button>
                        ) : "Cannot Delete User"}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* end of table of users */}
        </div>
      </div>

      {showDelete && (
        <Modal show={true} onHide={() => setShowDelete(false)} backdrop={false}>
          <Modal.Header>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this user?</p>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-danger' onClick={() => { setShowDelete(false); deleteUser() }}>Delete</button>
            <button className='btn btn-secondary' onClick={() => setShowDelete(false)}>Cancel</button>

          </Modal.Footer>

        </Modal>
      )}
    </>
  );
};

export default YourComponent;
