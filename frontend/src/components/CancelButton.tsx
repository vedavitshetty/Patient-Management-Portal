import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const CancelButton = ({ displayText }: { displayText: string }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (window.history.length > 1) {
      window.history.back(); // Go back one step in history
    } else {
      navigate('/dashboard'); // Redirect to dashboard if there is no back history
    }
  };

  return (
    <Button className='bg-red-500' onClick={handleCancel}>
      {displayText}
    </Button>
  );
};
