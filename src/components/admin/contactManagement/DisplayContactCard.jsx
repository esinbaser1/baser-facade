import { useState } from "react";
import DeleteContact from "./DeleteContact";
import ContactReplyModal from "./ContactReplyModal";
import ArchiveContact from "./ArchiveContact";

const DisplayContactCard = ({ contact }) => {
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [replyModalOpen, setReplyModalOpen] = useState(false); // état pour la modale de réponse

  const handleViewClick = () => {
    if (selectedContactId === contact.id) {
      setSelectedContactId(null); // Si on re-clique, on cache les détails
    } else {
      setSelectedContactId(contact.id); // On affiche les détails de ce contact
    }
  };

  const handleReplyClick = () => {
    setReplyModalOpen((prevState) => !prevState);
  };

  // fonction pour tronquer le message à 25 caractères
  const getTruncatedMessage = (message, length = 25) => {
    if (message.length > length) {
      return message.substring(0, length) + "...";
    }
    return message;
  };

  return (
    <>
      <tr>
        <td data-label="Email">{contact.email}</td>
{/* 
        <td className="message-cell">
          {selectedContactId === contact.id
            ? contact.message
            : getTruncatedMessage(contact.message)}
        </td> */}
        <td  data-label="Message" className={contact.message === 'Pas de message.' ? 'no-message' : ''}>
  {selectedContactId === contact.id ? contact.message : getTruncatedMessage(contact.message)}
</td>

        

        <td data-label="Date d'envoi">{contact.sending_date}</td>
        <td data-label="Statut" className={contact.status_name === "Non lu" ? "status-unread" : ""}>
          {contact.status_name}
        </td>

        <td data-label="Action">
          {selectedContactId === contact.id ? (
            <div className="button-group">
              <button onClick={handleReplyClick}>
                {replyModalOpen ? "Fermer la modale" : "Répondre"}
              </button>
              <button onClick={handleViewClick}>Cacher</button>
              <ArchiveContact contactId={contact.id} />
              <DeleteContact contactId={contact.id} />
            </div>
          ) : (
            <div className="button-group">
              <button onClick={handleViewClick} className="lili">
                Voir
              </button>
            </div>
          )}
        </td>
      </tr>
      {selectedContactId === contact.id && (
        <tr>
          <td colSpan="5">
            <div className="contact-details">
              <p>
                <strong>Nom :</strong> {contact.lastname}
              </p>
              <p>
                <strong>Prénom :</strong> {contact.firstname}
              </p>
              <p>
                <strong>Téléphone :</strong> {contact.mobile}
              </p>
              <p>
                <strong>Ville :</strong> {contact.city}
              </p>
              <p>
                <strong>Projet :</strong> {contact.project_name}
              </p>
            </div>
          </td>
        </tr>
      )}

      <ContactReplyModal
        isOpen={replyModalOpen}
        onClose={handleReplyClick}
        contact={contact}
      />
    </>
  );
};

export default DisplayContactCard;
