import React, { useState } from 'react'
import { UnauthenticatedFormType } from '../common/types'
import { loginUser } from '../redux/userSlice'
import { useAppThunkDispatch } from '../redux/store'

export const LoginForm = ({
  setFormType,
}: {
  setFormType: (formType: UnauthenticatedFormType) => void
}) => {
  const dispatch = useAppThunkDispatch()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    dispatch(loginUser(formData))
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full bg-white p-8 rounded shadow-md'>
        <div className='text-2xl font-extrabold text-gray-900 text-center'>Log In</div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
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
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              required
              className='mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Log In
            </button>
          </div>
          <div className='text-center'>
            <button
              type='button'
              className='text-indigo-600 hover:underline'
              onClick={() => setFormType('forgotPassword')}
            >
              Forgot your password?
            </button>
            <span className='mx-2 text-sm text-gray-500'>•</span>
            <button
              type='button'
              className='text-indigo-600 hover:underline'
              onClick={() => setFormType('createAccount')}
            >
              Create an account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
