import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DashboardBar from '../components/DashboardBar';
import nutritionThumbnail from '../assets/images/nutrition-thumbnail.jpg';
import fitnessThumbnail from '../assets/images/fitness-thumbnail.jpg';

const DashBoardScreen = () => {

  return (
    <>
      <Container>
        <Row className='thumbnail-main'>
          <Col xs={12} className='thumbnail-container'>
            <Link to='/nutrition' className='thumbnail-link'>
              <div className='thumbnail-wrapper'>
                <img
                  src={nutritionThumbnail}
                  alt='nutrition-thumbnail'
                  className='fluid thumbnail'
                />
                <h1 className='overlay-text'>Nutrition</h1>
              </div>
            </Link>
          </Col>
          <Col xs={12} className='thumbnail-container'>
            <Link to='/fitness' className='thumbnail-link'>
              <div className='thumbnail-wrapper'>
                <img
                  src={fitnessThumbnail}
                  alt='fitness-thumbnail'
                  className='fluid thumbnail'
                />
                <h1 className='overlay-text'>Fitness</h1>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
      <DashboardBar />
    </>
  );
};
export default DashBoardScreen;
