import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getContentById, updateContent } from "../../../api/contentApi";
import { getStatuses } from '../../../api/statusApi';
import { getSections } from '../../../api/sectionApi';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateContent = () => {
  
  const { idContent } = useParams();
  
  const [content, setContent] = useState("");
  const [contentSection, setContentSection] = useState("");
  const [contentStatus, setContentStatus] = useState("");
  
  const queryClient = useQueryClient();

  // Récupération des sections
  const { data: sectionData, isLoading: isLoadingSections, error: errorSections } = useQuery({
    queryKey: "sections",
    queryFn: getSections
  });

  // Récupération des statuts
  const { data: statusData, isLoading: isLoadingStatuses, error: errorStatuses } = useQuery({
    queryKey: "statuses",
    queryFn: getStatuses
  });

  // Récupération des données du contenu
  useQuery({
    queryKey: ["content", idContent],
    queryFn: () => getContentById(idContent),
    onSuccess: (data) => {
      if (data) {
        setContent(data.content || "");
        setContentSection(data.section_id || "");
        setContentStatus(data.status_id || "");
      }
    },
    onError: (error) => {
      toast.error(error.message); 
    }
  });

  // Mutation pour mettre à jour le contenu
  const mutation = useMutation({
    mutationFn: updateContent,
    onSuccess: (data) => {
      queryClient.invalidateQueries("contents");
      // Vérifier si la réponse du serveur contient un message d'erreur ou de succès
      if (data.success) {
        toast.success(data.message || "Contenu mis à jour avec succès!");  // Message de succès
      } else {
        toast.error(data.message || "Erreur lors de la mise à jour du contenu!");  // Message d'erreur
      }
    },
    onError: (error) => {
      toast.error(error.message);  // Message d'erreur en rouge
    }
  });

  // Gestion du formulaire de mise à jour
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      idContent,
      content,
      section_id: contentSection,
      status_id: contentStatus,
    });
  };

  if (isLoadingSections || isLoadingStatuses) return <p>Chargement...</p>;

  if (errorSections) return <p>Une erreur s&lsquo;est produite en récupérant les sections : {errorSections.message}</p>;
  if (errorStatuses) return <p>Une erreur s&lsquo;est produite en récupérant les statuts : {errorStatuses.message}</p>;

  return (
    <div>
      <h2>Modifier le contenu</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="content">Contenu</label>
        <input
          type="text"
          name="content"
          value={content}
          id="content"
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <label htmlFor="contentSection">Section</label>
        <select
          id="contentSection"
          name="contentSection"
          value={contentSection}
          onChange={(e) => setContentSection(e.target.value)}
          required
        >
          {sectionData && sectionData.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>

        <label htmlFor="contentStatus">Statut</label>
        <select
          id="contentStatus"
          name="contentStatus"
          value={contentStatus}
          onChange={(e) => setContentStatus(e.target.value)}
          required
        >
          {statusData && statusData.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={mutation.isLoading}>
          Mettre à jour
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateContent;
