import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { deleteInformationContact } from '../../../api/informationContactApi';
import { useState } from 'react';
import ModalAminDelete from '../../ModalAminDelete';

const DeleteInformationContact = ( {informationId} ) => {

  const [modalShow, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteInformationContact,
    onSuccess: (data) => {
      if(data.success) {
        toast.success(data.message || "Information de contact supprimée avec succès!");
        queryClient.invalidateQueries('information');
      } else {
        toast.error(data.message || "Une erreur est survenue.");
      }
    },
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
    }
  });

  const handleDeleteClick = () => {
    setShowModal(true);
  }

  const confirmDelete = () => {
    mutation.mutate(informationId);
    setShowModal(false);
  }

  const cancelDelete = () => {
    setShowModal(false);
  }


  return (
    <>
    <button onClick={handleDeleteClick} disabled={mutation.isLoading} className='red-link'>
      {mutation.isLoading ? "Suppression..." : "Supprimer"}
    </button>

    {
  modalShow && (
    <ModalAminDelete
      isOpen={modalShow}
      contentSuffix={`category : ${informationId}`}
      onConfirm={confirmDelete}
      onCancel={cancelDelete}
    />
  )
}

    </>
  );
};

export default DeleteInformationContact;