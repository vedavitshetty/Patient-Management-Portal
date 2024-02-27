import React, { useEffect, useState, useMemo } from 'react'
import { useAppThunkDispatch, useAppSelector } from '../redux/store'
import { fetchAllPatients } from '../redux/patientsSlice'
import { getUTCDate } from '../utils/textHelpers'
import moment from 'moment'
import { PatientFilter } from '../components/PatientFilter'
import { PatientList } from '../components/PatientList'
import { useNavigate } from 'react-router-dom'
import { Switch } from 'antd'

export const PatientDashboardPage: React.FC = () => {
  const dispatch = useAppThunkDispatch()
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [startDate, setStartDate] = useState<moment.Moment | null>(null)
  const [endDate, setEndDate] = useState<moment.Moment | null>(null)
  const [showChurned, setShowChurned] = useState(false) // State for toggling between churned and non-churned patients

  const nonChurnedPatients = useAppSelector(state => state.patients.nonChurnedPatients)
  const churnedPatients = useAppSelector(state => state.patients.churnedPatients)

  // Select the appropriate list of patients based on the toggle
  const patients = showChurned ? churnedPatients : nonChurnedPatients

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleStartDateChange = (date: moment.Moment | null) => {
    setStartDate(date || null)
  }

  const handleEndDateChange = (date: moment.Moment | null) => {
    setEndDate(date || null)
  }

  const filteredPatients = useMemo(
    () =>
      patients?.filter(patient => {
        const patientDOB = patient.dateOfBirth ? new Date(patient.dateOfBirth) : null
        const startUTC = getUTCDate(startDate)
        const endUTC = getUTCDate(endDate)

        return (
          `${patient.firstName} ${patient.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) &&
          (!startUTC || (patientDOB && patientDOB >= startUTC)) &&
          (!endUTC || (patientDOB && patientDOB <= endUTC))
        )
      }),
    [patients, searchTerm, startDate, endDate],
  )

  useEffect(() => {
    dispatch(fetchAllPatients())
  }, [dispatch])

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-3xl font-semibold mb-4'>Patient Dashboard</h2>
      <button
        className='mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => navigate('/patient/new')}
      >
        Create Patient
      </button>
      <PatientFilter
        onSearch={handleSearch}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        searchTerm={searchTerm}
        startDate={startDate}
        endDate={endDate}
      />
      <Switch
        style={{ backgroundColor: showChurned ? 'red' : 'green', marginBottom: '1rem'}}
        checked={showChurned}
        checkedChildren={'Show Churned Patients'}
        unCheckedChildren={'Show Non-Churned Patients'}
        onChange={e => setShowChurned(!showChurned)}
      />
      <PatientList patients={filteredPatients} showChurned={showChurned} />
    </div>
  )
}
