import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Col, Row, Button } from 'react-bootstrap';
import { useGetFoodsQuery } from '../slices/foodApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import SearchBar from '../components/SearchBar';
import FoodModal from '../components/FoodModal';
import CreateFoodModal from '../components/CreateFoodModal';
import { useGetWorkoutsQuery } from '../slices/workoutSlice';

const FitnessScreen = () => {
  // const { data: foods, isLoading, isError } = useGetFoodsQuery();
  // console.log('Food Page', foods);
  const { data: workouts, isLoading, isError } = useGetWorkoutsQuery();

  // Get the search term from the URL
  // const { id: mealId } = useParams();
  // console.log(mealId);

  // Set search term and results state
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // // Set modal show state
  // const [modalShow, setModalShow] = useState(false);

  // // Additional state for the second create food modal
  // const [createFoodModalShow, setCreateFoodModalShow] = useState(false);

  // Set selected food for the modal to display
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // Handle search term change for filtered foods
  // const handleSearch = (term) => {
  //   setSearchTerm(term);
  //   if (term) {
  //     const results = foods.filter((food) =>
  //       food.food_name.toLowerCase().includes(term.toLowerCase())
  //     );
  //     setSearchResults(results);
  //   } else {
  //     setSearchResults([]);
  //   }
  // };

  // // Handle modal click to display selected food
  // const handleModalClick = (food) => {
  //   setSelectedWorkout(food);
  //   setModalShow(true);
  //   // console.log(food);
  // };

  // // Handle modal click to open create food modal
  // const handleCreateFoodModalClick = () => {
  //   setCreateFoodModalShow(true);
  // };

  // Callback function to update selected food when edited
  // const updateSelectedFood = (updatedFood) => {
  //   setSelectedWorkout(updatedFood);
  // };

  // If there is a search term, display the search results, otherwise display all foods
  // const foodsToDisplay = searchTerm ? searchResults : foods;

  return (
    <Container className='bg-none text-light p-4'>
      <h1 className='nutrition-overlay-text'>Previous Workouts</h1>
      <Row>
        <Col>
          {' '}
          <SearchBar
          // onSearch={handleSearch}
          />
        </Col>
      </Row>
      {/* Static card */}
      <Card className='bg-dark text-light mb-2'>
        <Button
          variant='outline-success'
          type='submit'
          // onClick={() => handleCreateFoodModalClick()}
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
        <h1>Workouts</h1>
        // foodsToDisplay.map((food) => (
        //   <Card key={food._id} className='bg-dark text-light mb-2'>
        //     <Card.Body
        //       className='pt-1 pb-1'
        //       onClick={() => handleModalClick(food)}
        //     >
        //       <Row>
        //         <Col xs={8} className='text-truncate'>
        //           {/* {food.food_name} */}
        //           workout name
        //         </Col>
        //         <Col xs={4} className='text-end'>
        //           {/* {food.food_calories}cal */}
        //           date
        //         </Col>
        //       </Row>
        //     </Card.Body>
        //   </Card>
        // ))
      )}
      {/* <FoodModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        food={selectedWorkout}
        meal={mealId}
        setSelectedWorkout={setSelectedWorkout} // Pass down the state to the modal
      />
      <CreateFoodModal
        show={createFoodModalShow}
        onHide={() => setCreateFoodModalShow(false)}
      /> */}
    </Container>
  );
};
export default FitnessScreen;
