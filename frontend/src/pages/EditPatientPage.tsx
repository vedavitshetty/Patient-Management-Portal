import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCurrentPatient, updatePatient } from '../redux/patientsSlice'
import { Patient } from '../common/types'
import { useAppThunkDispatch } from '../redux/store'
import { PatientForm } from '../components/PatientForm'
import { NotFoundPage } from './NotFoundPage'

export const EditPatientPage = () => {
  const { id } = useParams()
  const dispatch = useAppThunkDispatch()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [patient, setPatient] = useState<Patient | null>(null) // Changed to null

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentPatient(Number(id))).then((resultAction: any) => {
        const fetchedPatient = resultAction.payload
        setPatient(fetchedPatient)
        setLoading(false)
      })
    }
  }, [dispatch, id])

  const handleSubmit = async (patientData: Patient) => {
    const resultAction = await dispatch(updatePatient(patientData))
    if (updatePatient.fulfilled.match(resultAction)) {
      navigate(`/patient/${id}`)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  // Render the PatientForm if patient exists, else display message
  return patient ? (
    <PatientForm initialValues={patient} onSubmit={handleSubmit} />
  ) : (
    <NotFoundPage isFetchingPatient={true} />
  )
}
