import React, { useState, useEffect } from 'react';
import UserList from '../components/users/UserList';
import UserDetails from '../components/users/UserDetails';
import { getUsers } from '../services/userService';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const filteredUsers = filter === 'all' 
    ? users 
    : filter === 'admin' 
      ? users.filter(user => user.role === 'admin')
      : users.filter(user => user.role === 'user');

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="users-page">
      <h1>Users</h1>
      
      <div className="users-container">
        <div className="users-list-container">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({users.length})
            </button>
            <button 
              className={`filter-tab ${filter === 'admin' ? 'active' : ''}`}
              onClick={() => setFilter('admin')}
            >
              Admin ({users.filter(u => u.role === 'admin').length})
            </button>
            <button 
              className={`filter-tab ${filter === 'user' ? 'active' : ''}`}
              onClick={() => setFilter('user')}
            >
              Users ({users.filter(u => u.role === 'user').length})
            </button>
          </div>
          
          <UserList 
            users={filteredUsers} 
            onUserSelect={handleUserSelect}
            selectedUserId={selectedUser?._id}
          />
        </div>
        
        <div className="user-details-container">
          {selectedUser ? (
            <UserDetails user={selectedUser} />
          ) : (
            <div className="no-user-selected">
              <p>Select a user to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;