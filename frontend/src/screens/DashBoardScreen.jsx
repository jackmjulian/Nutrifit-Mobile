import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DashboardBar from '../components/DashboardBar';
import nutritionThumbnail from '../assets/images/nutrition-thumbnail.jpg';
import fitnessThumbnail from '../assets/images/fitness-thumbnail.jpg';
import Header from '../components/Header';

const DashBoardScreen = () => {
  return (
    <>
      <Container className='vh-100'>
        <Header />
        <Row className='thumbnail-main'>
          <Col xs={12} className='thumbnail-container'>
            <Link to='/nutrition' className='thumbnail-link'>
              <div className='thumbnail-wrapper'>
                <img
                  src='https://res.cloudinary.com/dk4pzv3xg/image/upload/v1709990731/nutrifitmobile/i4efq6fajvywmakemagv.png'
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
                  src='https://res.cloudinary.com/dk4pzv3xg/image/upload/v1709990939/nutrifitmobile/l1zl5muh5kjpddtjmnjz.png'
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
