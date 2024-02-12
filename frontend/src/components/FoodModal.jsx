import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  useAddFoodToMealMutation,
  useGetMealsQuery,
} from '../slices/mealsApiSlice';

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

  //   if (food) {
  //     // Convert the food nutrient values to floating-point numbers
  //     const foodCarbs = parseFloat(food.food_carbs);
  //     const foodProtein = parseFloat(food.food_protein);
  //     const foodFat = parseFloat(food.food_fat);

  //     // Calculate the percentages
  //     const totalPercentage = foodCarbs + foodFat + foodProtein;
  //     const carbPercentage = (foodCarbs / totalPercentage) * 100;
  //     const fatPercentage = (foodFat / totalPercentage) * 100;
  //     const proteinPercentage = (foodProtein / totalPercentage) * 100;
  //   }

  return (
    <Modal show={show} onHide={onHide} size='xs' centered backdrop='static'>
      <Modal.Header className='bg-dark' closeVariant='white' closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {food ? food.food_name : 'No food selected'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark '>insert bar here</Modal.Body>
      <Modal.Footer className='bg-dark'>
        <Button variant='outline-success' type='submit' onClick={handleAddFood}>
          Add Food
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FoodModal;
