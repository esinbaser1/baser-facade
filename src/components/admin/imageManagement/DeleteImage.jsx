import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { deleteImage } from '../../../api/imageApi';

const DeleteImage = ({ imageId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteImage, {
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

  const handleDeleteClick = () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?");
    if (confirmed) {
      mutation.mutate(imageId);
    }
  };
  return (
      <button onClick={handleDeleteClick} disabled={mutation.isLoading}>
      {mutation.isLoading ? "Suppression..." : "Supprimer"}
    </button>
  );
};

export default DeleteImage;