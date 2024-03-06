import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FaArrowRight } from 'react-icons/fa';

const RegisterScreen = () => {
  // Set the state for the new user
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Get dispatch and navigate functions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use the register mutation from the usersApiSlice
  const [register, { isLoading }] = useRegisterMutation();

  // return the auth state from userInfo in the redux store
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  // search the params in the URL
  const sp = new URLSearchParams(search);
  // get the redirect param from the URL
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  // Submit handler for the form
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('Submit Handler');

    // Check if the passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className='mt-2'>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='mt-4'>
          <Form.Control
            className='form-group-sign bg-dark text-light'
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email' className='mt-4'>
          <Form.Control
            className='form-group-sign bg-dark text-light'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='mt-4'>
          {/* onChange is used to update the state as the user types */}
          <Form.Control
            className='form-group-sign bg-dark text-light'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword' className='mt-4'>
          {/* onChange is used to update the state as the user types */}
          <Form.Control
            className='form-group-sign bg-dark text-light'
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type='submit'
          variant='success'
          className='mt-4 sign-in-btn d-flex align-items-center justify-content-between'
          disabled={
            isLoading || !email || !password || !name || !confirmPassword
          }
        >
          Sign Up
          <FaArrowRight className='bg-none' />
        </Button>
        {/* if isLoading = true, show loader */}
        {isLoading && <Loader />}
      </Form>
      <Row className='mt-3'>
        <Col className='text-end mx-1'>
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            className='text-decoration-none bg-none text-white'
          >
            Already have an account?
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default RegisterScreen;
