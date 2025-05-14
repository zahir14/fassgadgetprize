import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Customer Pages
import HomePage from './pages/customer/HomePage';
import PrizeCheckPage from './pages/customer/PrizeCheckPage';
import PrizeResultPage from './pages/customer/PrizeResultPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import SerialNumbersPage from './pages/admin/SerialNumbersPage';
import PrizeManagementPage from './pages/admin/PrizeManagementPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/check-prize" element={<PrizeCheckPage />} />
          <Route path="/prize-result/:serialNumber" element={<PrizeResultPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/serial-numbers" 
            element={
              <ProtectedRoute>
                <SerialNumbersPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/prize-management" 
            element={
              <ProtectedRoute>
                <PrizeManagementPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;