import { useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import SelectExerciseModal from '../components/SelectExerciseModal';
import { useGetExercisesQuery } from '../slices/exerciseApiSlice';
import { BsThreeDots } from 'react-icons/bs';

const FitnessScreen = () => {
  // Set modal state
  // Set modal show state
  const [selectExerciseModalShow, setSelectExerciseModalShow] = useState(false);

  // Get the exercises from the API
  const { data: exerciseData, isLoading, isError } = useGetExercisesQuery();

  // Define the initial state for an exercise. Each exercise has a name and an array of sets.
  // Each set has properties for weight, reps, and notes, all initially set to an empty string.
  const initialExercise = {
    exercise_name: '',
    sets: [
      {
        set_weight: '',
        set_reps: '',
        set_notes: '',
      },
    ],
  };

  // Initialize the state for exercises using the useState hook. The initial state is an array containing one exercise.
  const [exercises, setExercises] = useState([initialExercise]);

  // Initialize the state for the workout name.
  const [workoutName, setWorkoutName] = useState('');

  // Define a function to handle form submission.
  const submitWorkoutHandler = (event) => {
    // Prevent the default form submission behavior.
    event.preventDefault();

    // Log the workout as an object.
    console.log({
      workoutName,
      exercises,
    });
  };

  // Define a function to handle adding a set to a specific exercise.
  const handleAddSet = (exerciseIndex) => {
    // Call setExercises to update the state. The new state is computed based on the previous state.
    setExercises((prevExercises) =>
      // Map over the previous exercises. For each exercise, check if its index matches the exerciseIndex.
      prevExercises.map((exercise, index) =>
        // If the index doesn't match, return the exercise as is.
        index !== exerciseIndex
          ? exercise
          : // If the index does match, return a new object.
            {
              // This new object has all the properties of the current exercise...
              ...exercise,
              // ...but with an updated sets property. The updated sets is an array that contains all the previous sets...
              sets: [
                // ...and a new set at the end. The new set is the first set of initialExercise.
                ...exercise.sets,
                initialExercise.sets[0],
              ],
            }
      )
    );
  };

  // Define a function to handle adding an exercise.
  const handleAddExercise = () => {
    // Call setExercises to update the state. The new state is computed based on the previous state.
    setExercises((prevExercises) =>
      // The new state is an array that contains all the previous exercises...
      [
        ...prevExercises,
        // ...and the initialExercise at the end.
        initialExercise,
      ]
    );
  };

  // Define a function to handle changes in the form fields.
  // This function takes three parameters: the index of the exercise, the index of the set, and the name of the field.
  const handleFieldChange = (exerciseIndex, setIndex, field) => (event) => {
    // Call setExercises to update the state. The new state is computed based on the previous state.
    setExercises((prevExercises) =>
      // Map over the previous exercises. For each exercise, check if its index matches the exerciseIndex.
      prevExercises.map((exercise, index) =>
        // If the index doesn't match, return the exercise as is.
        index !== exerciseIndex
          ? exercise
          : // If the index does match, return a new object.
          setIndex === null
          ? // If setIndex is null, update the exercise name. Otherwise, update the set at the specified index.
            { ...exercise, [field]: event.target.value } // Update the exercise name when setIndex is null.
          : {
              // This new object has all the properties of the current exercise...
              ...exercise,
              // ...but with an updated sets property. The updated sets is an array that contains all the previous sets...
              sets: exercise.sets.map(
                (set, index) =>
                  // For each set, it checks if its index matches the setIndex.
                  index !== setIndex
                    ? // If the index doesn't match, return the set as is.
                      set
                    : // If the index does match, return a new object. This new object has all the properties of the current set...
                      { ...set, [field]: event.target.value } // ...but with an updated field property.
              ),
            }
      )
    );
  };

  // Function to handle the selected exercise from the modal.
  const handleSelectExercise = (exercise) => {
    // Find the index of the exercise in the exercises array
    const exerciseIndex = exercises.findIndex(
      (ex) => ex.exercise_name === '' // Find the exercise with an empty name (placeholder)
    );

    if (exerciseIndex !== -1) {
      // If an exercise with an empty name is found, update its name with the selected exercise
      setExercises((prevExercises) =>
        prevExercises.map((ex, index) =>
          index === exerciseIndex
            ? { ...ex, exercise_name: exercise.exercise_name }
            : ex
        )
      );
    }

    // Hide the modal
    setSelectExerciseModalShow(false);
  };

  return (
    <Container className='bg-none text-light p-4'>
      <Form
      // onSubmit={submitWorkoutHandler}
      >
        <h1 className='nutrition-overlay-text'>Create Workout</h1>
        <Card className='bg-dark text-light p-2 mb-2'>
          <Form.Group controlId='workoutName' className='d-flex'>
            <Form.Control
              type='text'
              name='workoutName'
              placeholder='Name'
              className='form-group-create-food bg-dark text-light no-outline'
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)} // Update the workout name state when the field changes.
            />
            <Button
              variant='outline-success'
              type='submit'
              className='no-outline'
              onClick={submitWorkoutHandler}
            >
              Save
            </Button>
          </Form.Group>
        </Card>

        {/* Map through each of the exercise cards added by user */}

        {exercises.map((exercise, exerciseIndex) => (
          <Card className='bg-dark text-light px-3 mb-2' key={exerciseIndex}>
            <Row>
              <Form.Group
                id='exerciseName'
                className='d-flex align-items-center bottom-line'
                onClick={() => setSelectExerciseModalShow(true)}
              >
                <Form.Control
                  as='select'
                  name={`exerciseName`}
                  value={exercise.exercise_name || ''} // Set the value to an empty string if exercise_name is falsy
                  className='form-group-create-workout bg-dark text-light no-outline'
                  onChange={handleFieldChange(
                    exerciseIndex,
                    null,
                    'exercise_name'
                  )} // Use the helper function to handle changes in the field.
                >
                  <option> Select Exercise </option>

                  {/* Map through the current list of exercises */}
                  {exerciseData &&
                    exerciseData.map((exercise, index) => (
                      <option key={index} value={exercise.exercise_name}>
                        {exercise.exercise_name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Row>

            {/* Map through each of the sets added by user */}

            {exercise.sets.map((set, setIndex) => (
              <Row key={setIndex}>
                <Form.Group
                  id='exerciseSets'
                  className='d-flex align-items-center bottom-line'
                >
                  <Form.Control
                    type='text'
                    name={`weight`}
                    placeholder='Weight'
                    value={set.set_weight}
                    className='form-group-create-workout bg-dark text-light no-outline'
                    onChange={handleFieldChange(
                      exerciseIndex,
                      setIndex,
                      'set_weight'
                    )} // Use the helper function to handle changes in the field.
                  />
                  <Form.Control
                    type='text'
                    name='reps'
                    placeholder='Reps'
                    className='form-group-create-workout bg-dark text-light no-outline'
                    value={set.set_reps}
                    onChange={handleFieldChange(
                      exerciseIndex,
                      setIndex,
                      'set_reps'
                    )} // Use the helper function to handle changes in the field.
                  />
                  <Form.Control
                    type='text'
                    name={`notes`}
                    placeholder='Notes'
                    value={set.set_notes}
                    className='form-group-create-workout bg-dark text-light no-outline'
                    onChange={handleFieldChange(
                      exerciseIndex,
                      setIndex,
                      'set_notes'
                    )} // Use the helper function to handle changes in the field.
                  />
                </Form.Group>
              </Row>
            ))}
            {/* End of sets map */}

            <Form.Group>
              <Button
                variant='outline-success'
                type='button'
                className='no-outline mt-2'
                onClick={() => handleAddSet(exerciseIndex)}
              >
                Add Set
              </Button>
            </Form.Group>
          </Card>
        ))}
        {/* End of exercise map */}

        <Card className='bg-dark text-light px-3 mt-2'>
          <Form.Group controlId='addExerciseButton'>
            <Button
              variant='outline-success'
              type='button'
              className='no-outline'
              onClick={handleAddExercise}
            >
              Add Exercise
            </Button>
          </Form.Group>
        </Card>
      </Form>

      {/* Modal to select the exercise */}
      {/* TO BE IMPLEMENTED LATER */}
      {/* <SelectExerciseModal
        show={selectExerciseModalShow}
        onHide={() => setSelectExerciseModalShow(false)}
        exerciseData={exerciseData}
        onSelectExercise={handleSelectExercise}
      /> */}
    </Container>
  );
};

export default FitnessScreen;
