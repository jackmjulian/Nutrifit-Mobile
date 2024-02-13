import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Carousel, Card, Button, Container, Row, Col } from 'react-bootstrap';
import {
  useGetMealsQuery,
  useDeleteFoodFromMealMutation,
} from '../slices/mealsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import breakfastCard from '../assets/images/breakfast-card.jpg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NutritionScreen = () => {
  const {
    data: meals,
    isLoading,
    isError,
    refetch: refetchMeals,
  } = useGetMealsQuery();

  const [deleteFoodFromMeal] = useDeleteFoodFromMealMutation();

  // Set the state for the calendar to render the meals for the selected date
  const [startdate, setStartDate] = useState(new Date());

  // This needs amending as the pictures are not loading properly
  const [imagesReady, setImagesReady] = useState(false);

  // Get the logged in user - userInfo._id
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    preloadImages();
  }, []);

  // Preload images to avoid flickering and loading after the carousel is rendered
  const preloadImages = () => {
    const image = new Image();
    image.src = breakfastCard;
    image.onload = () => {
      setImagesReady(true);
    };
  };

  const handleAddFood = (mealId) => {
    // console.log('Add Food Clicked', mealId);
    navigate(`/nutrition/${mealId}`);
  };

  const handleDeleteFood = async (mealId, foodInstanceId) => {
    try {
      console.log('Delete Food Clicked', mealId, foodInstanceId);
      await deleteFoodFromMeal({ mealId, foodInstanceId });

      // If the deletion is successful, refetch meals to update the UI
      refetchMeals();
    } catch (error) {
      console.error('Error deleting food:', error.message);
    }
  };

  return (
    <>
      <Container className='d-flex justify-content-center align-items-center mb-2'>
        <DatePicker
          selected={startdate}
          onChange={(date) => setStartDate(date)}
        />
      </Container>
      <Container className='d-flex justify-content-center align-items-center'>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant='danger'>
            {isError?.data?.message || isError.error}
          </Message>
        ) : (
          // Set controls to false to hide the carousel controls and allow the user to swipe through the carousel
          <Carousel interval={null} controls={false}>
            {meals.map((meal) => (
              <Carousel.Item key={meal._id}>
                <Card className='nutrition-card bg-none text-white '>
                  <Card.Img variant='top' src={breakfastCard} />
                  <Card.Body className='bg-none'>
                    <h1 className='nutrition-overlay-text'>{meal.meal_name}</h1>

                    {/* Check if there are any food items for the current user */}
                    {meal.meal_foods &&
                    meal.meal_foods.some(
                      (meal_food) =>
                        meal_food.user === userInfo._id &&
                        new Date(meal_food.addedAt).toDateString() ===
                          startdate.toDateString()
                    ) ? (
                      meal.meal_foods.map(
                        (meal_food, idx) =>
                          meal_food.user === userInfo._id && (
                            <Row key={idx}>
                              <Col xs={8}>{meal_food.food_name}</Col>
                              <Col xs={3} className='text-end'>
                                {meal_food.food_calories}cal
                              </Col>
                              <Col
                                xs={1}
                                className='text-center'
                                onClick={() =>
                                  handleDeleteFood(
                                    meal._id,
                                    meal_food.food_instance_id
                                  )
                                }
                              >
                                x
                              </Col>
                            </Row>
                          )
                      )
                    ) : (
                      <p>
                        {startdate.toDateString() === new Date().toDateString()
                          ? 'No food added today'
                          : 'No food added on this date'}
                      </p>
                    )}
                    <Button
                      variant='success'
                      className='mt-1 mb-4'
                      onClick={() => handleAddFood(meal._id)}
                    >
                      Add Item
                    </Button>
                  </Card.Body>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </Container>
    </>
  );
};

export default NutritionScreen;
