import React from 'react'
import { Form, Input, Button, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Patient } from '../common/types'
import { US_STATES } from '../common/constants'
import { SaveButton } from './SaveButton'

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
      <Form.Item label='First Name' name='firstName'>
        <Input />
      </Form.Item>
      <Form.Item label='Middle Name' name='middleName'>
        <Input />
      </Form.Item>
      <Form.Item label='Last Name' name='lastName'>
        <Input />
      </Form.Item>
      <Form.Item label='Date of Birth' name='dateOfBirth'>
        <Input type='date' />
      </Form.Item>
      <Form.Item label='Status' name='status'>
        <Select>
          <Option value='INQUIRY'>Inquiry</Option>
          <Option value='ONBOARDING'>Onboarding</Option>
          <Option value='ACTIVE'>Active</Option>
          <Option value='CHURNED'>Churned</Option>
        </Select>
      </Form.Item>

      {/* Dynamic Addresses */}
      <Form.List name='addresses'>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Form.Item key={key} {...restField}>
                <Input.Group compact>
                  <Form.Item name={[name, 'addressLine1']} noStyle>
                    <Input placeholder='Address Line 1' />
                  </Form.Item>
                  <Form.Item name={[name, 'addressLine2']} noStyle>
                    <Input placeholder='Address Line 2' />
                  </Form.Item>
                  <Form.Item name={[name, 'city']} noStyle>
                    <Input placeholder='City' />
                  </Form.Item>
                  <Form.Item name={[name, 'state']} noStyle>
                    <Select showSearch optionFilterProp='children' placeholder='State'>
                      {US_STATES.map(state => (
                        <Option key={state} value={state}>
                          {state}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name={[name, 'zipCode']} noStyle>
                    <Input placeholder='Zip Code' />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Input.Group>
              </Form.Item>
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
              <Form.Item key={key} {...restField}>
                <Input.Group compact>
                  <Form.Item name={[name, 'fieldName']} noStyle>
                    <Input placeholder='Field Name' />
                  </Form.Item>
                  <Form.Item name={[name, 'fieldType']} noStyle>
                    <Select placeholder='Field Type'>
                      <Option value='TEXT'>Text</Option>
                      <Option value='NUMBER'>Number</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name={[name, 'fieldValue']} noStyle>
                    <Input placeholder='Field Value' />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Input.Group>
              </Form.Item>
            ))}
            <Form.Item>
              <Button type='dashed' onClick={() => add()} icon={<PlusOutlined />}>
                Add Custom Data
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      {/* Submit Button */}
      <Form.Item>
        <SaveButton displayText='Save Patient' />
      </Form.Item>
    </Form>
  )
}
