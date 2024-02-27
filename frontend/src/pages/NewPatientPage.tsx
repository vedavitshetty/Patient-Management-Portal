import { useNavigate } from 'react-router-dom'
import { Patient } from '../common/types'
import { PatientForm } from '../components/PatientForm'
import { createPatient } from '../redux/patientsSlice'
import { useAppThunkDispatch } from '../redux/store'

export const NewPatientPage = () => {
  const dispatch = useAppThunkDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (patientData: Patient) => {
    const resultAction = await dispatch(createPatient(patientData))
    const newPatientId = resultAction.payload.id
    if (createPatient.fulfilled.match(resultAction)) {
      navigate(`/patient/${newPatientId}`)
    }
  }

  return <PatientForm onSubmit={handleSubmit} />
}
