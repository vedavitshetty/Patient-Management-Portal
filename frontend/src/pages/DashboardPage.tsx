import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppThunkDispatch, useAppSelector } from '../redux/store';
import { fetchAllPatients } from '../redux/patientsSlice';
import { formatDateOfBirth, getUTCDate } from '../utils/textHelpers';

const DashboardPage: React.FC = () => {
  const dispatch = useAppThunkDispatch();

  const memoizedDispatch = useCallback(dispatch, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const patients = useAppSelector((state) => state.patients.patients);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const filteredPatients = patients.filter((patient) => {
    const patientDOB = patient.dateOfBirth ? new Date(patient.dateOfBirth) : null;
    const startUTC = getUTCDate(startDate);
    const endUTC = getUTCDate(endDate);

    return (
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!startUTC || (patientDOB && patientDOB >= startUTC)) &&
      (!endUTC || (patientDOB && patientDOB <= endUTC))
    );
  });
  

  useEffect(() => {
    memoizedDispatch(fetchAllPatients());
  }, [memoizedDispatch]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4">Dashboard</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search patients by first name or last name"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border rounded w-full"
        />
      </div>
      <div className="mb-4 flex">
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="MM/dd/yyyy"
          placeholderText="Start Date"
          className="px-4 py-2 border rounded mr-4"
        />
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="MM/dd/yyyy"
          placeholderText="End Date"
          className="px-4 py-2 border rounded"
        />
      </div>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Date of Birth</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id} onClick={() => window.open(`/patient/${patient.id}`, '_blank')} className="cursor-pointer">
              <td className="border px-4 py-2">
                {patient.firstName}
              </td>
              <td className="border px-4 py-2">{patient.lastName}</td>
              <td className="border px-4 py-2">{patient.dateOfBirth ? formatDateOfBirth(patient.dateOfBirth) : 'Not Provided'}</td>
              <td className="border px-4 py-2">{patient.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;
