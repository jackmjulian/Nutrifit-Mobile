import React from 'react';
import { useState } from 'react';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  useAddFoodToMealMutation,
  useGetMealsQuery,
} from '../slices/mealsApiSlice';
import {
  useDeleteFoodsMutation,
  useGetFoodsQuery,
} from '../slices/foodApiSlice';
import PieChartWithCenterLabel from './FoodMacroChart';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

// Import the edit food modal
import EditFoodModal from './EditFoodModal';

function FoodModal({ show, onHide, food, meal }) {
  // Set the initial state for the edit food modal
  const [editFoodModalShow, setEditFoodModalShow] = useState(false);

  const [addFoodToMeal] = useAddFoodToMealMutation();

  // Get the refetch function for getting the meals again after a successful POST request
  const { refetch: refetchMeals } = useGetMealsQuery();

  // Get the refetch function for getting the foods again after a successful DELETE request
  const { refetch: refetchFoods } = useGetFoodsQuery();

  // Get the delete function from the useDeleteFoodMutation
  const [deleteFoods] = useDeleteFoodsMutation();

  // const token = useSelector((state) => state.auth); // Get token from Redux store or wherever it's stored
  // console.log('token:', token);

  // Handle modal click to display selected food
  const handleEditModalClick = (food) => {
    setEditFoodModalShow(true);
  };

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

  return (
    <Modal show={show} onHide={onHide} size='xs' centered backdrop='static'>
      <Modal.Header className='bg-dark' closeVariant='white' closeButton>
        <Modal.Title className='d-flex'>
          {/* <FaEdit />
          <MdDelete /> */}
        </Modal.Title>
        <Modal.Title id='contained-modal-title-vcenter' className='m-2'>
          {food ? food.food_name : 'No food selected'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark '>
        <PieChartWithCenterLabel
          data={chartData}
          label={food ? food.food_calories : 0}
        />
      </Modal.Body>
      <Modal.Footer className='bg-dark'>
        <Col xs={1} onClick={handleEditModalClick}>
          <FaEdit />
        </Col>
        <Col xs={1} onClick={handleDeleteFood}>
          <MdDelete />
        </Col>
        <Col xs={9} className='text-end'>
          <Button
            variant='outline-success'
            type='submit'
            onClick={handleAddFood}
          >
            Add Food
          </Button>
        </Col>
      </Modal.Footer>
      <EditFoodModal
        show={editFoodModalShow}
        onHide={() => setEditFoodModalShow(false)}
        food={food}
      />
    </Modal>
  );
}

export default FoodModal;
