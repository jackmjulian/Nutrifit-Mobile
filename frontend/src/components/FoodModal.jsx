import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  useAddFoodToMealMutation,
  useGetMealsQuery,
} from '../slices/mealsApiSlice';
import PieChartWithCenterLabel from './FoodMacroChart';

function FoodModal({ show, onHide, food, meal }) {
  const [addFoodToMeal] = useAddFoodToMealMutation();

  // Get the refetch function for getting the meals again after a successful POST request
  const { refetch: refetchMeals } = useGetMealsQuery();

  // const token = useSelector((state) => state.auth); // Get token from Redux store or wherever it's stored
  // console.log('token:', token);

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
      { value: proteinPercentage, label: 'Protein' },
      { value: carbsPercentage, label: 'Carbs' },
      { value: fatPercentage, label: 'Fat' },
    ];
  }

  return (
    <Modal show={show} onHide={onHide} size='xs' centered backdrop='static'>
      <Modal.Header className='bg-dark' closeVariant='white' closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
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
        <Button variant='outline-success' type='submit' onClick={handleAddFood}>
          Add Food
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FoodModal;
