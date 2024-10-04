import { useState } from "react";
import { useMutation,  useQueryClient } from "react-query";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { replyContact } from "../../../api/contactApi";

const ContactReplyModal = ({ isOpen, onClose, contact }) => {
  const [message, setMessage] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: replyContact,
    onSuccess: (data) => {
      if (data && data.message) {
        toast.success(data.message);
        queryClient.invalidateQueries('contact');
      } else {
        toast.error("Le serveur n'a pas retourné de message de succès.");
      }
      onClose(); 
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  
  if (!isOpen) return null; 

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      contactId: contact.id,
      replyMessage: message,
    });
  };

  return (
    <>
      <div>
        <h2>Répondre à {contact.email}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="message">Votre message :</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div>
            <button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Envoi en cours..." : "Envoyer"}
            </button>
            <button type="button" onClick={onClose}> Annuler </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactReplyModal;
