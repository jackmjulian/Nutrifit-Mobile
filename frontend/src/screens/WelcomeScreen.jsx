import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Background from '../assets/images/main-screen-max.jpg';
import Logo from '../assets/images/logo-welcome-screen.svg';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const WelcomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [userInfo, navigate]);

  const backgroundStyle = {
    backgroundImage: `url(https://res.cloudinary.com/dk4pzv3xg/image/upload/v1709990482/nutrifitmobile/rv9cjeh57ncqafwkn31v.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    margin: 0,
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const logoStyle = {
    background: 'none', // Set background to 'none'
    paddingTop: '8vh', // Set padding-top to '10vh'
    width: '60%',
  };

  return (
    <>
      <div style={backgroundStyle}>
        <img src={Logo} alt='logo' style={logoStyle} />
        {/* <Footer  /> */}
        <Container className='bg-none d-flex justify-content-evenly mb-5'>
          <Link to='/login' className='text-decoration-none bg-none text-white'>
            <h1 className='bg-none'>Sign In</h1>
          </Link>
          <h1 className='bg-none'>|</h1>
          <Link
            to='/register'
            className='text-decoration-none bg-none text-white'
          >
            <h1 className='bg-none'>Sign Up</h1>
          </Link>
        </Container>
      </div>
    </>
  );
};
export default WelcomeScreen;
