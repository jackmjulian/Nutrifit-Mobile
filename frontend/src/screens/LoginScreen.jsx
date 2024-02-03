import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { FaArrowRight } from 'react-icons/fa';
// import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const LoginScreen = () => {
  // Set the state for the email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get dispatch and navigate functions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use the login mutation from the usersApiSlice
  const [login, { isLoading }] = useLoginMutation();

  // return the auth state from userInfo in the redux store
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  // search the params in the URL
  const sp = new URLSearchParams(search);
  // get the redirect param from the URL
  const redirect = sp.get('redirect') || '/dashboard';

  // Use Effect Here
  useEffect(() => {
    if (userInfo) {
      // if there is userInfo, redirect to the redirect param
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  // Submit handler for the form
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // login coming from usersApiSlice
      // email and password come from the form
      const res = await login({ email, password }).unwrap();
      // dispatch the setCredentials action with the user data
      dispatch(setCredentials({ ...res }));
      // redirect to the redirect param
      navigate(redirect);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.data?.message || error?.error,
      });
      console.log(error);
    }
  };

  return (
    <FormContainer className='dark-theme'>
      <h1 className='mt-2'>Welcome Back</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='mt-4'>
          <Form.Control
            className='form-group-sign'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='mt-4'>
          {/* onChange is used to update the state as the user types */}
          <Form.Control
            className='form-group-sign'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type='submit'
          variant='success'
          className='mt-4 sign-in-btn d-flex align-items-center justify-content-between'
          disabled={isLoading || !email || !password}
        >
          Sign In
          <FaArrowRight className='bg-none' />
        </Button>
        {/* if isLoading = true, show loader */}
        {isLoading && <Loader />}
      </Form>
      <Row className='mt-3'>
        <Col className='text-end mx-1'>
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className='text-decoration-none bg-none text-white'
          >
            New Customer?
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default LoginScreen;
