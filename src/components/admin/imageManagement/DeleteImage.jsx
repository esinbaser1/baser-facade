import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { deleteImage } from '../../../api/imageApi';
import { useState } from 'react';
import ModalAminDelete from "../../ModalAminDelete";

const DeleteImage = ({ imageId }) => {
  const [modalShow, setModalShow] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteImage,
    onSuccess: (data) => {
      if(data.success) {
        toast.success(data.message || "Image supprimée avec succès.");
        queryClient.invalidateQueries('images');
      } else {
        toast.error(data.message || "Une erreur est survenue.")
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
    mutation.mutate(imageId); 
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
      contentSuffix={`category : ${imageId}`}
      onConfirm={confirmDelete}
      onCancel={cancelDelete}
    />
  )
}
    </>
  );
};

export default DeleteImage;