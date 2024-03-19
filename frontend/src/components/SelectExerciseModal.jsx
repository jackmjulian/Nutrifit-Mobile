import React, { useState } from 'react';
import SearchBar from './SearchBar';
import {
  Button,
  Modal,
  ListGroup,
  Row,
  Col,
  Form,
  DropdownButton,
  DropdownToggle,
} from 'react-bootstrap';
import Loader from './Loader';
import ButtonLoader from './ButtonLoader';
import AddItemPopUp from './AddItemPopUp';
import { useCreateExerciseMutation } from '../slices/exerciseApiSlice';
import Dropdown from 'react-bootstrap/Dropdown';

function SelectExerciseModal({
  show,
  onHide,
  exerciseData,
  onSelectExercise,
  refetchExerciseData,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); // State to hold selected category

  // Set state for adding new exercise
  const [addExerciseMode, setAddExerciseMode] = useState(false);

  // Get the createNewExercise mutation
  const [createExercise, { isLoading }] = useCreateExerciseMutation();

  // Filter exerciseData based on searchQuery and selected category
  const filteredExercises = exerciseData
    ? exerciseData.filter(
        (exercise) =>
          exercise.exercise_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) &&
          (!selectedCategory || exercise.exercise_category === selectedCategory)
      )
    : [];

  // Function to handle category filter button click
  // const handleCategoryFilter = (category) => {
  //   // Toggle category selection
  //   setSelectedCategory((prevCategory) =>
  //     prevCategory === category ? null : category
  //   );
  // };

  // Function to handle exercise selection
  const handleExerciseSelection = (exercise, exerciseIndex) => {
    // Pass the selected exercise back to the parent container
    onSelectExercise(exercise, exerciseIndex);
    // console.log(exercise);
    // Hide the modal
    onHide();
  };

  // Set initial form data
  const [formData, setFormData] = useState({
    exercise_name: '',
    exercise_type: '',
    exercise_category: '',
  });

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle adding new exercise
  const handleAddExercise = async (e) => {
    // Prevent the default form submission behavior.
    e.preventDefault();

    // Call the AddItemPopUp component to confirm user wants to complete the action
    AddItemPopUp({
      title: 'Add Exercise',
      text: 'Are you sure you want to add this exercise?',
      confirmCallback: async () => {
        try {
          // Call the createExercise mutation with formData
          await createExercise({ exercise: formData });

          console.log(formData);

          // Refetch the exercise data to load new exercise
          refetchExerciseData();

          // Close the form
          setAddExerciseMode(false);

          // Clear the form
          setFormData({
            exercise_name: '',
            exercise_type: '',
            exercise_category: '',
          });
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  return (
    <Modal show={show} onHide={onHide} size='xs' centered backdrop='static'>
      <Modal.Header className='bg-dark' closeVariant='white' closeButton>
        <Modal.Title>
          {/* Conditional title based on addExerciseMode */}
          {addExerciseMode ? 'Add Exercise' : 'Select Exercise'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark'>
        {/* TODO: IMPLEMENT A FILTER BAR HERE */}
        {/* <SearchBar onSearch={setSearchQuery} /> */}
        {/* <p>Filter by category</p> */}
        <Row>
          {/* Render filter buttons for unique exercise categories */}
          {!addExerciseMode && exerciseData && (
            <Dropdown onSelect={setSelectedCategory} className='mb-2'>
              <Dropdown.Toggle variant='outline-success' className='w-100'>
                Filter Categories
              </Dropdown.Toggle>
              <Dropdown.Menu
                variant='outline-success'
                className='bg-dark'
                style={{ width: '94%' }}
              >
                {Array.from(
                  // Create a new set of unique exercise categories
                  new Set(
                    exerciseData.map((exercise) => exercise.exercise_category)
                  )
                ).map((category, index) => (
                  <Dropdown.Item
                    key={index}
                    eventKey={category}
                    active={selectedCategory === category}
                    variant='outline-success'
                    className='text-light bg-dark text-center'
                  >
                    {category}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Row>
        <Row>
          <Col xs={12}>
            <Button
              variant={addExerciseMode ? 'outline-danger' : 'outline-success'}
              type='submit'
              className='w-100 mb-2'
              onClick={() => setAddExerciseMode(!addExerciseMode)}
            >
              {addExerciseMode ? 'Cancel' : 'Create New Exercise'}
            </Button>
          </Col>
        </Row>

        {/* Conditional render the add exercise form when the add exercise button is clicked */}
        {addExerciseMode ? (
          <Row>
            <Col xs={12}>
              <Form
              // onSubmit={handleAddExercise}
              >
                <Form.Group controlId='exerciseName'>
                  <Form.Control
                    type='text'
                    name='exercise_name'
                    placeholder='Exercise Name'
                    className='form-group-create-food bg-dark text-light mb-2'
                    value={formData.exercise_name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId='exerciseType'>
                  <Form.Control
                    type='text'
                    name='exercise_type'
                    placeholder='Exercise Type'
                    className='form-group-create-food bg-dark text-light mb-2'
                    value={formData.exercise_type}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId='exerciseCategory'>
                  <Form.Control
                    type='text'
                    name='exercise_category'
                    placeholder='Exercise Category'
                    className='form-group-create-food bg-dark text-light mb-2'
                    value={formData.exercise_category}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button
                  variant='outline-success'
                  type='submit'
                  className='w-100'
                  onClick={handleAddExercise}
                  disabled={
                    !formData.exercise_name ||
                    !formData.exercise_type ||
                    !formData.exercise_category
                  }
                >
                  {isLoading ? <ButtonLoader /> : 'Add Exercise'}
                </Button>
              </Form>
            </Col>
          </Row>
        ) : (
          <ListGroup>
            {filteredExercises.map((exercise) => (
              <ListGroup.Item
                key={exercise._id}
                className='bg-dark text-light'
                onClick={() => handleExerciseSelection(exercise)} // Handle exercise selection
              >
                {exercise.exercise_name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer className='bg-dark'></Modal.Footer>
    </Modal>
  );
}

export default SelectExerciseModal;
