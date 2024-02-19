import Swal from 'sweetalert2';

const AddItemPopUp = async ({ title, text, confirmCallback }) => {
  const result = await Swal.fire({
    title: title || 'Add Item',
    text: text || 'Are you sure you want to add this item?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#198754',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'Cancel',
  });

  if (result.isConfirmed) {
    confirmCallback();
  }
};

export default AddItemPopUp;
