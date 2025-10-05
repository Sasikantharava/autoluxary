import React from 'react';
import './UserList.css';

const UserList = ({ users, onUserSelect, selectedUserId }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="user-list">
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr 
                  key={user._id} 
                  className={`user-row ${selectedUserId === user._id ? 'selected' : ''}`}
                  onClick={() => onUserSelect(user)}
                >
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role role-${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;