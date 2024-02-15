import Swal from 'sweetalert2';

const DeleteItemPopUp = async (confirmCallback) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to delete this item.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#198754',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  });

  if (result.isConfirmed) {
    confirmCallback();
  }
};

export default DeleteItemPopUp;
