import { useState } from "react";
import DeleteContact from "./DeleteContact";

const DisplayContactCard = ({ contact, showDetails, setShowDetails }) => {

  const [selectedContactId, setSelectedContactId] = useState(null); // stocke l'ID du contact qui est actuellement sélectionné.

  const handleViewClick = () => {
    // si le bouton voir est cliqué :
    if (selectedContactId === contact.id) {
      //  réinitialise l'ID du contact 
      setSelectedContactId(null);
      // les détails ne doivent plus être visibles
      setShowDetails(false);

      // si le bouton voir n'est pas encore cliqué :
    } else {
      // indique que ce contact est maintenant sélectionné
      setSelectedContactId(contact.id);
      // affiche les colonnes supplémentaires
      setShowDetails(true);
    }
  };

  return (
    <tr>
      <td>{contact.email}</td>
      <td>{contact.message}</td>
      <td>{contact.sending_date}</td>
      <td>{contact.status_name}</td>

      {showDetails && selectedContactId === contact.id && (
        <>
          <td>{contact.lastname}</td>
          <td>{contact.firstname}</td>
          <td>{contact.mobile}</td>
          <td>{contact.city}</td>
          <td>{contact.project_name}</td>
        </>
      )}

      <td>
        {selectedContactId === contact.id ? (
          <>
            <button>Répondre</button>
            <DeleteContact contactId={contact.id}/>
          </>
        ) : (
          <>
            <button onClick={handleViewClick}>Voir</button>
            <DeleteContact contactId={contact.id}/>
          </>
        )}
      </td>
    </tr>
  );
};

export default DisplayContactCard;
