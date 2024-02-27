import { Button } from 'antd'

export const SaveButton = ({ displayText, loading }: { displayText: string; loading: boolean }) => {
  return (
    <Button loading={loading} className='bg-blue-500' type='primary' htmlType='submit'>
      {displayText}
    </Button>
  )
}
