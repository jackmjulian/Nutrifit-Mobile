import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Loader from '../components/Loader';
import {
  useCreateFoodsMutation,
  useGetFoodsQuery,
} from '../slices/foodApiSlice';
import AddItemPopUp from './AddItemPopUp';

function CreateFoodModal({ show, onHide }) {
  // Get the createFoods mutation
  const [createFoods, { isLoading }] = useCreateFoodsMutation();

  // Get the refetch for reloading the list of food after creating one
  const { refetch: refetchFoods } = useGetFoodsQuery();

  // Set the initial state for the form data
  const [formData, setFormData] = useState({
    food_name: '',
    food_calories: '',
    food_protein: '',
    food_carbs: '',
    food_fat: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    AddItemPopUp({
      title: 'Create Food',
      text: 'Are you sure you want to create this food?',
      confirmCallback: async () => {
        try {
          await createFoods({ food: formData }); // Call the createFoods mutation with formData
          console.log('Food created successfully:', formData);

          // Reset form fields after successful submission
          setFormData({
            food_name: '',
            food_calories: '',
            food_protein: '',
            food_carbs: '',
            food_fat: '',
          });

          // After successfully creating food, trigger a refetch of food data
          refetchFoods(); // This will refetch food data from the server

          // Close the modal after successfully creating food
          onHide();
        } catch (error) {
          console.error('Error creating food:', error);
          // Handle error, maybe display an error message to the user
        }
      },
    });
  };

  return (
    <Modal show={show} onHide={onHide} size='xs' centered backdrop='static'>
      <Modal.Header className='bg-dark' closeVariant='white' closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Create New Food
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark '>
        <Form onSubmit={handleSubmit} className=' bg-dark text-light'>
          <Form.Group controlId='foodName'>
            <Form.Control
              type='text'
              name='food_name'
              placeholder='Food Name'
              value={formData.food_name}
              onChange={handleChange}
              className='form-group-create-food bg-dark text-light mb-2'
            />
          </Form.Group>
          <Form.Group controlId='foodCalories'>
            <Form.Control
              type='text'
              name='food_calories'
              placeholder='Food Calories'
              value={formData.food_calories}
              onChange={handleChange}
              className='form-group-create-food bg-dark text-light mb-2'
            />
          </Form.Group>
          <Form.Group controlId='foodProtein'>
            <Form.Control
              type='text'
              name='food_protein'
              placeholder='Food Protein'
              value={formData.food_protein}
              onChange={handleChange}
              className='form-group-create-food bg-dark text-light mb-2'
            />
          </Form.Group>
          <Form.Group controlId='foodCarbs'>
            <Form.Control
              type='text'
              name='food_carbs'
              placeholder='Food Carbs'
              value={formData.food_carbs}
              onChange={handleChange}
              className='form-group-create-food bg-dark text-light mb-2'
            />
          </Form.Group>
          <Form.Group controlId='foodFat'>
            <Form.Control
              type='text'
              name='food_fat'
              placeholder='Food Fat'
              value={formData.food_fat}
              onChange={handleChange}
              className='form-group-create-food bg-dark text-light mb-2'
            />
          </Form.Group>
          <Row>
            <Col xs={12} className='text-end'>
              <Button
                variant='outline-success'
                type='submit'
                disabled={
                  isLoading ||
                  !formData.food_name ||
                  !formData.food_calories ||
                  !formData.food_protein ||
                  !formData.food_carbs ||
                  !formData.food_fat
                }
              >
                Submit
              </Button>
              {isLoading && <Loader />}
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className='bg-dark'></Modal.Footer>
    </Modal>
  );
}

export default CreateFoodModal;
