import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { deleteSocialNetwork } from '../../../api/socialNetworkApi';

const DeleteSocialNetwork = ({ socialNetworkId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteSocialNetwork,
    onSuccess: (data) => {
      if(data.success) {
        toast.success(data.message || "Réseau social supprimé avec succès!");
        queryClient.invalidateQueries('socialNetwork');
      } else {
        toast.error(data.message || "Une erreur est survenue.");
      }
    },
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
    }
  });

  const handleDeleteClick = () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce réseau social ?");
    if (confirmed) {
      mutation.mutate(socialNetworkId);
    }
  };

  return (
<button onClick={handleDeleteClick} disabled={mutation.isLoading} className='red-link'>
      {mutation.isLoading ? "Suppression..." : "Supprimer"}
    </button>
  );
};

export default DeleteSocialNetwork;