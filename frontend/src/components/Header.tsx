import React from 'react'
import { Button } from 'antd'
import { useAppThunkDispatch } from '../redux/store'
import { logoutUser } from '../redux/userSlice'

interface HeaderProps {
  onLogout?: () => void
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const dispatch = useAppThunkDispatch()

  return (
    <div className='flex justify-end mt-2 mr-2'>
      <Button className='bg-yellow-500 ' onClick={() => dispatch(logoutUser())}>
        Logout
      </Button>
    </div>
  )
}

export default Header
