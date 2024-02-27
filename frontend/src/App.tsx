import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useAppSelector, useAppThunkDispatch } from './redux/store'
import Header from './components/Header' // Import the Header component
import { LoginPage } from './pages/LoginPage'
import { PatientDashboardPage } from './pages/PatientDashboardPage'
import { PatientDetailsPage } from './pages/PatientDetailsPage'
import { EditPatientPage } from './pages/EditPatientPage'
import { NewPatientPage } from './pages/NewPatientPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { loginUser } from './redux/userSlice'
import { Spin } from 'antd'

function PrivateRoute({ element }: { element: React.ReactNode }) {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  return <>{element}</>
}

function useIsAuthenticated() {
  const user = useAppSelector(state => state.user.user)
  return user !== null && Object.keys(user).length !== 0
}

function App() {
  const [loading, setLoading] = useState(true)
  const isAuthenticated = useIsAuthenticated()
  const dispatch = useAppThunkDispatch()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      const loginData = { token: storedToken }
      dispatch(loginUser(loginData))
        .then(() => setLoading(false)) // Set loading to false once authentication is complete
        .catch(() => setLoading(false)) // Set loading to false even if authentication fails
    } else {
      setLoading(false) // If no stored token, set loading to false immediately
    }
  }, [dispatch])

  if (loading) {
    // Show loading indicator while authentication is in progress
    return <div><Spin/></div>
  }

  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route path='/dashboard' element={<PrivateRoute element={<PatientDashboardPage />} />} />
        <Route path='/patient/:id' element={<PrivateRoute element={<PatientDetailsPage />} />} />
        <Route path='/patient/:id/edit' element={<PrivateRoute element={<EditPatientPage />} />} />
        <Route path='/patient/new' element={<PrivateRoute element={<NewPatientPage />} />} />
        {/* Add a Route for unmatched paths */}
        <Route path='*' element={<PrivateRoute element={<NotFoundPage />} />} />
      </Routes>
    </Router>
  )
}

export default App
