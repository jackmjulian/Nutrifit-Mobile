import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Carousel, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useGetMealsQuery } from '../slices/mealsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import breakfastCard from '../assets/images/breakfast-card.jpg';

const NutritionScreen = () => {
  const { data: meals, isLoading, isError } = useGetMealsQuery();
  // console.log('nutrition screen', meals, isLoading, isError);
  const [imagesReady, setImagesReady] = useState(false);

  // Get the logged in user
  const { userInfo } = useSelector((state) => state.auth);
  // console.log('logged in user', userInfo._id);

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

  return (
    <Container className='d-flex justify-content-center align-items-center'>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <Carousel interval={null}>
          {meals.map((meal) => (
            <Carousel.Item key={meal._id}>
              <Card className='nutrition-card bg-none text-white '>
                <Card.Img variant='top' src={breakfastCard} />
                <Card.Body className='bg-none'>
                  <h1 className='nutrition-overlay-text'>{meal.meal_name}</h1>

                  {/* Map through each of the added foods */}
                  {meal.meal_foods && meal.meal_foods.length > 0 ? (
                    meal.meal_foods.map((meal_food, idx) => (
                      <Row key={idx}>
                        <Col xs={8}>{meal_food.food_name}</Col>
                        <Col xs={4} className='text-end'>
                          {meal_food.food_calories}cal
                        </Col>
                      </Row>
                    ))
                  ) : (
                    <p>No food added today</p>
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
  );
};

export default NutritionScreen;
