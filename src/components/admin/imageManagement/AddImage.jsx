import { useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSections } from '../../../api/sectionApi';
import { addImage } from "../../../api/imageApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddImage = () => {
  const [imageName, setImageName] = useState("");
  const [imageSection, setImageSection] = useState("");
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);

  const queryClient = useQueryClient();

  const {
    data: sectionData,
    isLoading: isLoadingSections,
    error: errorSections,
  } = useQuery({
    queryKey: "sections",
    queryFn: getSections,
  });

  const mutation = useMutation(addImage, {
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries("images");
        setImageName("");
        setImageSection("");
        setImage(null);
        fileInputRef.current.value = "";
        toast.success(data.message || "Contenu ajouté avec succès!");
      } else {
        toast.error(data.message || "Une erreur est survenue.");
      }
    },
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", imageName);
    formData.append("section_id", imageSection);
    formData.append("path", image);

    mutation.mutate(formData);
  };

  if (isLoadingSections) return <p>Chargement...</p>;
  if (errorSections)
    return (
      <p>Une erreur sest produite lors de la récupération des sections.</p>
    );

  return (
    <div>
      <h2>Ajouter des images</h2>
      <form onSubmit={handleSubmit}>
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
          <option value="">Sélectionnez une section</option>
          {sectionData &&
            sectionData.map((section) => (
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
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Ajouter</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddImage;
