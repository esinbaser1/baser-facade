import { useMutation, useQueryClient } from "react-query";
import { archiveContent } from "../../../api/contentApi";
import { toast } from "react-toastify";

const ArchiveContent = ({ contentId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: archiveContent,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Contenu archivé avec succès");
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
    const confirmed = window.confirm('Êtes-vous sûr de vouloir archiver ce contenu ?');
    if(confirmed) {
      mutation.mutate(contentId);
    }
  };
  return (
    <div>
      <button onClick={handleArchiveClick} disabled={mutation.isLoading}className="blue-link">
        {mutation.isLoading ? "Archivage..." : "Archiver"}
      </button>
    </div>
  );
};

export default ArchiveContent;
