import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { deleteContent } from '../../../api/contentApi';

const DeleteContent = ({ contentId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteContent, {
    onSuccess: () => {
      toast.success("Contenu supprimé avec succès.");
      queryClient.invalidateQueries('contents'); // Invalider et refetch les contenus après suppression
    },
    onError: (error) => {
      toast.error(`Erreur lors de la suppression : ${error.message}`);
    }
  });

  const handleDeleteClick = () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce contenu ?");
    if (confirmed) {
      mutation.mutate(contentId);
    }
  };

  return (
    <button onClick={handleDeleteClick} disabled={mutation.isLoading}>
      {mutation.isLoading ? "Suppression..." : "Supprimer"}
    </button>
  );
};

export default DeleteContent;
