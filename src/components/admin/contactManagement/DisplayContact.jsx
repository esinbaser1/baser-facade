import { useQuery } from "react-query";
import { useState } from "react";
import { getContact } from "../../../api/contactApi";
import DisplayContactCard from "./DisplayContactCard";

const DisplayContact = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["contact"],
    queryFn: getContact,
  });

  const [showDetails, setShowDetails] = useState(false);

  if (isLoading) return "Chargement...";
  if (error) return "Une erreur s'est produite: " + error.message;

  const contactList = data && data.contact ? data.contact : [];

  return (
    <>
      <h2>Liste des messages reçus</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Message</th>
            <th scope="col">Date d&apos;envoi</th>
            <th scope="col">Statut</th>
            
            {showDetails && (
              <>
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">Téléphone</th>
                <th scope="col">Ville</th>
                <th scope="col">Type de projet</th>
              </>
            )}
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {contactList.length > 0 ? (
            contactList.map((item) => (
              <DisplayContactCard
                key={item.id}
                contact={item}
                showDetails={showDetails}
                setShowDetails={setShowDetails}
              />
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }} role="alert">
                Il n&apos;y a pas de contenu.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default DisplayContact;