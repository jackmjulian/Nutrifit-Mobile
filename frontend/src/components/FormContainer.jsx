import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      {/* justify the content center on medium screens */}
      <Row className='justify-content-md-center'>
        {/* col take up all units on an xs screen, half on a medium screen */}
        <Col xs={12} md={6}>
          {/* children is a special prop that renders whatever is passed into the component */}
          {children}
        </Col>
      </Row>
    </Container>
  );
};
export default FormContainer;
