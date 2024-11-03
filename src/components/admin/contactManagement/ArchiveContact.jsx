import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { archiveContact } from '../../../api/contactApi';
import { useState } from 'react';
import ModalAdminArchive from "../../ModalAdminArchive";

const ArchiveContact = ({ contactId }) => {
  const [modalShow, setModalShow] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: archiveContact,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Message archivé avec succès.");
        queryClient.invalidateQueries('contact'); 
      } else {
        toast.error(data.message || "Une erreur est survenue");
      }
    },
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
    }
  });

  const handleArchiveClick = () => {
    setModalShow(true);
  }

  const confirmArchive = () => {
    mutation.mutate(contactId);
    setModalShow(false);
  }

  const cancelArchive = () => {
    setModalShow(false);
  }

  return (
    <>
    <button onClick={handleArchiveClick} disabled={mutation.isLoading} className='blue-link'>
      {mutation.isLoading ? "Archivage..." : "Archiver"}
    </button>
     {
      modalShow && (
        <ModalAdminArchive
        isOpen={modalShow}
        contentSuffix={`ce contenu : ${contactId}`}
        onConfirm={confirmArchive}
        onCancel={cancelArchive}
        />
      )
    }
  </>
  );
};

export default ArchiveContact;
