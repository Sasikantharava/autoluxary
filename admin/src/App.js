import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Reviews from './pages/Reviews';
import Gallery from './pages/Gallery';
import Users from './pages/Users';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {isAuthenticated ? (
            <>
              <Header />
              <div className="admin-container">
                <Sidebar />
                <main className="admin-main">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            </>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;