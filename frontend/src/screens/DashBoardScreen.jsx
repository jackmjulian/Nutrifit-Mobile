import { useSelector } from 'react-redux';
import NavBar from '../components/DashboardBar';
import DashboardBar from '../components/DashboardBar';

const DashBoardScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log('Dashboard', userInfo);
  return (
    <>
      <DashboardBar />
    </>
  );
};
export default DashBoardScreen;
