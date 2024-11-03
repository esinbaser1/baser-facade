import { useMutation, useQueryClient } from "react-query";
import { archiveContent } from "../../../api/contentApi";
import { toast } from "react-toastify";
import { useState } from "react";
import ModalAdminArchive from "../../ModalAdminArchive";

const ArchiveContent = ({ contentId }) => {
  const [modalShow, setModalShow] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: archiveContent,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Contenu archivé avec succès");
        queryClient.invalidateQueries("contents");
      } else {
        toast.error(data.message || "Une erreur est survenue");
      }
    },
    onError: (error) => {
      toast.error("Erreur lors de l'archivage : " + error.message);
    },
  });

  const handleArchiveClick = () => {
    setModalShow(true);
  }

  const confirmArchive = () => {
    mutation.mutate(contentId);
    setModalShow(false);
  }

  const cancelArchive = () => {
    setModalShow(false);
  }

  return (
    <>
      <button onClick={handleArchiveClick} disabled={mutation.isLoading}className="blue-link">
        {mutation.isLoading ? "Archivage..." : "Archiver"}
      </button>

      {
        modalShow && (
          <ModalAdminArchive
          isOpen={modalShow}
          contentSuffix={`ce contenu : ${contentId}`}
          onConfirm={confirmArchive}
          onCancel={cancelArchive}
          />
        )
      }
    </>
  );
};

export default ArchiveContent;
