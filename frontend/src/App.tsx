import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; 
import DashboardPage from './pages/DashboardPage';
import PatientDetailsPage from './pages/PatientDetailsPage';
import { useAppSelector } from './redux/store';
import { EditPatientPage } from './pages/EditPatientPage';
import NewPatientPage from './pages/NewPatientPage';

function PrivateRoute() {
  const isAuthenticated = useAppSelector(state => state.user.user !== null);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return null;
}

function App() {
  const isAuthenticated = useAppSelector(state => state.user.user !== null);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
          }
        />
        <Route
          path="/"
          element={
            <>
              <PrivateRoute />
              <Outlet />
            </>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/patient/:id" element={<PatientDetailsPage />} />
          <Route path="/patient/:id/edit" element={<EditPatientPage />} />
          <Route path="/patient/new" element={<NewPatientPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
