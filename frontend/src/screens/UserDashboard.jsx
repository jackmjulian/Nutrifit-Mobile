import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DashboardBar from '../components/DashboardBar';
import { PieChart } from '@mui/x-charts/PieChart';
import { FaEdit } from 'react-icons/fa'; // use this for the edit icon
import { useGetUserByIdQuery } from '../slices/usersApiSlice';
import { useGetMealsByUserQuery } from '../slices/mealsApiSlice';
import Loader from '../components/Loader';
import LogNewWeightModal from '../components/LogNewWeightModal';
import UpdateCalorieGoalModal from '../components/UpdateCalorieGoalModal';
import UpdateUserProfileModal from '../components/UpdateUserProfileModal';

const UserDashboard = () => {
  // Get the user info from the state
  const { id } = useParams();

  const {
    data: userInfo,
    isLoading,
    isFetching,
    refetch: fetchUserInfo,
  } = useGetUserByIdQuery(id);
  // console.log('🚀 ~ UserDashboard ~ userInfo:', userInfo);

  const {
    data: userMeals,
    isLoading: loadingMeals,
    isFetching: fettchingMeals,
  } = useGetMealsByUserQuery(id);

  // Set Modal States
  const [showLogWeightModal, setShowLogWeightModal] = useState(false);
  const [showCalorieGoalModal, setShowCalorieGoalModal] = useState(false);
  const [showUpdateUserProfileModal, setShowUpdateUserProfileModal] =
    useState(false);

  // Calculate total calories
  let totalCalories = 0;
  let remainingCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  if (userMeals) {
    // Get today's date
    const today = new Date().toDateString();

    userMeals.forEach((meal) => {
      meal.meal_foods.forEach((food) => {
        if (new Date(food.addedAt).toDateString() === today) {
          totalCalories += food.food_calories;
          totalProtein += food.food_protein;
          totalCarbs += food.food_carbs;
          totalFat += food.food_fat;
        }
      });
    });

    // Calculate remaining calories
    remainingCalories = userInfo.calorie_goal - totalCalories;
  }

  const [formData, setFormData] = useState({
    bodyweight: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Calculate highest, lowest, and latest weight
  let highestWeight = 0;
  let lowestWeight = Number.MAX_VALUE;
  let latestWeight = Number.MAX_VALUE;

  if (userInfo && userInfo.weight && userInfo.weight.length > 0) {
    userInfo.weight.forEach((weightObj) => {
      const weightValue = weightObj.weight;
      highestWeight = Math.max(highestWeight, weightValue);
      lowestWeight = Math.min(lowestWeight, weightValue);
    });

    // Assign the latest weight after iterating through the array
    latestWeight = userInfo.weight[userInfo.weight.length - 1].weight;
  }

  return (
    <>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <Container className='w-100'>
          <h1 className='nutrition-overlay-text text-start'>Dashboard</h1>
          <Row className='mb-2'>
            <Col xs={12}>
              <Card className='text-white bg-dark'>
                <Card.Body>
                  <h5>{userInfo.name}</h5>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={6}>
              <Card className='mb-2 text-white bg-dark'>
                <Card.Body>
                  <h5>Bodyweight</h5>
                  <p>
                    Current: {latestWeight || '0'}
                    {userInfo.weight[0].weight_units}
                  </p>
                  <p>
                    Highest: {highestWeight || '0'}
                    {userInfo.weight[0].weight_units}
                  </p>
                  <p>
                    Lowest: {lowestWeight || '0'}
                    {userInfo.weight[0].weight_units}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6}>
              <Card className='mb-2 text-white bg-dark'>
                <Card.Body>
                  <h5>Calories</h5>
                  <p>Goal: {userInfo.calorie_goal}cal</p>
                  <p>Today: {totalCalories}cal</p>
                  <p>Remaining: {remainingCalories}cal</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={6}>
              <Card className='mb-2 text-white no-outline bg-dark'>
                <Button
                  variant='outline-success'
                  onClick={() => setShowLogWeightModal(true)}
                >
                  Log New Weight
                </Button>
              </Card>
            </Col>
            <Col xs={6}>
              <Card className='mb-2 text-white bg-dark'>
                <Button
                  variant='outline-success'
                  onClick={() => setShowCalorieGoalModal(true)}
                >
                  Update Goal
                </Button>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Card className='pb-4 mb-2 text-white bg-dark'>
                <Card.Body>
                  <h5>Daily Macros</h5>
                </Card.Body>
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: parseFloat(totalProtein),
                          label: `P: ${totalProtein.toFixed(1)}g`,
                        },
                        {
                          id: 1,
                          value: parseFloat(totalCarbs),
                          label: `C: ${totalCarbs.toFixed(1)}g`,
                        },
                        {
                          id: 2,
                          value: parseFloat(totalFat),
                          label: `F: ${totalFat.toFixed(1)}g`,
                        },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </Card>
            </Col>
          </Row>
          <Card className='mb-2 text-white bg-dark'>
            <Button
              variant='outline-success'
              onClick={() => setShowUpdateUserProfileModal(true)}
            >
              Update User
            </Button>
          </Card>
          <LogNewWeightModal
            show={showLogWeightModal}
            onHide={() => setShowLogWeightModal(false)}
            updateUserInfo={fetchUserInfo}
          />
          <UpdateCalorieGoalModal
            show={showCalorieGoalModal}
            onHide={() => setShowCalorieGoalModal(false)}
            updateUserInfo={fetchUserInfo}
          />
          <UpdateUserProfileModal
            show={showUpdateUserProfileModal}
            onHide={() => setShowUpdateUserProfileModal(false)}
            updateUserInfo={fetchUserInfo}
          />
        </Container>
      )}
      <DashboardBar />
    </>
  );
};

export default UserDashboard;
