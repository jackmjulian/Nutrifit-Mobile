import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import SelectExerciseModal from '../components/SelectExerciseModal';
import { useGetExercisesQuery } from '../slices/exerciseApiSlice';
import AddItemPopUp from '../components/AddItemPopUp';
import Loader from '../components/Loader';
import ButtonLoader from '../components/ButtonLoader';
import {
  useCreateWorkoutMutation,
  useAddExerciseToWorkoutMutation,
} from '../slices/workoutApiSlice';
import { useAddSetToExerciseMutation } from '../slices/exerciseApiSlice';
import { useCreateSetMutation } from '../slices/setApiSlice';
import { MdDeleteOutline } from 'react-icons/md';
import { HiDotsHorizontal } from 'react-icons/hi';

const CreateWorkoutScreen = () => {
  // Initialize useNavigate
  const navigate = useNavigate();
  // Set modal state
  // Set modal show state
  const [selectExerciseModalShow, setSelectExerciseModalShow] = useState(false);

  // Selected exercise state for the modal
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Get create workout mutation
  const [createWorkout, { isLoading: isCreatingWorkout }] =
    useCreateWorkoutMutation();

  // Get add exercise to workout mutation
  const [addExerciseToWorkout, { isLoading: isAddingExerciseToWorkout }] =
    useAddExerciseToWorkoutMutation();

  // Get add set to exercise mutation
  const [addSetToExercise, { isLoading: isAddingSetToExercise }] =
    useAddSetToExerciseMutation();

  // Get create set mutation
  const [createSet, { isLoading: isCreatingSet }] = useCreateSetMutation();

  // Get the exercises from the API
  const {
    data: exerciseData,
    refetch: refetchExerciseData,
    isLoading,
    isError,
  } = useGetExercisesQuery();

  // Define the initial state for an exercise. Each exercise has a name and an array of sets.
  // Each set has properties for weight, reps, and notes, all initially set to an empty string.
  const initialExercise = {
    exercise: { _id: '', exercise_name: '' },
    sets: [
      {
        set_weight: '',
        set_reps: '',
        set_notes: '',
        workout_instance_id: '',
      },
    ],
  };

  // Initialize the state for exercises using the useState hook. The initial state is an array containing one exercise.
  const [exercises, setExercises] = useState([initialExercise]);

  // Initialize the state for the workout name.
  const [workoutName, setWorkoutName] = useState('');

  // Define a function to handle the form submission
  const submitWorkoutHandler = async (event) => {
    event.preventDefault();

    AddItemPopUp({
      title: 'Add Workout',
      text: 'Are you sure you want to add this workout?',
      confirmCallback: async () => {
        try {
          // Create the workout with workout_instance_id
          const createdWorkout = await createWorkout({
            workout: { workout_name: workoutName },
          });

          const workoutInstance = createdWorkout.data.workout_instance_id;
          // console.log('workout_instance: ', workoutInstance);

          for (const exercise of exercises) {
            for (const set of exercise.sets) {
              // Create set with workout_instance_id
              const createdSet = await createSet({
                set: {
                  set_weight: set.set_weight,
                  set_reps: set.set_reps,
                  set_notes: set.set_notes,
                  workout_instance_id: workoutInstance,
                },
              });

              console.log('createdSet : ', createdSet.data);
              // Add set to the exercise using exercise_id and workout_instance_id
              await addSetToExercise({
                exerciseId: exercise.exercise_id,
                set: {
                  set_id: createdSet.data._id,
                  workout_instance_id: workoutInstance,
                },
              });
            }

            // Add exercise to the workout using workout_instance_id
            const addedExercise = await addExerciseToWorkout({
              workoutId: createdWorkout.data._id,
              exercise: {
                exercise_id: exercise.exercise_id,
                workout_instance_id: workoutInstance,
              },
            });
          }

          console.log('createdWorkout: ', createdWorkout);

          navigate('/fitness');
        } catch (error) {
          console.log(error);
        }
      },
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
  const getSelectedExercise = (selectedExercise, exerciseIndex) => {
    console.log(selectedExercise, exerciseIndex);
    // Update the selected exercise state only for the specified index
    setExercises((prevExercises) =>
      prevExercises.map((exercise, index) =>
        index !== exerciseIndex
          ? exercise
          : {
              ...exercise,
              exercise_name: selectedExercise.exercise_name,
              exercise_id: selectedExercise._id,
              // exercise: selectedExercise,
            }
      )
    );
  };

  const handleDeleteSet = (exerciseIndex, setIndex) => {
    // Call setExercises to update the state. The new state is computed based on the previous state.
    setExercises((prevExercises) =>
      // Map over the previous exercises. For each exercise, check if its index matches the exerciseIndex.
      prevExercises.map((exercise, index) =>
        // If the index doesn't match, return the exercise as is.
        index !== exerciseIndex
          ? exercise
          : {
              // This new object has all the properties of the current exercise...
              ...exercise,
              // ...but with an updated sets property. The updated sets is an array that filters out the set with the specified setIndex.
              sets: exercise.sets.filter((_, idx) => idx !== setIndex),
            }
      )
    );
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
              {isCreatingWorkout ||
              isAddingExerciseToWorkout ||
              isAddingSetToExercise ||
              isCreatingSet ? (
                <ButtonLoader />
              ) : (
                'Save'
              )}
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
                  <option>
                    {exercise.exercise_name
                      ? exercise.exercise_name
                      : 'Select Exercise'}
                  </option>
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
                    className='form-group-create-workout bg-dark text-light no-outline w-25 smaller-text'
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
                    className='form-group-create-workout bg-dark text-light no-outline w-25 smaller-text'
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
                    className='form-group-create-workout bg-dark text-light no-outline smaller-text w-40'
                    onChange={handleFieldChange(
                      exerciseIndex,
                      setIndex,
                      'set_notes'
                    )} // Use the helper function to handle changes in the field.
                  />
                  <Col className='d-flex align-items-center justify-content-center'>
                    {/* <MdDeleteOutline onClick={() => handleDeleteSet(exerciseIndex, setIndex)}/> */}
                    <HiDotsHorizontal />
                  </Col>
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
            {/* Modal to select the exercise */}
            {/* TO BE IMPLEMENTED LATER */}
            <SelectExerciseModal
              show={selectExerciseModalShow}
              onHide={() => setSelectExerciseModalShow(false)}
              exerciseData={exerciseData}
              // onSelectExercise={getSelectedExercise}
              onSelectExercise={(exercise) =>
                getSelectedExercise(exercise, exerciseIndex)
              }
              refetchExerciseData={refetchExerciseData}
            />
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
    </Container>
  );
};

export default CreateWorkoutScreen;
