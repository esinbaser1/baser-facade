import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { deleteContent } from '../../../api/contentApi';

const DeleteContent = ({ contentId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteContent,
    onSuccess: (data) => {
      if(data.success) {
        toast.success(data.message || "Contenu supprimé avec succès!");
        queryClient.invalidateQueries('contents'); // Invalider et refetch les contenus après suppression
      } else {
        toast.error(data.message || "Une erreur est survenue.");
      }
    },
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
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
