import { Button } from 'antd'

export const SaveButton = ({ displayText }: { displayText: string }) => {
  return (
    <Button className='bg-blue-500' type='primary' htmlType='submit'>
      {displayText}
    </Button>
  )
}
