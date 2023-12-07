import React, { useEffect, useState } from 'react';

const YourComponent = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/getUsers')
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Logging the fetched data
        setUserData(data); // Update state with fetched user data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>

      {/* header blue card */}

      <div className="container-fluid bg-white mt-4">
        <div className="container px-0">
          <nav className="navbar bg-info border rounded-4 d-flex justify-content-between align-items-center m-0 px-3">
            <p className="display-6 mb-0">Welcome, Admin</p>
            <button className='btn btn-light'>LOGOUT</button>
          </nav>
        </div>
      </div>

      {/* end of header blue card */}


      {/* table of users */}

      <div className="container-fluid bg-white mt-4 py-4">
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope='col'>First Name</th>
                <th scope='col'>Last Name</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td> {/* Add action buttons or content here */}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* end of table of users */}






    </>
  );
};

export default YourComponent;
