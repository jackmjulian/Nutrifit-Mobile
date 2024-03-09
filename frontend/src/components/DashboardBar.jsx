import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { RxDashboard } from 'react-icons/rx';
import { IoMdLogOut } from 'react-icons/io';
import Logo from '../assets/images/logo-flavicon.svg';

const DashboardBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the logout call from useLogoutMutation, you can name this anything
  const [logoutApiCall, { isLoading }] = useLogoutMutation();

  // Get user info from the state
  const { userInfo } = useSelector((state) => state.auth);

  // TODO: Implement the logoutHandler Loader to avoid the console error when the user logs out

  const logoutHandler = async () => {
    try {
      // call the logoutApiCall and unwrap the promise
      await logoutApiCall().unwrap();
      // dispatch the logout action
      dispatch(logout());
      // navigate to the welcome page
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar variant='dark' className='dashboard-nav'>
        <Container className='d-flex justify-content-evenly mb-4'>
          <LinkContainer
            to={`/dashboard/${userInfo._id}`}
            // onClick={() => console.log('userDashboard')}
          >
            <Nav.Link>
              <RxDashboard size={30} />
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to='/dashboard'>
            <Nav className='d-flex align-items-center'>
              <img
                src={Logo}
                width='50'
                height='50'
                alt='React Bootstrap logo'
              />
            </Nav>
          </LinkContainer>
          <LinkContainer to='/logout' onClick={logoutHandler}>
            <Nav.Link>
              <IoMdLogOut size={35} />
            </Nav.Link>
          </LinkContainer>
        </Container>
      </Navbar>
    </>
  );
};

export default DashboardBar;
