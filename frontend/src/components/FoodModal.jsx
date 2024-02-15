import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  useAddFoodToMealMutation,
  useGetMealsQuery,
} from '../slices/mealsApiSlice';
import {
  useDeleteFoodsMutation,
  useGetFoodsQuery,
  useUpdateFoodsMutation,
} from '../slices/foodApiSlice';
import PieChartWithCenterLabel from './FoodMacroChart';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Loader from './Loader';

function FoodModal({ show, onHide, food, meal, setSelectedFood }) {
  // Set the Edit State
  const [inEdit, setInEdit] = useState(false);

  // // Set the initial state for the edit food modal
  // const [editFoodModalShow, setEditFoodModalShow] = useState(false);

  const [addFoodToMeal] = useAddFoodToMealMutation();

  // Get the refetch function for getting the meals again after a successful POST request
  const { refetch: refetchMeals } = useGetMealsQuery();

  // Get the refetch function for getting the foods again after a successful DELETE request
  const { refetch: refetchFoods } = useGetFoodsQuery();

  // Get the delete function from the useDeleteFoodMutation
  const [deleteFoods] = useDeleteFoodsMutation();

  // Get the update function from the useUpdateFoodMutation
  const [updateFoods, { isLoading }] = useUpdateFoodsMutation();

  const handleAddFood = async () => {
    try {
      // Ensure both food and meal are present
      if (food && meal) {
        // console.log('food id:', food._id);
        // console.log('meal id:', meal);
        // Make an API call to add food to the meal
        const response = await addFoodToMeal({
          mealId: meal,
          foodId: food._id,
        });

        // Handle success or error response here if necessary
        console.log('Food added to meal:', response);

        // After successfully adding food, trigger a refetch of meal data
        refetchMeals(); // This will refetch meal data from the server

        // Close the modal after successfully adding food
        onHide();
      } else {
        console.error('Food or meal not selected');
      }
    } catch (error) {
      console.error('Error adding food to meal:', error);
    }
  };

  // Prepare data for the PieChart
  let chartData = [];
  if (food) {
    // console.log(food);
    // Calculate the percentages of protein, carbs, and fat
    const total = food.food_protein + food.food_carbs + food.food_fat;
    const proteinPercentage = (food.food_protein / total) * 100;
    const carbsPercentage = (food.food_carbs / total) * 100;
    const fatPercentage = (food.food_fat / total) * 100;

    // Prepare data for the PieChart
    chartData = [
      { value: proteinPercentage, label: `${food.food_protein}g Protein` },
      { value: carbsPercentage, label: `${food.food_carbs}g Carbs` },
      { value: fatPercentage, label: `${food.food_fat}g Fat` },
    ];
  }

  const handleDeleteFood = async () => {
    console.log('Delete food:', food._id);
    try {
      if (food) {
        const response = await deleteFoods({ id: food._id });

        console.log('Food deleted:', response);

        // After successfully deleting food, trigger a refetch of food data
        refetchFoods(); // This will refetch food data from the server

        // Close the modal after successfully deleting food
        onHide();
      }
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };

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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Update the food data
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Initialize an empty object to hold updated data
      const updatedData = {};

      // Check each field in the form data
      Object.entries(formData).forEach(([key, value]) => {
        // If the field is empty in the form data, fill it with the corresponding value from the food object
        if (value === '' && food[key] !== undefined) {
          updatedData[key] = food[key];
        } else {
          updatedData[key] = value;
        }
      });

      // Call the updateFoods mutation with the id of the food item and the updatedData object
      await updateFoods({ id: food._id, food: updatedData });

      // After successfully updating food, trigger a refetch of food data
      refetchFoods();

      // Merge the updatedData with the existing food data to maintain unchanged fields
      const updatedFood = { ...food, ...updatedData };

      // Set the updated food data
      setSelectedFood(updatedFood);

      // Close the edit form after successfully updating food
      setInEdit(false);
    } catch (error) {
      console.error('Error creating food:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size='xs' centered backdrop='static'>
      <Modal.Header className='bg-dark' closeVariant='white' closeButton>
        <Modal.Title className='d-flex'></Modal.Title>
        <Modal.Title id='contained-modal-title-vcenter' className='m-2'>
          {/* {food ? food.food_name : 'No food selected'} */}
          {food ? food.food_name : 'No food selected'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark '>
        <PieChartWithCenterLabel
          data={chartData}
          label={food ? food.food_calories : 0}
        />
      </Modal.Body>

      {/* Conditional render the edit form when the edit button is clicked */}

      {inEdit && (
        <Modal.Body className='bg-dark '>
          <Form onSubmit={handleUpdate} className=' bg-dark text-light'>
            <Form.Group controlId='foodName'>
              <Form.Control
                type='text'
                name='food_name'
                placeholder={food.food_name}
                value={formData.food_name}
                onChange={handleChange}
                className='form-group-create-food bg-dark text-light mb-2'
              />
            </Form.Group>
            <Form.Group controlId='foodCalories'>
              <Form.Control
                type='text'
                name='food_calories'
                placeholder={`${food.food_calories} Calories`}
                value={formData.food_calories}
                onChange={handleChange}
                className='form-group-create-food bg-dark text-light mb-2'
              />
            </Form.Group>
            <Form.Group controlId='foodProtein'>
              <Form.Control
                type='text'
                name='food_protein'
                placeholder={`${food.food_protein}g Protein`}
                value={formData.food_protein}
                onChange={handleChange}
                className='form-group-create-food bg-dark text-light mb-2'
              />
            </Form.Group>
            <Form.Group controlId='foodCarbs'>
              <Form.Control
                type='text'
                name='food_carbs'
                placeholder={`${food.food_carbs}g Carbs`}
                value={formData.food_carbs}
                onChange={handleChange}
                className='form-group-create-food bg-dark text-light mb-2'
              />
            </Form.Group>
            <Form.Group controlId='foodFat'>
              <Form.Control
                type='text'
                name='food_fat'
                placeholder={`${food.food_fat}g Fat`}
                value={formData.food_fat}
                onChange={handleChange}
                className='form-group-create-food bg-dark text-light mb-2'
              />
            </Form.Group>
            <Row>
              <Col xs={12} className='text-end'></Col>
            </Row>
          </Form>
        </Modal.Body>
      )}
      {/* End of form */}

      <Modal.Footer className='bg-dark'>
        <Col
          xs={1}
          // onClick={handleEditModalClick}
          onClick={() => {
            setInEdit(!inEdit); // Toggle edit mode
          }}
        >
          <FaEdit />
        </Col>
        <Col xs={1} onClick={handleDeleteFood}>
          <MdDelete />
        </Col>

        {/* If in edit mode the Add Food button is hidden and Update is shown */}

        {inEdit ? (
          <Col xs={9} className='text-end'>
            <Button
              variant='outline-success'
              type='submit'
              onClick={handleUpdate} // Use handleUpdate function for the Update button
              disabled={isLoading}
            >
              Update
            </Button>
            {isLoading && <Loader />}
          </Col>
        ) : (
          <Col xs={9} className='text-end'>
            <Button
              variant='outline-success'
              type='submit'
              onClick={handleAddFood}
            >
              Add Food
            </Button>
            {isLoading && <Loader />}
          </Col>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default FoodModal;
