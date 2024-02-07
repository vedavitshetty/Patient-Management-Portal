import React from 'react';
import { Table } from 'antd';
import { formatDateOfBirth } from '../utils/textHelpers';
import { Patient } from '../common/types';

interface PatientListProps {
  patients: Patient[];
}

const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dateOfBirth',
    key: 'dateOfBirth',
    render: (dateOfBirth: string) => formatDateOfBirth(dateOfBirth),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  return (
    <div className="min-w-full">
      <Table dataSource={patients} columns={columns} pagination={false} />
    </div>
  );
};

export default PatientList;
