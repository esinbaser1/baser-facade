import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { addInformationContact } from '../../../api/informationContactApi';

const AddinformationContact = () => {

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addInformationContact, 
    onSuccess: (data) => {
      if(data.success) {
      queryClient.invalidateQueries('information');
      setMobile("");
      setEmail("");
      setAddress("");
      toast.success(data.message || "Information de contact ajoutée avec succès!");
    } else {
      toast.error(data.message || "Une erreur est survenue.");
    }
  },
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ mobile, email, address });
  };

  return (
    <>
    <h2>Ajouter une information de contact</h2>
    <form onSubmit={handleSubmit}>

      <label htmlFor="mobile">Numéro de téléphone</label>
      <input
        type="text"
        name="mobile"
        value={mobile}
        id="mobile"
        onChange={(e) => setMobile(e.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={email}
        id="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="address">Adresse</label>
      <input
        type="text"
        name="address"
        value={address}
        id="address"
        onChange={(e) => setAddress(e.target.value)}
      />

      <button type="submit" disabled={mutation.isLoading}>Ajouter</button>
    </form>
  </>
  );
};

export default AddinformationContact;