import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DashboardBar from '../components/DashboardBar';
import nutritionThumbnail from '../assets/images/nutrition-thumbnail.jpg';
import fitnessThumbnail from '../assets/images/fitness-thumbnail.jpg';

const DashBoardScreen = () => {
  // Get user info from the state
  // const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Container>
        <Row className='thumbnail-main'>
          <Col xs={12} className='thumbnail-container'>
            <Link to='/nutrition' className='text-center'>
              <img
                src={nutritionThumbnail}
                alt='nutrition-thumbnail'
                className='fluid thumbnail'
              />
            </Link>
            <h1 className='overlay-text'>Nutrition</h1>
          </Col>
          <Col xs={12} className='thumbnail-container'>
            <Link to='/fitness' className='text-center'>
              <img
                src={fitnessThumbnail}
                alt='fitness-thumbnail'
                className='fluid thumbnail'
              />
            </Link>
            <h1 className='overlay-text-one'>Fitness</h1>
          </Col>
        </Row>
      </Container>
      <DashboardBar />
    </>
  );
};
export default DashBoardScreen;
