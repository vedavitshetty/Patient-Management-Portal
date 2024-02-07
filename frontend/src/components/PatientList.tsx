import React from 'react';
import { Table } from 'antd';
import { formatDateOfBirth } from '../utils/textHelpers';
import { Patient } from '../common/types';
import { ColumnType } from 'antd/es/table';

interface PatientListProps {
  patients: Patient[];
}

const PatientList: React.FC<PatientListProps> = ({ patients }) => {

  const columns: ColumnType<Patient>[] = [
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
      render: (dateOfBirth: string) => formatDateOfBirth(dateOfBirth)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [ 
        { text: 'INQUIRY', value: 'INQUIRY' },
        { text: 'ONBOARDING', value: 'ONBOARDING' },
        { text: 'ACTIVE', value: 'ACTIVE' },
        { text: 'CHURNED', value: 'CHURNED' },
      ],
      onFilter: (value, record) => (record.status && value ? record.status.toString().indexOf(value.toString()) === 0 : false),
    },
  ];

  return (
    <div className="min-w-full">
      <Table dataSource={patients} columns={columns} pagination={{ defaultPageSize: 5 }} />
    </div>
  );
};

export default PatientList;
