import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addSocialNetwork } from "../../../api/socialNetworkApi";
import { toast } from 'react-toastify';
const AddSocialNetwork = () => {

  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addSocialNetwork,
    onSuccess: (data) => {
      if(data.success) {
        queryClient.invalidateQueries('socialNetwork');
        setPlatform("");
        setUrl("");
        toast.success(data.message || "Réseau social ajouté avec succès!");
      } else {
        toast.error(data.message || "Une erreur est survenue.")
      }
    },
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({platform, url})
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="platform">Nom du réseau social*</label>
        <input type="text" id="platform"name="platform" value={platform} onChange={(e) => setPlatform(e.target.value)}/>

        <label htmlFor="url">Url*</label>
        <input type="text" id="url"name="url" value={url} onChange={(e) => setUrl(e.target.value)}/>

        <button type="submit">Ajouter</button>
      </form>
    </>
  );
};

export default AddSocialNetwork;