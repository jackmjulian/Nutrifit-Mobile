import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DashboardBar from '../components/DashboardBar';
import nutritionThumbnail from '../assets/images/nutrition-thumbnail.jpg';
import fitnessThumbnail from '../assets/images/fitness-thumbnail.jpg';

const DashBoardScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // console.log('Dashboard', userInfo);

  // TODO: MOVE ALL STYLES TO THE CSS FILE
  const thumbnail = {
    width: '80%',
    height: '30vh',
    objectFit: 'cover',
    borderRadius: '30px', // Increase this value to round the corners more
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)', // Add drop shadow
  };

  const thumbnailContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Adjust as needed to control the vertical centering
  };

  const thumbnailMain = {
    height: '80vh',
  };

  const overlayText = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white', // Adjust the color for readability
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Add text shadow for better contrast
  };

  const overlayText1 = {
    position: 'absolute',
    top: '80%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white', // Adjust the color for readability
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Add text shadow for better contrast
  };

  return (
    <>
      <Container>
        <Row style={thumbnailMain}>
          <Col xs={12} style={thumbnailContainer}>
            <Link to='/nutrition' className='text-center'>
              <img
                src={nutritionThumbnail}
                alt='nutrition-thumbnail'
                style={thumbnail}
                className='fluid'
              />
            </Link>
            <h1 style={overlayText}>Nutrition</h1>
          </Col>
          <Col xs={12} style={thumbnailContainer}>
            <Link to='/fitness' className='text-center'>
              <img
                src={fitnessThumbnail}
                alt='fitness-thumbnail'
                style={thumbnail}
                className='fluid'
              />
            </Link>
            <h1 style={overlayText1}>Fitness</h1>
          </Col>
        </Row>
      </Container>
      <DashboardBar />
    </>
  );
};
export default DashBoardScreen;
