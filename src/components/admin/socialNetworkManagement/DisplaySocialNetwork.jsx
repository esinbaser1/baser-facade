import { useQuery } from "react-query";
import { getSocialNetwork } from "../../../api/socialNetworkApi";
import DisplaySocialNetworkCard from "./DisplaySocialNetworkCard";
const DisplaySocialNetwork = () => {
  // récupérer les données des resaux à afficher avec useQuery

  const { isLoading, error, data } = useQuery({
    queryKey: ["socialNetwork"],
    queryFn: getSocialNetwork,
  });

  if (isLoading) return "Chargement...";
  if (error) return "Une erreur s'est produite: " + error.message;

  const socialNetworkList =
    data && data.socialNetwork ? data.socialNetwork : [];

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">Nom du réseau social</th>
            <th scope="col">Url</th>
            <th scope="col" colSpan={2}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {socialNetworkList.length > 0 ? (
            socialNetworkList.map((item) => (
              <DisplaySocialNetworkCard key={item.id} socialNetwork={item} />
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }} role="alert">
                Il n&lsquo;y a pas de contenu.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DisplaySocialNetwork;