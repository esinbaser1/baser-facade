import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { deleteImage } from '../../../api/imageApi';

const DeleteImage = ({ imageId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteImage, {
    onSuccess: () => {
      toast.success("Image supprimé avec succès.");
      queryClient.invalidateQueries('images');
    },
    onError: (error) => {
      toast.error(`Erreur lors de la suppression : ${error.message}`);
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