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
    pendingReviews: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Key to force refresh

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
        const reviewsData = await getReviews(true); // Get all reviews including unapproved
        console.log('Reviews data:', reviewsData);
        
        // Ensure reviewsData is an array
        const reviewsArray = Array.isArray(reviewsData) ? reviewsData : [];
        
        // Calculate stats
        const pendingBookings = bookingsArray.filter(booking => booking.status === 'pending').length;
        const pendingReviews = reviewsArray.filter(review => !review.approved).length;
        
        setStats({
          totalBookings: bookingsArray.length,
          pendingBookings,
          totalReviews: reviewsArray.length,
          pendingReviews
        });
        
        // Get the 5 most recent bookings
        const sortedBookings = [...bookingsArray].sort((a, b) => 
          new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
        ).slice(0, 5);
        
        setRecentBookings(sortedBookings);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data');
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [refreshKey]); // Add refreshKey as dependency

  // Function to manually refresh data
  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={refreshData} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={refreshData} className="btn btn-secondary refresh-btn">
          Refresh Data
        </button>
      </div>
      
      <Stats stats={stats} />
      
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <RecentBookings bookings={recentBookings} onRefresh={refreshData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;