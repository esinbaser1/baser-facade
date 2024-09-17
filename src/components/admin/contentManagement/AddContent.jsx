import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addContent, getSections, getStatuses } from '../../../api/contentApi';

const AddContent = () => {
  const [content, setContent] = useState("");
  const [contentSection, setContentSection] = useState("");
  const [contentStatus, setContentStatus] = useState("");

  const queryClient = useQueryClient();

  // Utilisation de useQuery pour récupérer les sections et les statuts
  const { data: sectionData, isLoading: isLoadingSections, error: errorSections } = useQuery({
    queryKey: "sections",
    queryFn: getSections
  });

  const { data: statusData, isLoading: isLoadingStatuses, error: errorStatuses } = useQuery({
    queryKey: "statuses",
    queryFn: getStatuses
});

  // Mutation pour ajouter du contenu
  const mutation = useMutation(addContent, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('contents');
      setContent("");
      setContentSection("");
      setContentStatus("");
      toast.success(data.message || "Contenu ajouté avec succès!");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ content, section_id: contentSection, status_id: contentStatus });
  };

  if (isLoadingSections || isLoadingStatuses) return <p>Chargement...</p>;
  if (errorStatuses) return <p>Une erreur sest produite en récupérant les statuts.</p>;
  if (errorSections) return <p>Une erreur sest produite lors de la récupération des sections.</p>;

  return (
    <div>
      <h2>Ajouter du contenu</h2>
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
          <option value="">Sélectionnez une section</option>
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
          <option value="">Sélectionnez un statut</option>
          {statusData && statusData.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={mutation.isLoading}>Ajouter</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddContent;
