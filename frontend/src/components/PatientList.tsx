import React, { useState } from 'react'
import { Table, Input, Button, Popconfirm, Tag } from 'antd'
import { formatDateOfBirth } from '../utils/textHelpers'
import { Patient } from '../common/types'
import { ColumnType } from 'antd/es/table'
import { US_STATES } from '../common/constants'
import { deletePatient } from '../redux/patientsSlice'
import { useAppThunkDispatch } from '../redux/store'
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
  TablePaginationConfig,
} from 'antd/es/table/interface'

interface PatientListProps {
  patients: Patient[]
  showChurned: boolean
}

export const PatientList: React.FC<PatientListProps> = ({ patients, showChurned }) => {
  const [cityFilter, setCityFilter] = useState<string>('')
  const dispatch = useAppThunkDispatch()

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  })

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Patient> | SorterResult<Patient>[],
    extra: TableCurrentDataSource<Patient>,
  ) => {
    setPagination(prevPagination => ({
      ...prevPagination,
      current: pagination.current || 1,
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'INQUIRY':
        return 'yellow'
      case 'ONBOARDING':
        return 'blue'
      case 'ACTIVE':
        return 'green'
      default:
        return ''
    }
  }

  const columns: ColumnType<Patient>[] = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (dateOfBirth: string) => formatDateOfBirth(dateOfBirth),
      sorter: (a, b) => new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'INQUIRY', value: 'INQUIRY' },
        { text: 'ONBOARDING', value: 'ONBOARDING' },
        { text: 'ACTIVE', value: 'ACTIVE' },
      ],
      onFilter: (value, record) =>
        record.status && value ? record.status.toString().indexOf(value.toString()) === 0 : false,
      render: (status: string) => <Tag color={getStatusColor(status)}>{status}</Tag>,
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
              setCityFilter('')
              clearFilters && clearFilters()
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
              window.open(`/patient/${record.id}/edit`, '_blank')
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
            okButtonProps={{ className: 'bg-blue-400' }}
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
        window.open(`/patient/${record.id}`, '_blank');
      },
      className: 'cursor-pointer',
    }
  }

  return (
    <div className='min-w-full'>
      <Table
        dataSource={patients}
        columns={showChurned ? columns.filter(col => col.key !== 'status') : columns}
        pagination={pagination}
        onChange={handleTableChange}
        onRow={onRowClick}
        rowKey='id'
      />
    </div>
  )
}
