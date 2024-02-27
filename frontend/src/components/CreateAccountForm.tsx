import React from 'react'
import { UnauthenticatedFormType } from '../common/types'

export const CreateAccountForm = ({
  setFormType,
}: {
  setFormType: (formType: UnauthenticatedFormType) => void
}) => {
  return (
    <div>
      <h2 className='text-3xl font-extrabold text-gray-900 text-center'>Create Account</h2>
      <form className='mt-6 space-y-4'>
        <div>
          <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>
            First Name
          </label>
          <input
            id='firstName'
            name='firstName'
            type='text'
            autoComplete='given-name'
            required
            className='mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='First Name'
          />
        </div>
        <div>
          <label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>
            Last Name
          </label>
          <input
            id='lastName'
            name='lastName'
            type='text'
            autoComplete='family-name'
            required
            className='mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='Last Name'
          />
        </div>
        <div>
          <label htmlFor='newUsername' className='block text-sm font-medium text-gray-700'>
            Username
          </label>
          <input
            id='newUsername'
            name='newUsername'
            type='text'
            autoComplete='username'
            required
            className='mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='New Username'
          />
        </div>
        <div>
          <label htmlFor='newPassword' className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <input
            id='newPassword'
            name='newPassword'
            type='password'
            autoComplete='new-password'
            required
            className='mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='New Password'
          />
        </div>
        <div>
          <button
            type='submit'
            className='w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Create Account
          </button>
        </div>
        <div>
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
  )
}
