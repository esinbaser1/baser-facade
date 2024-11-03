import { getInformationContact } from "../../../api/informationContactApi";
import { useQuery } from "react-query";
import DisplayInformationContactCard from "./DisplayInformationContactCard";

const DisplayInformationContact = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["information"],
    queryFn: getInformationContact,
  });

  const informationList = data?.information?.length > 0 ? data.information : [];

  if (isLoading) return "Chargement...";
  if (error) return "Une erreur s'est produite: " + error.message;

  return (
    <>
      <h2>Liste des informations de contact</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Numéro de téléphone</th>
            <th scope="col">Email</th>
            <th scope="col">Adresse</th>
            <th scope="col" colSpan={2} className="action-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {informationList.length > 0  ? (
            informationList.map((item) => (
              <DisplayInformationContactCard key={item.id} information={item} />
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
    </>
  );
};

export default DisplayInformationContact;
