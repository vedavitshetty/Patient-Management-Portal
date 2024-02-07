import React, { useCallback, useEffect, useState } from 'react';
import { DatePicker, Input, Select } from 'antd';
import moment from 'moment';
import { useAppThunkDispatch, useAppSelector } from '../redux/store';
import { fetchAllPatients } from '../redux/patientsSlice';
import { formatDateOfBirth, getUTCDate } from '../utils/textHelpers';

const { Option } = Select;

const DashboardPage: React.FC = () => {
  const dispatch = useAppThunkDispatch();

  const memoizedDispatch = useCallback(dispatch, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');

  const patients = useAppSelector((state) => state.patients.patients);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleStartDateChange = (date: moment.Moment | null) => {
    setStartDate(date?.toDate() || null);
  };

  const handleEndDateChange = (date: moment.Moment | null) => {
    setEndDate(date?.toDate() || null);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const filteredPatients = patients.filter((patient) => {
    const patientDOB = patient.dateOfBirth ? new Date(patient.dateOfBirth) : null;
    const startUTC = getUTCDate(startDate);
    const endUTC = getUTCDate(endDate);

    return (
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!startUTC || (patientDOB && patientDOB >= startUTC)) &&
      (!endUTC || (patientDOB && patientDOB <= endUTC)) &&
      (!statusFilter || patient.status.toLowerCase() === statusFilter.toLowerCase())
    );
  });

  useEffect(() => {
    memoizedDispatch(fetchAllPatients());
  }, [memoizedDispatch]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4">Patient Dashboard</h2>
      <div className="mb-4">
        <label htmlFor="searchInput" className="block mb-2">Search patients by name:</label>
        <Input
          id="searchInput"
          placeholder="Please enter first or last name"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="mb-4 flex">
        <label htmlFor="startDate" className="block mr-2">Start Date:</label>
        <DatePicker
          id="startDate"
          placeholder="MM/DD/YYYY"
          format="MM/DD/YYYY"
          value={startDate ? moment(startDate) : null}
          onChange={handleStartDateChange}
          className="px-4 py-2 border rounded mr-4"
        />
        <label htmlFor="endDate" className="block mr-2">End Date:</label>
        <DatePicker
          id="endDate"
          placeholder="MM/DD/YYYY"
          format="MM/DD/YYYY"
          value={endDate ? moment(endDate) : null}
          onChange={handleEndDateChange}
          className="px-4 py-2 border rounded mr-4"
        />
        <label htmlFor="statusFilter" className="block mr-2">Status:</label>
        <Select
          id="statusFilter"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="px-4 py-2 border rounded min-w-40"
        >
          <Option value="">ALL</Option>
          <Option value="INQUIRY">INQUIRY</Option>
          <Option value="ONBOARDING">ONBOARDING</Option>
          <Option value="ACTIVE">ACTIVE</Option>
          <Option value="CHURNED">CHURNED</Option>
        </Select>
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
