import React, { useCallback, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAppSelector, useAppThunkDispatch } from '../redux/store'
import { formatDateOfBirth } from '../utils/textHelpers'
import { fetchCurrentPatient } from '../redux/patientsSlice'
import { NotFoundPage } from './NotFoundPage'

export const PatientDetailsPage: React.FC = () => {
  const dispatch = useAppThunkDispatch()
  const memoizedDispatch = useCallback(dispatch, [dispatch])

  const { id } = useParams<{ id?: string }>() // Add a question mark to make id optional
  const patient = useAppSelector(state => state.patients.currentPatient)

  useEffect(() => {
    if (id) {
      memoizedDispatch(fetchCurrentPatient(Number(id)))
    }
  }, [id, memoizedDispatch])

  if (!patient.id) {
    // Handle patient not found
    return <NotFoundPage isFetchingPatient={true} />
  }

  return (
    <div className='container mx-auto p-4'>
      <Link to={`/dashboard`} className='text-blue-500'>Go to Dashboard</Link>
      <div className='flex items-center gap-4 my-4'>
        <h2 className='text-3xl font-semibold'>Patient Details</h2>
        <div>
          <Link to={`/patient/${patient.id}/edit`} className='text-blue-500'>Edit</Link>
        </div>
      </div>
      <div className='mb-4'>
        <h3 className='text-2xl font-semibold mb-2'>Personal Information</h3>
        <p>First Name: {patient.firstName}</p>
        <p>Middle Name: {patient.middleName}</p>
        <p>Last Name: {patient.lastName}</p>
        <p>
          Date of Birth:{' '}
          {patient.dateOfBirth ? formatDateOfBirth(patient.dateOfBirth) : 'Not Provided'}
        </p>
        <p>Status: {patient.status}</p>
        <p>Primary City: {patient.primaryCity}</p>
        <p>Primary State: {patient.primaryState}</p>
      </div>

      <div className='mb-4'>
        <h3 className='text-2xl font-semibold mb-2'>Addresses</h3>
        {patient?.addresses.length > 0 ? (
          <ul>
            {patient.addresses.map((address, index) => (
              <li key={index}>
                <div className='mb-2'>
                  <strong>Address {index + 1}:</strong>
                  <p>Address Line 1: {address.addressLine1}</p>
                  <p>Address Line 2: {address.addressLine2}</p>
                  <p>City: {address.city}</p>
                  <p>State: {address.state}</p>
                  <p>Zip Code: {address.zipCode}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>None Provided</p>
        )}
      </div>
      {patient.customData && patient.customData.length > 0 && (
        <div className='mb-4'>
          <h3 className='text-2xl font-semibold mb-2'>Custom Data</h3>
          <ul>
            {patient.customData.map((customField, index) => (
              <li key={index}>
                <p>
                  {customField.fieldName}: {customField.fieldValue}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
