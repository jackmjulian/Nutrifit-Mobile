import { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import ButtonLoader from './ButtonLoader';
import { useUpdateCalorieGoalMutation } from '../slices/usersApiSlice';
import AddItemPopUp from './AddItemPopUp';

function UpdateCalorieGoalModal({ show, onHide, updateUserInfo }) {
  // Get update calorie goal mutation
  const [updateCalorieGoal, { isLoading }] = useUpdateCalorieGoalMutation();

  // Set the initial state for the form data
  const [formData, setFormData] = useState({
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
      title: 'Update Calorie Goal',
      text: `Are you sure you want to update your calorie goal to: ${formData.calorie_goal}?`,
      confirmCallback: async () => {

        try {
          await updateCalorieGoal(formData);
    
          // Update the user info after logging the new weight
          updateUserInfo();
    
          console.log('Goal Updated successfully:', formData);
    
          // Reset form fields after successful submission
          setFormData({
            calorie_goal: '',
          });
    
          // Close the modal after successfully creating food
          onHide();
        } catch (error) {
          console.error('Error updating calories:', error);
        }
      }
    });
  };

  return (
    <Modal show={show} onHide={onHide} size='xs' centered backdrop='static'>
      <Modal.Header className='bg-dark' closeVariant='white' closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Update Calorie Goal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark '>
        <Form onSubmit={handleSubmit} className=' bg-dark text-light'>
          <Form.Group controlId='calorieGoal'>
            <Row className='align-items-center'>
              <Col xs={12}>
                <Form.Control
                  type='number'
                  name='calorie_goal'
                  placeholder='Enter New Calorie Goal'
                  value={formData.calorie_goal}
                  onChange={handleChange}
                  className='mb-2 form-group-create-food bg-dark text-light'
                />
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='bg-dark'>
        <Button
          variant='outline-success'
          type='submit'
          disabled={isLoading || !formData.calorie_goal}
          onClick={handleSubmit}
        >
          {isLoading ? <ButtonLoader /> : 'Update Goal'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateCalorieGoalModal;
