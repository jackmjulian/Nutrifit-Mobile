import { useSelector } from 'react-redux';

const DashBoardScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log('Dashboard', userInfo);
  return <div>DashBoardScreen</div>;
};
export default DashBoardScreen;
