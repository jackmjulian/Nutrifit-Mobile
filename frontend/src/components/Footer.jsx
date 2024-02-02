import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerStyle = {
    paddingBottom: '4vh',
    color: 'white',
  };

  const linkStyle = {
    background: 'none', // Set background to 'none'
    textDecoration: 'none', // Remove default link styling
  };

  return (
    <footer style={footerStyle} className='bg-none'>
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
