import React, { useEffect, useState, useMemo } from 'react';
import { useAppThunkDispatch, useAppSelector } from '../redux/store';
import { fetchAllPatients } from '../redux/patientsSlice';
import { getUTCDate } from '../utils/textHelpers';
import PatientFilter from '../components/PatientFilter';
import PatientList from '../components/PatientList';
import moment from 'moment';

const DashboardPage: React.FC = () => {
  const dispatch = useAppThunkDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<moment.Moment | null>(null);
  const [endDate, setEndDate] = useState<moment.Moment | null>(null);

  const patients = useAppSelector((state) => state.patients.patients);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleStartDateChange = (date: moment.Moment | null) => {
    setStartDate(date || null);
  };

  const handleEndDateChange = (date: moment.Moment | null) => {
    setEndDate(date || null);
  };

  const filteredPatients = useMemo(() => patients.filter((patient) => {
    const patientDOB = patient.dateOfBirth ? new Date(patient.dateOfBirth) : null;
    const startUTC = getUTCDate(startDate);
    const endUTC = getUTCDate(endDate);

    return (
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!startUTC || (patientDOB && patientDOB >= startUTC)) &&
      (!endUTC || (patientDOB && patientDOB <= endUTC))

    );
  }), [patients, searchTerm, startDate, endDate]);

  useEffect(() => {
    dispatch(fetchAllPatients());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4">Patient Dashboard</h2>
      <PatientFilter
        onSearch={handleSearch}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        searchTerm={searchTerm}
        startDate={startDate}
        endDate={endDate}
      />
      <PatientList patients={filteredPatients} />
    </div>
  );
};

export default DashboardPage;
