import { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import ButtonLoader from './ButtonLoader';
import { useLogNewWeightMutation } from '../slices/usersApiSlice';
import AddItemPopUp from './AddItemPopUp';

function LogNewWeightModal({ show, onHide, updateUserInfo }) {
  // Get log weight mutation
  const [logNewWeight, { isLoading }] = useLogNewWeightMutation();

  // Set the initial state for the form data
  const [formData, setFormData] = useState({
    weight: '',
    weight_units: '', // Added weight_units field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Log the new weight
  const handleSubmit = async (e) => {
    e.preventDefault();

    AddItemPopUp({
      title: 'Log Weight',
      text: `Are you sure you want to log: ${formData.weight}${formData.weight_units} ?`,
      confirmCallback: async () => {
        try {
          await logNewWeight(formData);

          // Update the user info after logging the new weight
          updateUserInfo();

          console.log('Weight logged successfully:', formData);

          // Reset form fields after successful submission
          setFormData({
            weight: '',
            weight_units: '',
          });

          // Close the modal after successfully creating food
          onHide();
        } catch (error) {
          console.error('Error logging weight:', error);
        }
      },
    });
  };

  return (
    <Modal show={show} onHide={onHide} size='xs' centered backdrop='static'>
      <Modal.Header className='bg-dark' closeVariant='white' closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Log New Weight
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark '>
        <Form onSubmit={handleSubmit} className=' bg-dark text-light'>
          <Form.Group controlId='foodName'>
            <Row className='align-items-center'>
              <Col xs={8}>
                <Form.Control
                  type='number'
                  name='weight'
                  placeholder='Enter your weight'
                  value={formData.weight}
                  onChange={handleChange}
                  className='mb-2 form-group-create-food bg-dark text-light'
                />
              </Col>
              <Col xs={4}>
                <Form.Select
                  name='weight_units'
                  value={formData.weight_units}
                  onChange={handleChange}
                  className='mb-2 bg-dark text-light form-group-create-food'
                >
                  <option value='units'>units</option>
                  <option value='kg'>kg</option>
                  <option value='lbs'>lbs</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='bg-dark'>
        <Button
          variant='outline-success'
          type='submit'
          disabled={isLoading || !formData.weight || !formData.weight_units}
          onClick={handleSubmit}
        >
          {isLoading ? <ButtonLoader /> : 'Log Weight'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LogNewWeightModal;
