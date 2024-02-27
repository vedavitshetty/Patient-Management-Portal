import React from 'react'
import { DatePicker, Input } from 'antd'
import moment from 'moment'

interface PatientFilterProps {
  onSearch: (value: string) => void
  onStartDateChange: (date: moment.Moment | null) => void
  onEndDateChange: (date: moment.Moment | null) => void
  searchTerm: string
  startDate: moment.Moment | null
  endDate: moment.Moment | null
}

export const PatientFilter: React.FC<PatientFilterProps> = ({
  onSearch,
  onStartDateChange,
  onEndDateChange,
  searchTerm,
  startDate,
  endDate,
}) => {
  return (
    <div>
      <div className='mb-4'>
        <label htmlFor='searchInput' className='block mb-2'>
          Search patients by name:
        </label>
        <Input
          id='searchInput'
          placeholder='Please enter first or last name'
          value={searchTerm}
          onChange={e => onSearch(e.target.value)}
        />
      </div>
      <div className='mb-4 flex'>
        <label htmlFor='startDate' className='block mr-2'>
          Start Date:
        </label>
        <DatePicker
          id='startDate'
          placeholder='MM/DD/YYYY'
          format='MM/DD/YYYY'
          value={startDate}
          onChange={onStartDateChange}
          className='px-4 py-2 border rounded mr-4'
        />
        <label htmlFor='endDate' className='block mr-2'>
          End Date:
        </label>
        <DatePicker
          id='endDate'
          placeholder='MM/DD/YYYY'
          format='MM/DD/YYYY'
          value={endDate}
          onChange={onEndDateChange}
          className='px-4 py-2 border rounded mr-4'
        />
      </div>
    </div>
  )
}
