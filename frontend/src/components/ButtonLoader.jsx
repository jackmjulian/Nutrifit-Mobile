import { Spinner } from 'react-bootstrap';

const ButtonLoader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      className='spinner-border-sm' // Apply Bootstrap's small spinner class
      style={{
        marginRight: '5px', // Add some space to the right of the spinner
      }}
    />
  );
};

export default ButtonLoader;
