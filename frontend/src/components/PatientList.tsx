import React, { useState } from 'react'
import { Table, Input, Button, Popconfirm } from 'antd'
import { formatDateOfBirth } from '../utils/textHelpers'
import { Patient } from '../common/types'
import { ColumnType } from 'antd/es/table'
import { US_STATES } from '../common/constants'
import { useNavigate } from 'react-router-dom'
import { deletePatient } from '../redux/patientsSlice'
import { useAppThunkDispatch } from '../redux/store'

interface PatientListProps {
  patients: Patient[]
}

export const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  const [cityFilter, setCityFilter] = useState<string>('')
  const navigate = useNavigate()
  const dispatch = useAppThunkDispatch()

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
      render: (dateOfBirth: string) => formatDateOfBirth(dateOfBirth),
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
      onFilter: (value, record) =>
        record.status && value ? record.status.toString().indexOf(value.toString()) === 0 : false,
    },
    {
      title: 'Primary City',
      dataIndex: 'primaryCity',
      key: 'primaryCity',
      filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder='Search city'
            value={cityFilter}
            onChange={e => {
              setCityFilter(e.target.value)
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            onClick={() => {
              // Add onClick event to the Reset button
              setCityFilter('') // Clear the city filter
              clearFilters && clearFilters() // Clear the filters
            }}
          >
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => {
        if (!cityFilter && !Object.keys(record).some(key => !!record[key as keyof Patient])) {
          return !record.primaryCity // Show records without a city only if the city filter is empty and no other filters are active
        }
        if (!record.primaryCity) {
          return false // Hide records without a city
        }
        return record.primaryCity.toLowerCase().includes(cityFilter.toLowerCase())
      },
    },
    {
      title: 'Primary State',
      dataIndex: 'primaryState',
      key: 'primaryState',
      filters: US_STATES.map(state => ({ text: state, value: state })),
      onFilter: (value, record) => record.primaryState === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button
            type='link'
            onClick={e => {
              e.stopPropagation()
              navigate(`/patient/${record.id}/edit/`)
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title='Are you sure to delete this patient?'
            onConfirm={e => {
              e?.stopPropagation()
              dispatch(deletePatient(record.id))
            }}
            onCancel={e => e?.stopPropagation()}
            okText='Yes'
            cancelText='No'
          >
            <Button type='link' onClick={e => e.stopPropagation()}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ]

  const onRowClick = (record: Patient) => {
    return {
      onClick: () => {
        navigate(`/patient/${record.id}`)
      },
      className: 'cursor-pointer',
    }
  }

  return (
    <div className='min-w-full'>
      <Table
        dataSource={patients}
        columns={columns}
        pagination={{ defaultPageSize: 5 }}
        onRow={onRowClick}
        rowKey='id'
      />
    </div>
  )
}
