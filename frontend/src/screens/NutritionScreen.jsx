import { Carousel, Card, Button, Container, Row, Col } from 'react-bootstrap';
import placeholder from '../assets/images/placeholder.png';
import breakfastCard from '../assets/images/breakfast-card.jpg';

const NutritionScreen = () => {
  const cardSize = {
    width: '80vw',
    // height: '30rem',
  };
  const overlayText = {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    color: 'white', // Adjust the color for readability
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Add text shadow for better contrast
  };
  return (
    // TODO: Add a carousel for each meal type
    // UPDATE with dynamic data
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{}}
    >
      <Carousel>
        <Carousel.Item>
          <Card className='bg-none text-white' style={cardSize}>
            <Card.Img variant='top' src={breakfastCard} />
            <Card.Body className='bg-none'>
              {/* <h1 style={overlayText}>Breakfast</h1> */}
              {/* <Card.Title>Breakfast</Card.Title> */}
              <Row>
                <Col xs={8}>
                  <h2 style={overlayText}>Breakfast</h2>
                </Col>
                <Col xs={4} className='text-end'>
                  <h2 style={overlayText}>832cal</h2>
                </Col>
              </Row>
              <Row>
                <Col xs={8}>Fruit Bowl</Col>
                <Col xs={4} className='text-end'>
                  347cal
                </Col>
              </Row>
              <Row>
                <Col xs={8}>Per4m Whey</Col>
                <Col xs={4} className='text-end'>
                  262cal
                </Col>
              </Row>
              <Row>
                <Col xs={8}>Grenade Bar</Col>
                <Col xs={4} className='text-end'>
                  223cal
                </Col>
              </Row>
              <Button
                variant='success'
                className='mt-2'
                onClick={() => console.log('Add Food Clicked')}
              >
                Add Item
              </Button>
            </Card.Body>
          </Card>
        </Carousel.Item>
        {/* Add more Carousel.Items for additional variants */}
      </Carousel>
    </Container>
  );
};

export default NutritionScreen;
