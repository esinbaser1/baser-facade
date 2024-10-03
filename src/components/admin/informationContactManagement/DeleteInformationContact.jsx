import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { deleteInformationContact } from '../../../api/informationContactApi';

const DeleteInformationContact = ( {informationId} ) => {
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
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette information de contact ?");
    if (confirmed) {
      mutation.mutate(informationId);
    }
  };

  return (
    <button onClick={handleDeleteClick} disabled={mutation.isLoading}>
      {mutation.isLoading ? "Suppression..." : "Supprimer"}
    </button>
  );
};

export default DeleteInformationContact;