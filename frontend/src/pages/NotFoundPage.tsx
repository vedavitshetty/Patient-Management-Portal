import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className='text-blue-500' to='/dashboard'>
        Go to Dashboard
      </Link>
    </div>
  )
}
