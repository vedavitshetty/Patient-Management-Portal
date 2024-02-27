import React, { useState } from 'react'
import { UnauthenticatedFormType } from '../common/types'
import { createUser } from '../redux/userSlice'
import { useAppThunkDispatch } from '../redux/store'
import { useNavigate } from 'react-router-dom'

export const CreateAccountForm = ({
  setFormType,
}: {
  setFormType: (formType: UnauthenticatedFormType) => void
}) => {
  const dispatch = useAppThunkDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState<string | null>(null); // State to store error message

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // Check if any field is empty
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        setError('All fields are required.');
        return;
      }
    }
    dispatch(createUser(formData)).then(response => {
      // Check if the response indicates successful account creation
      if (response.meta.requestStatus === 'fulfilled') {
        // Navigate to the dashboard upon successful account creation
        navigate('/dashboard')
      }
    }).catch(error => {
      // Handle other errors, such as network errors
      setError('An error occurred. Please try again later.');
    });
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full bg-white p-8 rounded shadow-md'>
        <div className='text-2xl font-extrabold text-gray-900 text-center'>Create Account</div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm">{error}</div>} {/* Display error message */}
          <div>
            <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
              Username
            </label>
            <input
              id='username'
              name='username'
              type='text'
              autoComplete='username'
              required
              className='mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Username'
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email address
            </label>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              className='mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Email address'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='new-password'
              required
              className='mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
              Confirm Password
            </label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              autoComplete='new-password'
              required
              className='mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Create Account
            </button>
          </div>
          <div className='text-center'>
            <button
              type='button'
              className='text-indigo-600 hover:underline'
              onClick={() => setFormType('login')}
            >
              Already have an account? Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
