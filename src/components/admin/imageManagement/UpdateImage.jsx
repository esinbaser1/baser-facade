import { useState } from "react";
import { useParams } from "react-router-dom";
import { getSections } from '../../../api/sectionApi';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getImageById, updateImage } from "../../../api/imageApi";
import { toast } from "react-toastify";
import AdminNavigation from "../AdminNavigation";
import { useEffect } from "react";

const UpdateImage = () => {

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const { idImage } = useParams();  // Récupère l'ID de l'image depuis l'URL
  const queryClient = useQueryClient();

  const [imageName, setImageName] = useState("");
  const [imageSection, setImageSection] = useState("");
  const [image, setImage] = useState(null); 

  // Récupérer les sections
  const { data: sectionData, isLoading: isLoadingSections, error: errorSections } = useQuery("sections", getSections);

  // Récupérer l'image existante
  const { isLoading: isLoadingImage, error: errorImage } = useQuery(
    ['image', idImage],
    () => getImageById(idImage),
    {
      onSuccess: (data) => {
        if (data) {
          setImageName(data.name || "");
          setImageSection(data.section_id || "");
        }
      },
      onError: (error) => {
        toast.error(error.message);
      }
    }
  );

  // Mutation pour la mise à jour de l'image
  const mutation = useMutation({
    mutationFn: updateImage,
    onSuccess: (data) => {
      queryClient.invalidateQueries('images');  // Invalider le cache pour forcer le rechargement
      // Vérifier si la réponse n'indique pas une erreur comme "Aucun changement détecté"
      if (data.success) {
        toast.success(data.message);  // Message de succès
      } else {
        toast.error(data.message);  // Message d'erreur (aucun changement, etc.)
      }
    },
    onError: (error) => {
      toast.error(error.message);  // Message d'erreur
    }
  });

  // Gestion du formulaire de mise à jour
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();  // Préparer les données sous forme de multipart/form-data
    formData.append("idImage", idImage);
    formData.append("name", imageName);
    formData.append("section_id", imageSection);

    if (image) {
      formData.append("path", image);  // Ajout du fichier image si sélectionné
    }

    mutation.mutate(formData);  // Effectuer la mutation pour mettre à jour l'image
  };

  if (isLoadingSections || isLoadingImage) return <p>Chargement...</p>;

  if (errorSections || errorImage) return <p>Erreur : {errorSections?.message || errorImage?.message}</p>;

  return (
    <div className="navigation-and-content">
      <AdminNavigation/>
      <div className="content-wrapper">
      <h2>Modifier l&apos;image</h2>
      <form onSubmit={handleSubmit} className='form'>
        <label htmlFor="imageName">Nom de l&apos;image</label>
        <input
          type="text"
          name="imageName"
          id="imageName"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          required
        />

        <label htmlFor="imageSection">Section</label>
        <select
          id="imageSection"
          name="imageSection"
          value={imageSection}
          onChange={(e) => setImageSection(e.target.value)}
          required
        >
          {sectionData && sectionData.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>

        <label htmlFor="path">Sélectionnez une image</label>
        <input
          type="file"
          id="path"
          name="path"
          onChange={(e) => setImage(e.target.files[0])}  
        />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
    </div>
  );
};

export default UpdateImage;
