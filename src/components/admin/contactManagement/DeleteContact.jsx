import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { deleteContact } from '../../../api/contactApi';

const DeleteContact = ( {contactId} ) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: (data) => {
      if(data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries('');
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
    }
  });

  const handleDeleteClick = () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?");
    if (confirmed) {
      mutation.mutate(contactId);
    }
  };

  return (
    <button onClick={handleDeleteClick} disabled={mutation.isLoading}>
      {mutation.isLoading ? "Suppression..." : "Supprimer"}
    </button>
  );
};

export default DeleteContact;