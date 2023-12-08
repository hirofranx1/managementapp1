import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './assets/white_tigum_logos/1whiteLog.svg';

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
        // Sort the userData array alphabetically based on user names
        const sortedData = data.sort((a, b) =>
          `${a.firstname} ${a.lastname}`.localeCompare(`${b.firstname} ${b.lastname}`)
        );
        setUserData(sortedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  async function deleteUser() {
    axios
      .put('http://localhost:8000/deleteUser', {
        id: userId,
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const isActivityOld = (latestActivity) => {
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    return new Date(latestActivity) < oneYearAgo;
  };

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

  const logoStyles = {
    width: '150px',
    shadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
    paddingTop: '10%',
  };

  return (
    <>
      {/* Navigation Side Bar */}
      <div
        className="d-flex"
        style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}
      >
        <div
          className="text-light d-flex flex-column justify-content-between p-4"
          style={{
            width: '250px',
            minHeight: '100vh',
            backgroundColor: 'rgb(162, 188, 210)',
          }}
        >
          <div>
            <div className="logo text-center mb-4" style={{ padding: '70%,10%' }}>
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
          <button
            className="btn btn-primary"
            onClick={handleLogout}
            style={{ background: '#87A8D0' }}
          >
            Logout
          </button>
        </div>

        {/* Main content */}
        <div className="d-flex flex-column pt-4" style={{ width: '100%' }}>
          {/* Header blue card */}
          <div className="container-fluid rounded-4 mb-4">
            <div className="container px-0">
              <nav className="navbar border rounded-4 d-flex justify-content-between align-items-center m-0 px-3" style={{ backgroundColor: '#6484AA'}}>
                <h1
                  className="text-center mb-1 display-6 mb-0 text-light"
                  style={{
                    color: '#6484AA',
                    fontSize: 68,
                    fontWeight: 700,
                    margin: '0 auto',  // Add this style to center the text
                  }}
                >
                  Welcome to the User Board!
                </h1>
              </nav>
              {/* message bar */}
              <div className="message container mt-4">
                <p>
                  Welcome to the User Board! This page displays a list of all currently active users of our program. We strive to maintain a clean and active user base, and users who have been inactive for a year will have a "Delete" button appear next to their names.
                </p>
                <p className="mb-1">
                  <strong>Please note:</strong>
                </p>
                <ul className="mb-4">
                  <li>Clicking the "Delete" button will permanently remove the user from the program.</li>
                  <li>Deletion is not automatic. We encourage you to review the list and only delete users who you believe should no longer have access.</li>
                  <li>If you believe a user should remain active even though they have been inactive for a year, please contact us before deleting them.</li>
                </ul>
                <hr></hr>
              </div>
            </div>
          </div>
          {/* End of header blue card */}

          {/* Cards of users */}
          <div className="container-fluid bg-white py-4">
            <div className="container">
              <div className="row">
                {userData.map((user, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <div className="card h-100" style={{ width: '90%', margin: '0 5%' }}>
                      <div className="card-body">
                        <h5 className="card-title fw-bold">
                          {user.firstname} {user.lastname}
                        </h5>
                        <p className="card-text">Email: {user.email}</p>
                        <p className="card-text">
                          Latest Activity:{' '}
                          {new Date(user.latest_activity).toLocaleDateString()}
                        </p>
                        <div style={{ textAlign: 'center', margin: '5% 0' }}>
                          {isActivityOld(user.latest_activity) ? (
                            <button
                              onClick={() => {
                                setShowDelete(true);
                                setUser(user);
                                setUserId(user.user_id);
                              }}
                              className="btn btn-danger"
                              style={{ width: '90%' }}
                            >
                              Delete User
                            </button>
                          ) : (
                            <span style={{ fontFamily: 'monospace', color: 'rgb(36, 8, 91)', paddingTop: '143px' }}>
                              Cannot Delete User
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* End of cards of users */}
        </div>
      </div>

      {showDelete && (
        <Modal
          show={true}
          onHide={() => setShowDelete(false)}
          backdrop={false}
        >
          <Modal.Header>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this user?</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-danger"
              onClick={() => {
                setShowDelete(false);
                deleteUser();
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowDelete(false)}
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default YourComponent;
