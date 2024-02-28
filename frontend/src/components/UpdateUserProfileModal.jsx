import { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import ButtonLoader from './ButtonLoader';
import { useUpdateUserProfileMutation } from '../slices/usersApiSlice';
import AddItemPopUp from './AddItemPopUp';

function UpdateUserProfileModal({ show, onHide, updateUserInfo }) {
  // Get update user profile mutation
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  // Set the initial state for the form data
  const [formData, setFormData] = useState({
    // Add the fields for the user profile
    name: '',
    email: '',
    password: '',
    calorie_goal: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Log the new weight
  const handleSubmit = async (e) => {
    e.preventDefault();

    AddItemPopUp({
      title: 'Update User Profile',
      text: 'Are you sure you want to update your profile?',
      confirmCallback: async () => {
        try {
          await updateUserProfile(formData);

          // Update the user info after logging the new weight
          updateUserInfo();

          console.log('User Profile Updated:', formData);

          // Reset form fields after successful submission
          setFormData({
            // Add the fields for the user profile
            name: '',
            email: '',
            password: '',
            calorie_goal: '',
          });

          // Close the modal after successfully creating food
          onHide();
        } catch (error) {
          console.error('Error updating user profile:', error);
        }
      },
    });
  };

  return (
    <Modal show={show} onHide={onHide} size='xs' centered backdrop='static'>
      <Modal.Header className='bg-dark' closeVariant='white' closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Update User Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark '>
        <Form onSubmit={handleSubmit} className=' bg-dark text-light'>
          <Form.Group controlId='userName'>
            <Row className='align-items-center'>
              <Col xs={12}>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder='Username'
                  value={formData.name}
                  onChange={handleChange}
                  className='mb-2 form-group-create-food bg-dark text-light'
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId='userEmail'>
            <Row className='align-items-center'>
              <Col xs={12}>
                <Form.Control
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                  className='mb-2 form-group-create-food bg-dark text-light'
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId='userPassword'>
            <Row className='align-items-center'>
              <Col xs={12}>
                <Form.Control
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleChange}
                  className='mb-2 form-group-create-food bg-dark text-light'
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId='calorieGoal'>
            <Row className='align-items-center'>
              <Col xs={12}>
                <Form.Control
                  type='number'
                  name='calorie_goal'
                  placeholder='Calorie Goal'
                  value={formData.calorie_goal}
                  onChange={handleChange}
                  className='mb-2 form-group-create-food bg-dark text-light'
                />
              </Col>
            </Row>
          </Form.Group>
          <p>*only complete necessary fields</p>
        </Form>
      </Modal.Body>
      <Modal.Footer className='bg-dark'>
        <Button
          variant='outline-success'
          type='submit'
          disabled={
            isLoading ||
            (!formData.name &&
              !formData.email &&
              !formData.password &&
              !formData.calorie_goal)
          }
          onClick={handleSubmit}
        >
          {isLoading ? <ButtonLoader /> : 'Update Profile'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateUserProfileModal;
