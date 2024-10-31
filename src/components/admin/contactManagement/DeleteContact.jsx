import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { deleteContact } from '../../../api/contactApi';
import ModalAminDelete from "../../ModalAminDelete";
import { useState } from 'react';

const DeleteContact = ( {contactId} ) => {
  const [modalShow, setModalShow] = useState(false); 
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: (data) => {
      if(data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries('contact');
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
    }
  });

  // Open delete confirmation modal
  const handleDeleteClick = () => {
    setModalShow(true);
  };

  // Confirm the deletion
  const confirmDelete = () => {
    mutation.mutate(contactId); 
    setModalShow(false);
  };

  // Cancel the deletion and close the modal
  const cancelDelete = () => {
    setModalShow(false);
  };

  return (
    <>
    <button onClick={handleDeleteClick} disabled={mutation.isLoading} className='red-link'>
      {mutation.isLoading ? "Suppression..." : "Supprimer"}
    </button>
     {/* Show confirmation modal */}
     {
  modalShow && (
    <ModalAminDelete
      isOpen={modalShow}
      contentSuffix={`category : ${contactId}`}
      onConfirm={confirmDelete}
      onCancel={cancelDelete}
    />
  )
}
  </>
  );
};

export default DeleteContact;