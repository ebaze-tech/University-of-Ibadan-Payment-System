import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/loadingSpinner';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/requests");

        const data = await response.json();
        if (response.ok) {
          setRequests(data.requests);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError('An unexpected error occurred: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div>
      <h1>Admin AdminDashboard</h1>
      <button
        onClick={handleLogout}>
        Logout
      </button>
      {loading ? (<LoadingSpinner />) : error ? (
        <div className='text-red-500'>{error}</div>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Request ID</th>
              <th className="py-2">Requester</th>
              <th className="py-2">Type</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="py-2">{request.id}</td>
                <td className="py-2">{request.requester}</td>
                <td className="py-2">{request.type}</td>
                <td className="py-2">{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
  );
};

export default AdminDashboard;

      {/* {error && <p>{error}</p>}
      {loading ? (<LoadingSpinner />) : (
        <>
          <form onSubmit={addUser} method="post">
            <input
              type="text"
              name='number'
              placeholder='Number'
              value={newUser.number}
              onChange={handleChange}
              required />
            <input
              type="text"
              name='email'
              placeholder='email'
              value={newUser.email}
              onChange={handleChange}
              required />
            <input
              type="text"
              name='Password'
              placeholder='Password'
              value={newUser.password}
              onChange={handleChange}
              required />
            <select name='role' value={newUser.role} onChange={handleChange} required>
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
            </select>
            <button type="submit">Add User</button>
          </form>
          <ul>
            {users.map(user => (
              <li key={user._id}>
                {user.email} - {user.role}
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )} */}
//     </div>
//   )
// }

// export default AdminDashboard