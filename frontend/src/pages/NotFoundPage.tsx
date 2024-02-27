import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage = ({isEditPatient} : {isEditPatient?: boolean}) => {
  return (
    <div>
      <h1>404 - {isEditPatient ? 'Patient' : ''} Not Found</h1>
      <p>The {isEditPatient ? 'patient' : 'page'} you are looking for does not exist.</p>
      <Link className='text-blue-500' to='/dashboard'>
        Go to Dashboard
      </Link>
      <br/>
      <Link className='text-blue-500' to='/patient/new'>
        Create a new patient
      </Link>
    </div>
  )
}
