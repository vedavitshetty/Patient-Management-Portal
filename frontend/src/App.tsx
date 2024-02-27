import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAppSelector } from './redux/store';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { PatientDetailsPage } from './pages/PatientDetailsPage';
import { EditPatientPage } from './pages/EditPatientPage';
import { NewPatientPage } from './pages/NewPatientPage';
import { NotFoundPage } from './pages/NotFoundPage';

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
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <Navigate to="/dashboard" />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <PrivateRoute />
              <DashboardPage />
            </>
          }
        />
        <Route path="/patient/:id" element={<PatientDetailsPage />} />
        <Route path="/patient/:id/edit" element={<EditPatientPage />} />
        <Route path="/patient/new" element={<NewPatientPage />} />
        {/* Add a Route for unmatched paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
