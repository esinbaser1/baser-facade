import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { addContent } from '../../../api/contentApi';
import { getStatuses } from '../../../api/statusApi';
import { getSections } from '../../../api/sectionApi';

const AddContent = () => {
  const [content, setContent] = useState("");
  const [contentSection, setContentSection] = useState("");
  const [contentStatus, setContentStatus] = useState("");

  const queryClient = useQueryClient();

  // Utilisation de useQuery pour récupérer les sections et les statuts
  const { data: sectionData, isLoading: isLoadingSections, error: errorSections } = useQuery({
    queryKey: "sections",
    queryFn: getSections,
    onSuccess: (data) => {
      if(data && data.length > 0) {
        // Initialiser la première section par défaut
        setContentSection(data[0].id)
      }
    }
  });

  const { data: statusData, isLoading: isLoadingStatuses, error: errorStatuses } = useQuery({
    queryKey: "statuses",
    queryFn: getStatuses,
    onSuccess: (data) => {
      if(data && data.length > 0) {
        setContentStatus(data[0].id);
      }
    }
});

  const mutation = useMutation({
    mutationFn: addContent, 
    onSuccess: (data) => {
      if(data.success) {
      queryClient.invalidateQueries('contents');
      setContent("");
      setContentSection(sectionData[0].id || "");
      setContentStatus(statusData[0].id || "");
      toast.success(data.message || "Contenu ajouté avec succès!");
    } else {
      toast.error(data.message || "Une erreur est survenue.");
    }
  },
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
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
    <>
      <h2>Ajouter du contenu</h2>
      <form onSubmit={handleSubmit} className='form'>
        <label htmlFor="content">Contenu</label>
        <textarea
          type="text"
          name="content"
          value={content}
          id="content"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <label htmlFor="contentSection">Section</label>
        <select
          id="contentSection"
          name="contentSection"
          value={contentSection}
          onChange={(e) => setContentSection(e.target.value)}
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
        >
          {statusData && statusData.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={mutation.isLoading}>Ajouter</button>
      </form>
    </>
  );
};

export default AddContent;
