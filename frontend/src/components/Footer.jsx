import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-none footer-link'>
      <Container className='bg-none d-flex justify-content-between '>
        <Link to='/' className='text-decoration-none bg-none text-white'>
          <h1 className='bg-none'>Sign In</h1>
        </Link>
        <Link to='/login' className='text-decoration-none bg-none text-white'>
          <h1 className='bg-none'>Sign Up</h1>
        </Link>
      </Container>
    </footer>
  );
};
export default Footer;
