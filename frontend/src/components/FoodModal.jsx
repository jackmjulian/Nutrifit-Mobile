import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function FoodModal({ show, onHide, food }) {

  const handleAddFood = () => {
    console.log('Add Food', food._id);
  };

  //   if (food) {
  //     // Convert the food nutrient values to floating-point numbers
  //     const foodCarbs = parseFloat(food.food_carbs);
  //     const foodProtein = parseFloat(food.food_protein);
  //     const foodFat = parseFloat(food.food_fat);

  //     // Calculate the percentages
  //     const totalPercentage = foodCarbs + foodFat + foodProtein;
  //     const carbPercentage = (foodCarbs / totalPercentage) * 100;
  //     const fatPercentage = (foodFat / totalPercentage) * 100;
  //     const proteinPercentage = (foodProtein / totalPercentage) * 100;
  //   }


  return (
    <Modal show={show} onHide={onHide} size='xs' centered backdrop='static'>
      <Modal.Header className='bg-dark' closeVariant='white' closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {food ? food.food_name : 'No food selected'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark '>
      insert bar here
      </Modal.Body>
      <Modal.Footer className='bg-dark'>
        <Button variant='outline-success' type='submit' onClick={handleAddFood}>
          Add Food
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FoodModal;
