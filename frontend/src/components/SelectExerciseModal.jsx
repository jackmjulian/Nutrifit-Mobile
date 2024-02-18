import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { Button, Modal, ListGroup, Row, Col } from 'react-bootstrap';
import Loader from './Loader';

function SelectExerciseModal({ show, onHide, exerciseData, onSelectExercise }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); // State to hold selected category

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
  const handleCategoryFilter = (category) => {
    // Toggle category selection
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  // Function to handle exercise selection
  const handleExerciseSelection = (exercise) => {
    // Pass the selected exercise back to the parent container
    onSelectExercise(exercise);
    // Hide the modal
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size='xs' centered backdrop='static'>
      <Modal.Header className='bg-dark' closeVariant='white' closeButton>
        <Modal.Title>Select Exercise</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark'>
        <SearchBar onSearch={setSearchQuery} />
        <p>Filter by category</p>
        <Row>
          {exerciseData ? (
            exerciseData.map((exercise) => (
              <Col key={exercise._id}>
                <Button
                  variant='outline-success'
                  type='button'
                  onClick={() =>
                    handleCategoryFilter(exercise.exercise_category)
                  }
                  className={`mb-3 ${
                    selectedCategory === exercise.exercise_category
                      ? 'active'
                      : ''
                  }`}
                >
                  {exercise.exercise_category}
                </Button>
              </Col>
            ))
          ) : (
            <Loader />
          )}
        </Row>
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
      </Modal.Body>
      <Modal.Footer className='bg-dark'></Modal.Footer>
    </Modal>
  );
}

export default SelectExerciseModal;
