import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Carousel, Card, Button, Container, Row, Col } from 'react-bootstrap';
import {
  useGetMealsQuery,
  useGetMealsByUserQuery,
  useDeleteFoodFromMealMutation,
} from '../slices/mealsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import preworkoutCard from '../assets/images/meals/preworkout-card.jpg';
import postworkoutCard from '../assets/images/meals/postworkout-card.jpg';
import breakfastCard from '../assets/images/meals/breakfast-card.jpg';
import lunchCard from '../assets/images/meals/lunch-card.jpg';
import dinnerCard from '../assets/images/meals/dinner-card.jpg';
import snackCard from '../assets/images/meals/snacks-card.jpg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalorieTracker from '../components/CalorieTracker';
import DeleteItemPopUp from '../components/DeleteItemPopUp';

const mealImages = [
  preworkoutCard,
  postworkoutCard,
  breakfastCard,
  lunchCard,
  dinnerCard,
  snackCard,
];

const NutritionScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: userMeals,
    isLoading,
    isError,
    refetch: refetchMeals,
  } = useGetMealsByUserQuery(userInfo._id);

  const [deleteFoodFromMeal] = useDeleteFoodFromMealMutation();
  const [startdate, setStartDate] = useState(new Date());
  const [imagesReady, setImagesReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    preloadImages();
  }, []);

  const preloadImages = () => {
    mealImages.forEach((image) => {
      const img = new Image();
      img.src = image;
      img.onload = () => setImagesReady(true);
    });
  };

  const handleAddFood = (mealId) => {
    navigate(`/nutrition/${mealId}`);
  };

  const handleDeleteFood = async (mealId, foodInstanceId) => {
    DeleteItemPopUp({
      title: 'Delete Food',
      message: 'Are you sure you want to delete this food?',
      confirmCallback: async () => {
        try {
          await deleteFoodFromMeal({ mealId, foodInstanceId });
          refetchMeals();
        } catch (error) {
          console.error('Error deleting food:', error.message);
        }
      },
    });
  };

  return (
    <>
      <Container className='d-flex justify-content-center align-items-center mt-2 mb-2'>
        <DatePicker
          selected={startdate}
          onChange={(date) => setStartDate(date)}
        />
      </Container>
      <Container className='mb-2'>
        <CalorieTracker
          userMeals={userMeals}
          date={startdate.toDateString()}
          user={userInfo}
          isLoading={isLoading}
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
          <Carousel interval={null} controls={false}>
            {userMeals.map((meal, index) => (
              <Carousel.Item key={meal._id}>
                <Card className='nutrition-card bg-dark text-white '>
                  <Card.Img
                    variant='top'
                    src={mealImages[index % mealImages.length]}
                    style={{ width: '385px', height: '256px' }} // Set width and height here
                  />
                  <Card.Body className='bg-none'>
                    <h1 className='nutrition-overlay-text'>{meal.meal_name}</h1>
                    {meal.meal_foods &&
                      meal.meal_foods
                        .filter(
                          (meal_food) =>
                            meal_food.user === userInfo._id &&
                            new Date(meal_food.addedAt).toDateString() ===
                              startdate.toDateString()
                        )
                        .map((meal_food, idx) => (
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
                        ))}
                    {!meal.meal_foods ||
                    meal.meal_foods.every(
                      (meal_food) =>
                        meal_food.user !== userInfo._id ||
                        new Date(meal_food.addedAt).toDateString() !==
                          startdate.toDateString()
                    ) ? (
                      <p>
                        {startdate.toDateString() === new Date().toDateString()
                          ? 'No food added today'
                          : 'No food added on this date'}
                      </p>
                    ) : null}
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
