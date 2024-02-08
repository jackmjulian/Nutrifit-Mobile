import { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Form onSubmit={handleSubmit} className='d-flex mb-2 text-light'>
      <FormControl
        type='text'
        placeholder='Search'
        className='me-2 bg-dark text-light'
        value={searchTerm}
        onChange={handleChange}
      />
      <Button variant='outline-success' type='submit'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
