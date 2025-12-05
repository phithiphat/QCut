import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ShopList from './pages/ShopList';
import CreateShop from './pages/CreateShop';
import EditShop from './pages/EditShop';
import CreateBooking from './pages/CreateBooking';
import ShopBookings from './pages/ShopBookings';
import MyBookings from './pages/MyBookings';
import ManageBarbers from './pages/ManageBarbers';
import LandingPage from './pages/LandingPage';
import AuthService from './services/auth.service';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = AuthService.getCurrentUser();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/shops"
            element={
              <PrivateRoute>
                <ShopList />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-shop"
            element={
              <PrivateRoute>
                <CreateShop />
              </PrivateRoute>
            }
          />
          <Route
            path="/shop/:id/edit"
            element={
              <PrivateRoute>
                <EditShop />
              </PrivateRoute>
            }
          />
          <Route
            path="/book/:shopId"
            element={
              <PrivateRoute>
                <CreateBooking />
              </PrivateRoute>
            }
          />
          <Route
            path="/shop/:shopId/bookings"
            element={
              <PrivateRoute>
                <ShopBookings />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <PrivateRoute>
                <MyBookings />
              </PrivateRoute>
            }
          />
          <Route
            path="/shop/:shopId/barbers"
            element={
              <PrivateRoute>
                <ManageBarbers />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
