import React, { useState, useEffect } from 'react';
import Stats from '../components/dashboard/Stats';
import RecentBookings from '../components/dashboard/RecentBookings';
import { getBookings } from '../services/bookingService';
import { getReviews } from '../services/reviewService';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalReviews: 0,
    pendingReviews: 0,
    revenue: 0,
    conversionRate: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch bookings data
        const bookingsData = await getBookings();
        console.log('Bookings data:', bookingsData);
        
        // Ensure bookingsData is an array
        const bookingsArray = Array.isArray(bookingsData) ? bookingsData : [];
        
        // Fetch reviews data
        const reviewsData = await getReviews(true);
        console.log('Reviews data:', reviewsData);
        
        // Ensure reviewsData is an array
        const reviewsArray = Array.isArray(reviewsData) ? reviewsData : [];
        
        // Calculate stats
        const pendingBookings = bookingsArray.filter(booking => booking.status === 'pending').length;
        const pendingReviews = reviewsArray.filter(review => !review.approved).length;
        const revenue = bookingsArray.reduce((total, booking) => total + (booking.totalPrice || 0), 0);
        const conversionRate = bookingsArray.length > 0 ? Math.round((bookingsArray.filter(b => b.status === 'confirmed').length / bookingsArray.length) * 100) : 0;
        
        setStats({
          totalBookings: bookingsArray.length,
          pendingBookings,
          totalReviews: reviewsArray.length,
          pendingReviews,
          revenue,
          conversionRate
        });
        
        // Get the 5 most recent bookings
        const sortedBookings = [...bookingsArray].sort((a, b) => 
          new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
        ).slice(0, 5);
        
        setRecentBookings(sortedBookings);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again.');
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [refreshKey]);

  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner large"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-icon">⚠️</div>
        <h3>Unable to Load Dashboard</h3>
        <p>{error}</p>
        <button onClick={refreshData} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Dashboard Overview</h1>
          <p className="header-subtitle">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="header-actions">
          <button onClick={refreshData} className="btn btn-gradient refresh-btn">
            <span className="btn-icon">🔄</span>
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <Stats stats={stats} />

      {/* Main Content Grid */}
      <div className="dashboard-content">
        <div className="content-main">
          <div className="content-section gradient-card">
            <RecentBookings bookings={recentBookings} onRefresh={refreshData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;