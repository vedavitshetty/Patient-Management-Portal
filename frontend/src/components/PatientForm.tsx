import React from 'react'
import { Form, Input, Button, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Patient } from '../common/types'
import { US_STATES } from '../common/constants'
import { SaveButton } from './SaveButton'
import { CancelButton } from './CancelButton'
import { useAppSelector } from '../redux/store'

interface PatientFormProps {
  initialValues?: Patient
  onSubmit: (data: Patient) => void
}

const { Option } = Select

export const PatientForm: React.FC<PatientFormProps> = ({
  initialValues = {
    id: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    status: 'INQUIRY',
    addresses: [],
    customData: [],
  },
  onSubmit,
}) => {
  const createLoading = useAppSelector(state => state.patients.loading.createPatient)
  const updateLoading = useAppSelector(state => state.patients.loading.updatePatient)

  const onFinish = (values: Patient) => {
    onSubmit(values)
  }

  return (
    <Form
      name='patientForm'
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete='off'
      className='border p-4 rounded-md bg-gray-100 w-96 mx-auto'
    >
      <div className='text-center text-black pb-4'>
        {initialValues?.id === 0 ? 'Create Patient' : 'Edit Patient'}
      </div>
      {/* Personal Information */}
      <Form.Item name='id' hidden>
        <Input />
      </Form.Item>
      <Form.Item
        label='First Name'
        name='firstName'
        rules={[{ required: true, message: 'Please input the first name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label='Middle Name' name='middleName'>
        <Input />
      </Form.Item>
      <Form.Item
        label='Last Name'
        name='lastName'
        rules={[{ required: true, message: 'Please input the last name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Date of Birth'
        name='dateOfBirth'
        rules={[
          {
            type: 'date',
            required: true,
            message: 'Date has wrong format. Use one of these formats instead: YYYY-MM-DD.',
          },
        ]}
      >
        <Input type='date' />
      </Form.Item>
      <Form.Item
        label='Status'
        name='status'
        rules={[{ required: true, message: 'Please input the status!' }]}
      >
        <Select>
          <Option value='INQUIRY'>Inquiry</Option>
          <Option value='ONBOARDING'>Onboarding</Option>
          <Option value='ACTIVE'>Active</Option>
          <Option value='CHURNED'>Churned</Option>
        </Select>
      </Form.Item>
      <Form.Item label='Primary City' name='primaryCity'>
        <Input />
      </Form.Item>
      <Form.Item label='Primary State' name='primaryState'>
        <Select showSearch>
          {US_STATES.map(state => (
            <Option key={state} value={state}>
              {state}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {/* Dynamic Addresses */}
      <Form.List name='addresses'>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key}>
                <Form.Item
                  key={key}
                  {...restField}
                  name={[name, 'addressLine1']}
                  label='Address Line 1'
                  rules={[{ required: true, message: 'Please input address line 1!' }]}
                >
                  <Input placeholder='Address Line 1' />
                </Form.Item>
                <Form.Item {...restField} name={[name, 'addressLine2']} label='Address Line 2'>
                  <Input placeholder='Address Line 2' />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'city']}
                  label='City'
                  rules={[{ required: true, message: 'Please input city!' }]}
                >
                  <Input placeholder='City' />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'state']}
                  label='State'
                  rules={[{ required: true, message: 'Please select state!' }]}
                >
                  <Select showSearch>
                    {US_STATES.map(state => (
                      <Option key={state} value={state}>
                        {state}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'zipCode']}
                  label='Zip Code'
                  rules={[{ required: true, message: 'Please input zip code!' }]}
                >
                  <Input placeholder='Zip Code' />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </div>
            ))}
            <Form.Item>
              <Button type='dashed' onClick={() => add()} icon={<PlusOutlined />}>
                Add Address
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      {/* Dynamic Custom Data */}
      <Form.List name='customData'>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key}>
                <Form.Item
                  key={key}
                  {...restField}
                  name={[name, 'fieldName']}
                  label='Field Name'
                  rules={[{ required: true, message: 'Please input field name!' }]}
                >
                  <Input placeholder='Field Name' />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'fieldType']}
                  label='Field Type'
                  rules={[{ required: true, message: 'Please select field type!' }]}
                >
                  <Select placeholder='Field Type'>
                    <Option value='TEXT'>Text</Option>
                    <Option value='NUMBER'>Number</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'fieldValue']}
                  label='Field Value'
                  rules={[{ required: true, message: 'Please input field value!' }]}
                >
                  <Input placeholder='Field Value' />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </div>
            ))}
            <Form.Item>
              <Button type='dashed' onClick={() => add()} icon={<PlusOutlined />}>
                Add Custom Data
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <div className='flex justify-between'>
          <CancelButton displayText='Cancel' />
          <SaveButton displayText='Save Patient' loading={createLoading || updateLoading} />
        </div>
      </Form.Item>
    </Form>
  )
}
