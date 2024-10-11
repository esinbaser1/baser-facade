import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { archiveContact } from '../../../api/contactApi';

const ArchiveContact = ({ contactId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: archiveContact,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries('contact'); 
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
    }
  });

  const handleArchiveClick = () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir archiver ce message ?");
    if (confirmed) {
      mutation.mutate(contactId);
    }
  };

  return (
    <button onClick={handleArchiveClick} disabled={mutation.isLoading} className='blue-link'>
      {mutation.isLoading ? "Archivage..." : "Archiver"}
    </button>
  );
};

export default ArchiveContact;
