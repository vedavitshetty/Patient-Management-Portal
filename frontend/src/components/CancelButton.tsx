import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export const CancelButton = ({ displayText }: { displayText: string }) => {
  const navigate = useNavigate()
  const handleCancel = () => {
    navigate('/dashboard')
  }
  return (
    <Button className='bg-red-500' onClick={handleCancel}>
      {displayText}
    </Button>
  )
}
