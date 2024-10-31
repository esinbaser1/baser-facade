import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteSocialNetwork } from "../../../api/socialNetworkApi";
import { useState } from "react";
import ModalAdminDelete from "../../ModalAminDelete";

const DeleteSocialNetwork = ({ socialNetworkId }) => {

  const [modalShow, setModalShow] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteSocialNetwork,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Réseau social supprimé avec succès!");
        queryClient.invalidateQueries("socialNetwork");
      } else {
        toast.error(data.message || "Une erreur est survenue.");
      }
    },
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
    },
  });

  const handleDeleteClick = () => {
    setModalShow(true);
  } 

  const confirmDelete = () => {
    mutation.mutate(socialNetworkId);
    setModalShow(false);
  }

  const cancelDelete = () => {
    setModalShow(false);
  }
 

  return (
    <>
    <button
      onClick={handleDeleteClick}
      disabled={mutation.isLoading}
      className="red-link"
    >
      {mutation.isLoading ? "Suppression..." : "Supprimer"}
    </button>

    {
  modalShow && (
    <ModalAdminDelete
      isOpen={modalShow}
      contentSuffix={`category : ${socialNetworkId}`}
      onConfirm={confirmDelete}
      onCancel={cancelDelete}
    />
  )
}


    </>
  );
};

export default DeleteSocialNetwork;
