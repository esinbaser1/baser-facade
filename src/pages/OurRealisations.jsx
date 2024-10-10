import { useQuery } from "react-query";
import { getImage } from "../api/imageApi";
import { URL } from "../api/urlServer";
import { useEffect } from "react";

const OurRealisations = () => {

  useEffect(( ) => {
    window.scrollTo(0,0);
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ["images"],
    queryFn: getImage,
  });

  // Liste des images filtrées par la section slug "page-nos-realisations"
  const imageList =
    data?.image?.filter(
      (img) => img.section_slug === "page-nos-realisations"
    ) ?? [];

  // Obtenir les trois premières images
  const firstThreeImages = imageList.slice(0, 6);

  if (isLoading) return "Chargement...";
  if (error) return "Une erreur s'est produite: " + error.message;

  return (
    <div className="ourRealisations ourRealisations-container">
      <h1>
        Nos Réalisations - Projets de Rénovation et Ravalement de Façades en
        Isère
      </h1>

      <p>
        Découvrez quelques-uns de nos projets de rénovation et de ravalement de
        façade réalisés à Bourgoin-Jallieu, en Isère et dans toute la région
        Rhône-Alpes.
      </p>
      <p>
        Chaque réalisation témoigne de notre savoir-faire en rénovation de
        façade, isolation thermique par l’extérieur (ITE), et peinture
        extérieure. Nous transformons et protégeons vos bâtiments avec des
        solutions sur-mesure, adaptées à chaque besoin.
      </p>

      <div className="ourRealisations-img">
        {firstThreeImages.map((image) => (
          <img
            src={`${URL}assets/img/${image.path}`}
            alt={image.altText}
            key={image.id}
          />
        ))}
      </div>
    </div>
  );
};

export default OurRealisations;
