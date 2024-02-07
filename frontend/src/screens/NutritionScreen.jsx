import { useEffect, useState } from 'react';
import { Carousel, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useGetMealsQuery } from '../slices/mealsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import breakfastCard from '../assets/images/breakfast-card.jpg';

const NutritionScreen = () => {
  const { data: meals, isLoading, isError } = useGetMealsQuery();
  console.log('nutrition screen', meals, isLoading, isError);
  const [imagesReady, setImagesReady] = useState(false);

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
    console.log('Add Food Clicked', mealId);
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
        <Carousel>
          {meals.map((meal) => (
            <Carousel.Item key={meal._id}>
              <Card className='nutrition-card bg-none text-white '>
                <Card.Img variant='top' src={breakfastCard} />
                <Card.Body className='bg-none'>
                  <h1 className='nutrition-overlay-text'>{meal.meal_name}</h1>
                  {/* {meal.foodItems.map((foodItem, idx) => (
                    <Row key={idx}>
                      <Col xs={8}>{foodItem.name}</Col>
                      <Col xs={4} className='text-end'>
                        {foodItem.calories}cal
                      </Col>
                    </Row>
                  ))} */}
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
