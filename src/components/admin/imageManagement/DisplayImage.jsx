import { getImage } from "../../../api/imageApi";
import { useQuery } from "react-query";
import DisplayImageCard from "./DisplayImageCard";

const DisplayImage = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["images"],
    queryFn: getImage,
  });

  const imageList = data?.image?.length > 0 ? data.image : [];

  if (isLoading) return "Chargement...";
  if (error) return "Une erreur s'est produite: " + error.message;

  return (
    <div>
      <h2>Liste des images</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Nom de l&apos;image</th>
            <th scope="col">Section</th>
            <th scope="col" colSpan={2} className="action-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {imageList.length > 0  ? (
            imageList.map((item) => (
              <DisplayImageCard key={item.id} image={item} />
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }} role="alert">
                Il n&apos;y a pas de contenu.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayImage;
