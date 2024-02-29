import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Col, Row, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import SearchBar from '../components/SearchBar';
import { useGetWorkoutsQuery } from '../slices/workoutApiSlice';
import formatDate from '../utils/formatDate';
import Header from '../components/Header';

const FitnessScreen = () => {
  // Get workout data
  const { data: workouts, isLoading, isError } = useGetWorkoutsQuery();
  console.log('workouts', workouts);

  // Initialize useNavigate
  const navigate = useNavigate();

  // Set search term and results state
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Handle search term change for filtered workouts
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      const results = workouts.filter((workout) =>
        workout.workout_name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // If there is a search term, display the search results, otherwise display all workouts
  const workoutsToDisplay = searchTerm ? searchResults : workouts;

  // Handle workout click
  const handleWorkoutClick = (workoutInstance) => {
    navigate(`/fitness/repeat-workout/${workoutInstance}`);
    console.log(workoutInstance);
  };

  return (
    <>
      <Container>
        <Header />
      </Container>
      <Container className='bg-none text-light p-4'>
        <h1 className='nutrition-overlay-text'>Previous Workouts</h1>
        <Row>
          <Col>
            {' '}
            <SearchBar onSearch={handleSearch} />
          </Col>
        </Row>
        <Card className='bg-dark text-light mb-2'>
          <Button
            variant='outline-success'
            type='submit'
            onClick={() => navigate('/fitness/create-workout')}
          >
            Create New Workout
          </Button>
        </Card>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant='danger'>
            {isError?.data?.message || isError.error}
          </Message>
        ) : (
          // map through all the workout data
          workoutsToDisplay.map((workout) => (
            <Card
              key={workout.workout_instance_id}
              className='bg-dark text-light mb-2'
              onClick={() => handleWorkoutClick(workout.workout_instance_id)}
            >
              <Card.Body
                className='pt-1 pb-1'
                // onClick={() => handleModalClick(food)}
              >
                <Row>
                  <Col xs={8} className='text-truncate'>
                    {/* {food.food_name} */}
                    <h4>{workout.workout_name}</h4>
                  </Col>
                  <Col xs={4} className='text-end'>
                    {/* {food.food_calories}cal */}
                    <h6>{formatDate(workout.createdAt)}</h6>
                  </Col>
                </Row>
                <Row>
                  <Col xs={8} className='text-truncate'>
                    {workout.workout_exercises.map((exercise, index) => (
                      // console.log(exercise.exercise_sets.length)
                      <h6
                        key={index}
                      >{`${exercise.exercise_sets.length}x ${exercise.exercise_name}`}</h6>
                    ))}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </>
  );
};
export default FitnessScreen;
