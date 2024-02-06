import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/images/logo-header-white.svg';
import { IoIosArrowBack } from 'react-icons/io';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // get the current location

  // console.log(location.pathname);
  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className='position-relative'>
      {/* if location doesn't equal /dashboard then render the back button */}
      {location.pathname !== '/dashboard' && (
        <IoIosArrowBack
          style={{
            fontSize: '24px',
            position: 'absolute',
            top: '50%',
            left: '5%',
            transform: 'translateY(-50%)',
          }}
          onClick={goBack}
        />
      )}
      <img src={Logo} alt='logo' className='logo-header mt-4' />
    </div>
  );
};

export default Header;
