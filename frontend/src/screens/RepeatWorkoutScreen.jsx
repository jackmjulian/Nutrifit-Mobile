import { useParams } from 'react-router-dom';
import { useGetWorkoutByInstanceIdQuery } from '../slices/workoutApiSlice';

const RepeatWorkoutScreen = () => {
  // Get workout instance id from URL
  const { id } = useParams();

  // Get workout data by instance id
  const {
    data: workout,
    isLoading,
    isError,
  } = useGetWorkoutByInstanceIdQuery(id);
  //   console.log('workout instance', workout);
  //   console.log('id', id);
  return <div>RepeatWorkoutScreen</div>;
};
export default RepeatWorkoutScreen;
