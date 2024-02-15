import { Container, Card, Col, Row } from 'react-bootstrap';
import Loader from './Loader';

const CalorieTracker = ({ userMeals, date, user, isLoading }) => {
  if (isLoading || !userMeals) {
    // If isLoading is true or userMeals is undefined or null, return loading or placeholder content
    return ''; // You can replace this with any loading component you have
  }

  // Calculate total calories
  let totalCalories = 0;
  userMeals.forEach((meal) => {
    meal.meal_foods.forEach((food) => {
      if (new Date(food.addedAt).toDateString() === date) {
        totalCalories += food.food_calories;
      }
    });
  });

  // Calculate remaining calories
  const remainingCalories = user.calorie_goal - totalCalories;

  // Set the color based on remaining calories
  const textColor = remainingCalories < 0 ? 'red' : 'green';

  return (
    <>
      <Container>
        <Card className='bg-dark text-light p-2'>
          <Row>
            <Col className='text-center nutrition-overlay-text'>
              <h4>Goal</h4>
            </Col>
            <Col className='text-center nutrition-overlay-text'>
              <h4>Today</h4>
            </Col>
            <Col className='text-center nutrition-overlay-text'>
              <h4>Remaining</h4>
            </Col>
          </Row>
          <Row>
            <Col className='text-center'>
              <h4>{user.calorie_goal}</h4>
            </Col>
            <Col className='text-center'>
              <h4>{totalCalories}</h4>
            </Col>
            <Col className='text-center'>
              <h4 style={{ color: textColor }}>{remainingCalories}</h4>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default CalorieTracker;
