import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { deleteContent } from '../../../api/contentApi';
import ModalAminDelete from "../../ModalAminDelete";
import { useState } from 'react';

const DeleteContent = ({ contentId }) => {
  const [modalShow, setModalShow] = useState(false); 
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteContent,
    onSuccess: (data) => {
      if(data.success) {
        toast.success(data.message || "Contenu supprimé avec succès!");
        queryClient.invalidateQueries('contents'); 
      } else {
        toast.error(data.message || "Une erreur est survenue.");
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
    mutation.mutate(contentId); 
    setModalShow(false);
  };

  // Cancel the deletion and close the modal
  const cancelDelete = () => {
    setModalShow(false);
  };
  return (
    <>
    <button onClick={handleDeleteClick} disabled={mutation.isLoading} className="red-link">
      {mutation.isLoading ? "Suppression..." : "Supprimer"}
    </button>
    {
  modalShow && (
    <ModalAminDelete
      isOpen={modalShow}
      contentSuffix={`category : ${contentId}`}
      onConfirm={confirmDelete}
      onCancel={cancelDelete}
    />
  )
}
  </>
  );
};

export default DeleteContent;
