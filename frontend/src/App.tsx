import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; 
import DashboardPage from './pages/DashboardPage';
import { useAppSelector } from './redux/store';

function App() {
  const isAuthenticated = useAppSelector(state => state.user.user !== null);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
