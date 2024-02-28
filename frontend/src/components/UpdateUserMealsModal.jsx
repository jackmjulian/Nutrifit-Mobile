import { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import ButtonLoader from './ButtonLoader';
import AddItemPopUp from './AddItemPopUp';
import { GrUpdate } from 'react-icons/gr';
import {
  useCreateNewMealMutation,
  useUpdateMealMutation,
} from '../slices/mealsApiSlice';

function UpdateUserMealsModal({ show, onHide, userMeals, refetchMeals }) {
  const [addMealForm, setAddMealForm] = useState(false);
  const [formData, setFormData] = useState({
    meal_name: '', // Initialize with an empty meal_name
  });

  // Set state for the meal name field
  const [mealName, setMealName] = useState('');
  const [updatingMealIndex, setUpdatingMealIndex] = useState(null);

  // Create a new meal
  const [createNewMeal, { isLoading: isCreatingMeal }] =
    useCreateNewMealMutation();

  // Update a meal
  const [updateMeal, { isLoading: isUpdatingMeal }] = useUpdateMealMutation();

  // Function to add a new meal
  const handleAddMealClick = async (e) => {
    e.preventDefault();
    console.log('Add New Meal Clicked', formData.meal_name);

    AddItemPopUp({
      title: 'Add New Meal',
      text: 'Are you sure you want to create this meal?',
      confirmCallback: async () => {
        try {
          await createNewMeal({ mealName: { meal_name: mealName } });
          console.log('Meal created successfully', mealName);

          // Refetch meals
          refetchMeals();

          // Reset the state
          setMealName('');

          setAddMealForm(false);
        } catch (error) {
          console.log('Error creating new meal:', error);
        }
      },
    });
  };

  // Function to update a meal
  const handleUpdateMealClick = async (meal, index) => {
    console.log('Update Meal: ', mealName);
    console.log('Meal ID: ', meal._id);

    setUpdatingMealIndex(index);

    AddItemPopUp({
      title: 'Update Meal',
      text: 'Are you sure you want to update this meal?',
      confirmCallback: async () => {
        try {
          await updateMeal({
            mealId: meal._id,
            mealName: { meal_name: mealName },
          });
          console.log('Meal updated successfully', mealName);

          // Refetch meals
          refetchMeals();

          // Reset the state
          setMealName('');
          setUpdatingMealIndex(null);
        } catch (error) {
          console.log('Error updating meal:', error);
        }
      },
    });
  };

  return (
    <Modal show={show} onHide={onHide} size='xs' centered backdrop='static'>
      <Modal.Header className='bg-dark' closeVariant='white' closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {addMealForm ? 'Create New Meal' : 'Update Meals'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark '>
        {addMealForm ? (
          <Form className='bg-dark text-light'>
            <Form.Group controlId='addNewMeal' className='mb-2'>
              <Form.Control
                type='text'
                name='meal_name'
                placeholder='New Meal Name'
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                className='form-group-create-food bg-dark text-light'
              />
            </Form.Group>
          </Form>
        ) : (
          <Form className='bg-dark text-light'>
            {userMeals.map((meal, index) => (
              <Form.Group controlId='userMeal' key={meal._id} className='mb-2'>
                <Row className='align-items-center'>
                  <Col xs={10}>
                    <Form.Control
                      type='text'
                      name='mealName'
                      placeholder={meal.meal_name}
                      onChange={(e) => setMealName(e.target.value)}
                      className='form-group-create-food bg-dark text-light'
                    />
                  </Col>
                  <Col xs={2} className='text-center'>
                    {updatingMealIndex === index && isUpdatingMeal ? (
                      <ButtonLoader />
                    ) : (
                      <GrUpdate
                        className='text-success'
                        onClick={() => handleUpdateMealClick(meal, index)}
                      />
                    )}
                  </Col>
                </Row>
              </Form.Group>
            ))}
            <p>*click to update individual meal</p>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer className='bg-dark'>
        {addMealForm ? (
          <Button
            type='submit'
            variant='outline-success'
            onClick={handleAddMealClick}
          >
            {isCreatingMeal ? <ButtonLoader /> : 'Confirm'}
          </Button>
        ) : null}
        <Button
          variant={addMealForm ? 'outline-danger' : 'outline-success'}
          onClick={() => setAddMealForm(!addMealForm)} // Clicking this button shows the addNewMeal form
        >
          {addMealForm ? 'Cancel' : 'Add New Meal'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateUserMealsModal;
